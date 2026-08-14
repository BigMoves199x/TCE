import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const shippingSchema = z.object({
  method: z.enum([
    "STANDARD",
    "EXPRESS",
    "PICKUP",
  ]),
});

type ShippingRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

const shippingPrices = {
  STANDARD: 350000,
  EXPRESS: 650000,
  PICKUP: 0,
} as const;

export async function PATCH(
  request: Request,
  { params }: ShippingRouteProps,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be signed in.",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const body: unknown = await request.json();

    const parsed = shippingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid shipping method.",
        },
        {
          status: 400,
        },
      );
    }

    const checkout =
      await prisma.checkoutSession.findFirst({
        where: {
          id,
          userId: session.user.id,
          status: "ACTIVE",
        },
      });

    if (!checkout) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Checkout session could not be found.",
        },
        {
          status: 404,
        },
      );
    }

    if (checkout.expiresAt < new Date()) {
      await prisma.checkoutSession.update({
        where: {
          id: checkout.id,
        },
        data: {
          status: "EXPIRED",
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: "This checkout has expired.",
        },
        {
          status: 410,
        },
      );
    }

    const method = parsed.data.method;

    const shipping = shippingPrices[method];

    const total =
      checkout.subtotal +
      shipping -
      checkout.discount;

    const updatedCheckout =
      await prisma.checkoutSession.update({
        where: {
          id: checkout.id,
        },
        data: {
          shippingMethod: method,
          shipping,
          total,
        },
        select: {
          id: true,
          shippingMethod: true,
          subtotal: true,
          shipping: true,
          discount: true,
          total: true,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Shipping method updated.",
      checkout: updatedCheckout,
    });
  } catch (error) {
    console.error(
      "UPDATE SHIPPING ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update the shipping method.",
      },
      {
        status: 500,
      },
    );
  }
}