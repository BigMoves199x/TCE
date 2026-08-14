import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type DefaultAddressRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  _request: Request,
  { params }: DefaultAddressRouteProps,
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

    const existingAddress = await prisma.address.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Address not found.",
        },
        {
          status: 404,
        },
      );
    }

    const address = await prisma.$transaction(
      async (transaction) => {
        await transaction.address.updateMany({
          where: {
            userId: session.user.id,
          },
          data: {
            isDefault: false,
          },
        });

        return transaction.address.update({
          where: {
            id,
          },
          data: {
            isDefault: true,
          },
        });
      },
    );

    return NextResponse.json({
      success: true,
      message: "Default address updated.",
      address,
    });
  } catch (error) {
    console.error("SET DEFAULT ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to update the default address.",
      },
      {
        status: 500,
      },
    );
  }
}