import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/validators/address";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be signed in to view addresses.",
        },
        {
          status: 401,
        },
      );
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: [
        {
          isDefault: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve your saved addresses.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be signed in to save an address.",
        },
        {
          status: 401,
        },
      );
    }

    const body: unknown = await request.json();
    const result = addressSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the highlighted address fields.",
          fields: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const userId = session.user.id;
    const addressData = result.data;

    const address = await prisma.$transaction(
      async (transaction) => {
        const addressCount =
          await transaction.address.count({
            where: {
              userId,
            },
          });

        const shouldBecomeDefault =
          addressData.isDefault || addressCount === 0;

        if (shouldBecomeDefault) {
          await transaction.address.updateMany({
            where: {
              userId,
              isDefault: true,
            },
            data: {
              isDefault: false,
            },
          });
        }

        return transaction.address.create({
          data: {
            userId,
            label: addressData.label,
            firstName: addressData.firstName,
            lastName: addressData.lastName,
            phone: addressData.phone?.trim() || null,
            country: addressData.country,
            address1: addressData.address1,
            address2:
              addressData.address2?.trim() || null,
            city: addressData.city,
            state: addressData.state,
            postalCode:
              addressData.postalCode?.trim() || null,
            isDefault: shouldBecomeDefault,
          },
        });
      },
      {
        maxWait: 10_000,
        timeout: 15_000,
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Address saved successfully.",
        address,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE ADDRESS ERROR:", error);

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
        error: "Unable to save your address.",
      },
      {
        status: 500,
      },
    );
  }
}