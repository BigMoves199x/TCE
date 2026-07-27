import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const updateProductSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Product name must contain at least two characters")
      .optional(),

    slug: z
      .string()
      .trim()
      .min(2, "Slug must contain at least two characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain lowercase letters, numbers and hyphens only",
      )
      .optional(),

    description: z
      .string()
      .trim()
      .min(10, "Description is too short")
      .optional(),

    // Price is stored in kobo.
    price: z
      .number()
      .int("Price must be a whole number in kobo")
      .positive("Price must be greater than zero")
      .optional(),

    category: z
      .string()
      .trim()
      .min(2, "Category is required")
      .optional(),

    imageUrl: z
      .string()
      .url("The main product image is invalid")
      .optional(),

    images: z
      .array(z.string().url("One of the uploaded image URLs is invalid"))
      .min(1, "Upload at least one product image")
      .max(5, "You can upload no more than five product images")
      .optional(),

    stock: z
      .number()
      .int("Stock must be a whole number")
      .min(0, "Stock cannot be negative")
      .optional(),

    featured: z.boolean().optional(),

    status: z
      .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update.",
  });

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET single product error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve the product.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;
    const body: unknown = await request.json();

    const result = updateProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid product information.",
          fields: result.error.flatten().fieldErrors,
          formErrors: result.error.flatten().formErrors,
        },
        {
          status: 400,
        },
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found.",
        },
        {
          status: 404,
        },
      );
    }

    const productData = result.data;

    if (
      productData.slug &&
      productData.slug !== existingProduct.slug
    ) {
      const productWithSameSlug =
        await prisma.product.findUnique({
          where: {
            slug: productData.slug,
          },
          select: {
            id: true,
          },
        });

      if (
        productWithSameSlug &&
        productWithSameSlug.id !== id
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "A product with this slug already exists.",
          },
          {
            status: 409,
          },
        );
      }
    }

    const finalImages =
      productData.images ?? existingProduct.images;

    const finalImageUrl =
      productData.imageUrl ?? existingProduct.imageUrl;

    if (!finalImages.includes(finalImageUrl)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The main product image must be included in the image list.",
        },
        {
          status: 400,
        },
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...(productData.name !== undefined && {
          name: productData.name,
        }),

        ...(productData.slug !== undefined && {
          slug: productData.slug,
        }),

        ...(productData.description !== undefined && {
          description: productData.description,
        }),

        ...(productData.price !== undefined && {
          price: productData.price,
        }),

        ...(productData.category !== undefined && {
          category: productData.category,
        }),

        ...(productData.imageUrl !== undefined && {
          imageUrl: productData.imageUrl,
        }),

        ...(productData.images !== undefined && {
          images: productData.images,
        }),

        ...(productData.stock !== undefined && {
          stock: productData.stock,
        }),

        ...(productData.featured !== undefined && {
          featured: productData.featured,
        }),

        ...(productData.status !== undefined && {
          status: productData.status,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("PATCH product error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "The request body is not valid JSON.",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unable to update the product.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        orderItems: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found.",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * Do not permanently delete products already connected
     * to an order. Archive them instead so old orders remain valid.
     */
    if (existingProduct.orderItems.length > 0) {
      const archivedProduct = await prisma.product.update({
        where: {
          id,
        },
        data: {
          status: "ARCHIVED",
          featured: false,
        },
      });

      return NextResponse.json({
        success: true,
        message:
          "This product belongs to an existing order, so it was archived instead of permanently deleted.",
        archived: true,
        product: archivedProduct,
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
      deletedProduct: {
        id: existingProduct.id,
        name: existingProduct.name,
      },
    });
  } catch (error) {
    console.error("DELETE product error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to delete the product.",
      },
      {
        status: 500,
      },
    );
  }
}