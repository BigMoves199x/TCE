import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CheckoutClient, {
  type CheckoutAddress,
} from "@/app/components/ui/checkout/CheckoutClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | The Creative Explorer",
  description:
    "Review your TCE order and delivery information.",
};

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(
      "/sign-in?callbackUrl=/shop/checkout",
    );
  }

  const addresses = await prisma.address.findMany({
    where: {
      userId: session.user.id,
    },

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
      isDefault: true,
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

  if (addresses.length === 0) {
    redirect(
      "/account/addresses?callbackUrl=/shop/checkout",
    );
  }

  const checkoutAddresses: CheckoutAddress[] =
    addresses.map((address) => ({
      id: address.id,
      label: address.label,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      country: address.country,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute -left-40 top-32 size-[420px] rounded-full bg-[#03CEA4]/10 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 size-[420px] rounded-full bg-[#FB4D3D]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="flex items-center justify-between gap-5">
          <Link
            href="/shop/cart"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to cart
          </Link>

          <div className="flex items-center gap-2 text-xs text-white/35">
            <ShoppingBag className="size-3.5 text-[#03CEA4]" />
            Secure checkout
          </div>
        </header>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
            The Creative Explorer
          </p>

          <h1 className="mt-4 font-abril text-4xl tracking-tight sm:text-5xl">
            Complete your order.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
            Confirm your delivery address and review your
            items before continuing.
          </p>
        </div>

        <section className="mt-10">
          <CheckoutClient
            addresses={checkoutAddresses}
          />
        </section>
      </div>
    </main>
  );
}