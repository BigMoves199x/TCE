import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Package,
} from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type CheckoutSessionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | The Creative Explorer",
};

export default async function CheckoutSessionPage({
  params,
}: CheckoutSessionPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in?callbackUrl=/shop/checkout");
  }

  const { id } = await params;

  const checkout =
    await prisma.checkoutSession.findFirst({
      where: {
        id,
        userId: session.user.id,
      },

      include: {
        address: true,
        items: true,
      },
    });

  if (!checkout) {
    notFound();
  }

  const expired =
    checkout.status !== "ACTIVE" ||
    checkout.expiresAt < new Date();

  if (expired) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-5 text-white">
        <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center">
          <Package className="mx-auto size-9 text-[#EAC435]" />

          <h1 className="mt-5 text-3xl font-semibold">
            Checkout expired
          </h1>

          <p className="mt-3 text-sm leading-7 text-white/45">
            This checkout session is no longer active.
            Return to your cart to start again.
          </p>

          <Link
            href="/shop/cart"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f]"
          >
            Return to cart
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute -left-40 top-20 size-[420px] rounded-full bg-[#03CEA4]/10 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 size-[420px] rounded-full bg-[#FB4D3D]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/shop/checkout"
          className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to checkout
        </Link>

        <header className="mt-10">
          <div className="grid size-12 place-items-center rounded-full bg-[#03CEA4]/10 text-[#03CEA4]">
            <CheckCircle2 className="size-5" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
            Secure checkout
          </p>

          <h1 className="mt-4 font-abril text-4xl tracking-tight sm:text-5xl">
            Checkout ready.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
            Your products, prices, stock and delivery address
            have been validated securely on the server.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-[#03CEA4]" />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03CEA4]">
                    Delivery
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    {checkout.address.label}
                  </h2>
                </div>
              </div>

              <div className="mt-6 text-sm leading-7 text-white/50">
                <p className="font-medium text-white/80">
                  {checkout.address.firstName}{" "}
                  {checkout.address.lastName}
                </p>

                <p className="mt-2">
                  {checkout.address.address1}
                </p>

                {checkout.address.address2 && (
                  <p>{checkout.address.address2}</p>
                )}

                <p>
                  {checkout.address.city},{" "}
                  {checkout.address.state}
                  {checkout.address.postalCode
                    ? ` ${checkout.address.postalCode}`
                    : ""}
                </p>

                <p>{checkout.address.country}</p>

                {checkout.address.phone && (
                  <p className="mt-2">
                    {checkout.address.phone}
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAC435]">
                Items
              </p>

              <div className="mt-5 divide-y divide-white/[0.08]">
                {checkout.items.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-white/35">
                        Qty {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-[#03CEA4]">
                      {formatPrice(
                        item.price * item.quantity,
                      )}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#03CEA4]">
                Order summary
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <SummaryRow
                  label="Subtotal"
                  value={formatPrice(checkout.subtotal)}
                />

                <SummaryRow
                  label="Delivery"
                  value={
                    checkout.shipping === 0
                      ? "Not selected"
                      : formatPrice(checkout.shipping)
                  }
                />

                {checkout.discount > 0 && (
                  <SummaryRow
                    label="Discount"
                    value={`-${formatPrice(
                      checkout.discount,
                    )}`}
                  />
                )}
              </div>

              <div className="my-6 h-px bg-white/[0.08]" />

              <div className="flex items-end justify-between gap-4">
                <span className="text-sm text-white/45">
                  Total
                </span>

                <span className="text-2xl font-semibold text-[#03CEA4]">
                  {formatPrice(checkout.total)}
                </span>
              </div>

              <button
                type="button"
                className="mt-7 min-h-14 w-full rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f] transition hover:brightness-110"
              >
                Choose delivery method
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-white/30">
                Checkout expires at{" "}
                {checkout.expiresAt.toLocaleTimeString(
                  "en-NG",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="text-white/45">
        {label}
      </span>

      <span className="font-medium text-white/75">
        {value}
      </span>
    </div>
  );
}

function formatPrice(priceInKobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(priceInKobo / 100);
}