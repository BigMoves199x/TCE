import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const checkoutSchema = z.object({
  addressId: z
    .string()
    .trim()
    .min(1, "A delivery address is required."),

  items: z
    .array(
      z.object({
        productId: z
          .string()
          .trim()
          .min(1, "Product ID is required."),

        quantity: z
          .number()
          .int()
          .min(1)
          .max(20),
      }),
    )
    .min(1, "Your cart is empty."),
});

type ValidatedCheckoutItem = {
  productId: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be signed in to checkout.",
        },
        {
          status: 401,
        },
      );
    }

    const body: unknown = await request.json();

    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid checkout information.",
          fields: parsed.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const userId = session.user.id;

    const {
      addressId,
      items,
    } = parsed.data;

    /*
     * ----------------------------------------------------
     * 1. Verify that the address belongs to this user.
     * ----------------------------------------------------
     */

    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },

      select: {
        id: true,
      },
    });

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The selected delivery address could not be found.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * ----------------------------------------------------
     * 2. Merge duplicate product IDs.
     *
     * Never trust the browser cart blindly.
     * ----------------------------------------------------
     */

    const quantityByProduct = new Map<
      string,
      number
    >();

    for (const item of items) {
      const currentQuantity =
        quantityByProduct.get(item.productId) ?? 0;

      quantityByProduct.set(
        item.productId,
        currentQuantity + item.quantity,
      );
    }

    const productIds = Array.from(
      quantityByProduct.keys(),
    );

    /*
     * ----------------------------------------------------
     * 3. Fetch trusted product information from Prisma.
     *
     * Price, stock and availability come from the server.
     * ----------------------------------------------------
     */

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },

        status: "PUBLISHED",
      },

      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        price: true,
        stock: true,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        {
          success: false,
          error:
            "One or more products in your cart are no longer available.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * ----------------------------------------------------
     * 4. Validate stock and calculate trusted subtotal.
     * ----------------------------------------------------
     */

    const validatedItems: ValidatedCheckoutItem[] =
      [];

    let subtotal = 0;

    for (const product of products) {
      const quantity =
        quantityByProduct.get(product.id) ?? 0;

      if (quantity < 1) {
        continue;
      }

      if (product.stock <= 0) {
        return NextResponse.json(
          {
            success: false,
            error: `${product.name} is currently sold out.`,
            productId: product.id,
          },
          {
            status: 409,
          },
        );
      }

      if (quantity > product.stock) {
        return NextResponse.json(
          {
            success: false,
            error: `Only ${product.stock} ${
              product.stock === 1
                ? "unit is"
                : "units are"
            } available for ${product.name}.`,
            productId: product.id,
          },
          {
            status: 409,
          },
        );
      }

      subtotal += product.price * quantity;

      validatedItems.push({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity,
      });
    }

    if (validatedItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "There are no valid products in your cart.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * ----------------------------------------------------
     * 5. Temporary pricing.
     *
     * Shipping and discounts will be calculated in the
     * next phase.
     * ----------------------------------------------------
     */

    const shipping = 0;
    const discount = 0;

    const total =
      subtotal + shipping - discount;

    /*
     * Checkout expires after 30 minutes.
     */
    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000,
    );

    /*
     * ----------------------------------------------------
     * 6. Expire the customer's previous active checkouts.
     * ----------------------------------------------------
     */

    await prisma.checkoutSession.updateMany({
      where: {
        userId,
        status: "ACTIVE",
      },

      data: {
        status: "EXPIRED",
      },
    });

    /*
     * ----------------------------------------------------
     * 7. Create the checkout session and snapshot items.
     *
     * Nested create avoids needing an interactive
     * transaction here.
     * ----------------------------------------------------
     */

    const checkout =
      await prisma.checkoutSession.create({
        data: {
          userId,
          addressId,

          subtotal,
          shipping,
          discount,
          total,

          expiresAt,

          items: {
            create: validatedItems.map(
              (item) => ({
                productId: item.productId,
                name: item.name,
                slug: item.slug,
                imageUrl: item.imageUrl,
                price: item.price,
                quantity: item.quantity,
              }),
            ),
          },
        },

        select: {
          id: true,
          status: true,
          subtotal: true,
          shipping: true,
          discount: true,
          total: true,
          expiresAt: true,
          createdAt: true,

          address: {
            select: {
              id: true,
              label: true,
              firstName: true,
              lastName: true,
              phone: true,
              country: true,
              address1: true,
              address2: true,
              city: true,
              state: true,
              postalCode: true,
            },
          },

          items: {
            select: {
              id: true,
              productId: true,
              name: true,
              slug: true,
              imageUrl: true,
              price: true,
              quantity: true,
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Checkout session created successfully.",
        checkout,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "CREATE CHECKOUT ERROR:",
      error,
    );

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The checkout request contains invalid JSON.",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to prepare your checkout. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}