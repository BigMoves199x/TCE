import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createOrderSchema = z.object({
  customer: z.object({
    firstName: z.string().trim().min(2, "First name is required."),
    lastName: z.string().trim().min(2, "Last name is required."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z.string().trim().min(7, "Enter a valid phone number."),
  }),

  shipping: z.object({
    address: z.string().trim().min(5, "Shipping address is required."),
    city: z.string().trim().min(2, "City is required."),
    state: z.string().trim().min(2, "State is required."),
    country: z.string().trim().default("Nigeria"),
    postalCode: z.string().trim().optional(),
  }),

  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required."),
        quantity: z.coerce
          .number()
          .int()
          .min(1, "Quantity must be at least one."),
      }),
    )
    .min(1, "Your order must contain at least one product."),

  shippingFee: z.coerce
    .number()
    .int()
    .min(0, "Shipping fee cannot be negative.")
    .default(0),

  notes: z.string().trim().max(1000).optional(),
});

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `TCE-${timestamp}-${random}`;
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET orders error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load orders.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsedResult = createOrderSchema.safeParse(body);

    if (!parsedResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the order information.",
          fieldErrors: parsedResult.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const {
      customer,
      shipping,
      items,
      shippingFee,
      notes,
    } = parsedResult.data;

    const uniqueProductIds = [...new Set(items.map((item) => item.productId))];

    if (uniqueProductIds.length !== items.length) {
      return NextResponse.json(
        {
          success: false,
          error: "The same product cannot appear more than once.",
        },
        {
          status: 400,
        },
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: uniqueProductIds,
        },
        status: "PUBLISHED",
      },
    });

    if (products.length !== uniqueProductIds.length) {
      return NextResponse.json(
        {
          success: false,
          error: "One or more products are unavailable.",
        },
        {
          status: 400,
        },
      );
    }

    const productMap = new Map(
      products.map((product) => [product.id, product]),
    );

    const preparedItems = items.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error("Product could not be found.");
      }

      if (item.quantity > product.stock) {
        throw new Error(
          `${product.name} only has ${product.stock} item(s) available.`,
        );
      }

      return {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.imageUrl,
        unitPrice: product.price,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    });

    const subtotal = preparedItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0,
    );

    const total = subtotal + shippingFee;

    const order = await prisma.$transaction(async (transaction) => {
      let savedCustomer = await transaction.customer.findFirst({
        where: {
          email: customer.email.toLowerCase(),
        },
      });

      if (savedCustomer) {
        savedCustomer = await transaction.customer.update({
          where: {
            id: savedCustomer.id,
          },
          data: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
          },
        });
      } else {
        savedCustomer = await transaction.customer.create({
          data: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email.toLowerCase(),
            phone: customer.phone,
          },
        });
      }

      return transaction.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          customerId: savedCustomer.id,
          subtotal,
          shippingFee,
          total,
          shippingAddress: shipping.address,
          shippingCity: shipping.city,
          shippingState: shipping.state,
          shippingCountry: shipping.country,
          postalCode: shipping.postalCode || null,
          notes: notes || null,

          items: {
            create: preparedItems,
          },
        },

        include: {
          customer: true,
          items: true,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("POST order error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to create order.",
      },
      {
        status: 500,
      },
    );
  }
}