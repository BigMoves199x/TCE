import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import AddressManager, {
  type CustomerAddress,
} from "@/app/components/ui/account/AddressManager";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Addresses | The Creative Explorer",
  description:
    "Manage your TCE delivery addresses.",
};

export default async function AddressesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(
      "/sign-in?callbackUrl=/account/addresses",
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

  const customerAddresses: CustomerAddress[] =
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

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to account
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-[#03CEA4]/10 text-[#03CEA4]">
              <MapPin className="size-5" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
              Delivery information
            </p>
          </div>

          <h1 className="mt-5 font-abril text-4xl tracking-tight sm:text-5xl">
            Your address book.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
            Save and manage the delivery locations used for
            your TCE orders.
          </p>
        </header>

        <section className="mt-10">
          <AddressManager
            initialAddresses={customerAddresses}
          />
        </section>
      </div>
    </main>
  );
}