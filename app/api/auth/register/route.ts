import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must contain at least 2 characters.")
      .max(50, "First name is too long."),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must contain at least 2 characters.")
      .max(50, "Last name is too long."),

    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .transform((value) => value.toLowerCase()),

    phone: z
      .string()
      .trim()
      .max(30, "Phone number is too long.")
      .optional()
      .or(z.literal("")),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(72, "Password cannot exceed 72 characters."),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    },
  );

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the highlighted fields.",
          fields: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "An account already exists with this email address.",
          fields: {
            email: [
              "An account already exists with this email address.",
            ],
          },
        },
        {
          status: 409,
        },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        phone: phone || null,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER USER ERROR:", error);

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
        error: "Unable to create your account.",
      },
      {
        status: 500,
      },
    );
  }
}