import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";


const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name is required"),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only",
    ),

  description: z
    .string()
    .trim()
    .min(10, "Description is too short"),

  // Price is stored in kobo.
  price: z
    .number()
    .int("Price must be a whole number in kobo")
    .positive("Price must be greater than zero"),

  category: z
    .string()
    .trim()
    .min(2, "Category is required"),

  // The first uploaded image becomes the main product image.
  imageUrl: z
    .string()
    .url("The main product image is invalid"),

  images: z
    .array(z.string().url("One of the uploaded image URLs is invalid"))
    .min(1, "Upload at least one product image")
    .max(5, "You can upload no more than five product images"),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  featured: z.boolean().default(false),

  status: z
    .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
    .default("DRAFT"),
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("GET products error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve products.",
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

    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid product information.",
          fields: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const productData = result.data;

    // Make sure the primary image is included in the images array.
    if (!productData.images.includes(productData.imageUrl)) {
      return NextResponse.json(
        {
          success: false,
          error: "The main product image must be included in the image list.",
        },
        {
          status: 400,
        },
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: productData.slug,
      },
    });

    if (existingProduct) {
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

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        imageUrl: productData.imageUrl,
        images: productData.images,
        stock: productData.stock,
        featured: productData.featured,
        status: productData.status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully.",
        product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("POST product error:", error);

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
        error: "Unable to create product.",
      },
      {
        status: 500,
      },
    );
  }
}