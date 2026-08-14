"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  MapPin,
  Package,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  type CartProduct,
  useCartStore,
} from "@/app/store/useCartStore";

export type CheckoutAddress = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  country: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  postalCode: string | null;
  isDefault: boolean;
};

type CheckoutClientProps = {
  addresses: CheckoutAddress[];
};

export default function CheckoutClient({
  addresses,
}: CheckoutClientProps) {
  const router = useRouter();

  const items = useCartStore((state) => state.items);

  const defaultAddress =
    addresses.find((address) => address.isDefault) ??
    addresses[0];

  const [selectedAddressId, setSelectedAddressId] =
    useState(defaultAddress?.id ?? "");

  const [isCreatingCheckout, setIsCreatingCheckout] =
    useState(false);

  const [checkoutError, setCheckoutError] =
    useState<string | null>(null);

  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId,
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0,
      ),
    [items],
  );

  const itemCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [items],
  );

  async function handleContinue() {
    if (!selectedAddressId) {
      setCheckoutError(
        "Please select a delivery address.",
      );
      return;
    }

    if (items.length === 0) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    setCheckoutError(null);
    setIsCreatingCheckout(true);

    try {
      console.log("CHECKOUT ADDRESS:", selectedAddressId);
      console.log("CHECKOUT CART:", items);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: selectedAddressId,

          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const contentType =
        response.headers.get("content-type");

      let result: {
        success?: boolean;
        error?: string;
        checkout?: {
          id: string;
        };
      };

      if (contentType?.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "NON-JSON CHECKOUT RESPONSE:",
          text,
        );

        setCheckoutError(
          "The server returned an invalid checkout response.",
        );

        return;
      }

      console.log(
        "CHECKOUT STATUS:",
        response.status,
      );

      console.log(
        "CHECKOUT RESULT:",
        result,
      );

      if (!response.ok || !result.success) {
        setCheckoutError(
          result.error ??
            "Unable to continue checkout.",
        );

        return;
      }

      if (!result.checkout?.id) {
        setCheckoutError(
          "Checkout was created but no checkout ID was returned.",
        );

        return;
      }

      router.push(
        `/shop/checkout/${result.checkout.id}`,
      );
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      setCheckoutError(
        "Something went wrong while preparing your checkout.",
      );
    } finally {
      setIsCreatingCheckout(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] px-6 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-[#03CEA4]/10 text-[#03CEA4]">
          <Package className="size-6" />
        </div>

        <h1 className="mt-5 text-2xl font-semibold">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
          Add a product before continuing to checkout.
        </p>

        <Link
          href="/shop"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#03CEA4] px-5 text-sm font-semibold text-[#07111f]"
        >
          Browse the shop
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
      {/* LEFT */}
      <div>
        {/* ADDRESS */}
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
                Step 1
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Delivery address
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/45">
                Choose where you want this order
                delivered.
              </p>
            </div>

            <Link
              href="/account/addresses"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-medium text-white/55 transition hover:border-[#03CEA4]/30 hover:text-[#03CEA4]"
            >
              <Pencil className="size-3.5" />
              Manage addresses
            </Link>
          </div>

          <div className="mt-7 grid gap-4">
            {addresses.map((address) => {
              const selected =
                address.id === selectedAddressId;

              return (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => {
                    setSelectedAddressId(address.id);
                    setCheckoutError(null);
                  }}
                  className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                    selected
                      ? "border-[#03CEA4]/45 bg-[#03CEA4]/[0.07]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-full ${
                        selected
                          ? "bg-[#03CEA4] text-[#07111f]"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {selected ? (
                        <Check className="size-4" />
                      ) : (
                        <MapPin className="size-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {address.label}
                        </h3>

                        {address.isDefault && (
                          <span className="rounded-full bg-[#EAC435]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#EAC435]">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm font-medium text-white/75">
                        {address.firstName}{" "}
                        {address.lastName}
                      </p>

                      <div className="mt-1 text-sm leading-6 text-white/45">
                        <p>{address.address1}</p>

                        {address.address2 && (
                          <p>{address.address2}</p>
                        )}

                        <p>
                          {address.city},{" "}
                          {address.state}
                          {address.postalCode
                            ? ` ${address.postalCode}`
                            : ""}
                        </p>

                        <p>{address.country}</p>

                        {address.phone && (
                          <p className="mt-2">
                            {address.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#EAC435]">
            Step 2
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Review your items
          </h2>

          <div className="mt-7 divide-y divide-white/[0.08]">
            {items.map((item) => (
              <CheckoutItem
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT */}
      <aside className="lg:sticky lg:top-8 lg:self-start">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
            Order summary
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}
          </h2>

          <div className="mt-7 space-y-4 text-sm">
            <SummaryRow
              label="Subtotal"
              value={formatPrice(subtotal)}
            />

            <SummaryRow
              label="Delivery"
              value="Calculated next"
            />
          </div>

          <div className="my-6 h-px bg-white/[0.08]" />

          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                Total
              </p>

              <p className="mt-1 text-xs text-white/35">
                Excluding delivery
              </p>
            </div>

            <p className="text-2xl font-semibold text-[#03CEA4]">
              {formatPrice(subtotal)}
            </p>
          </div>

          {/* ERROR */}
          {checkoutError && (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-[#FB4D3D]/25 bg-[#FB4D3D]/10 px-4 py-3 text-sm leading-6 text-red-200"
            >
              {checkoutError}
            </div>
          )}

          {/* CONTINUE */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={
              !selectedAddress ||
              isCreatingCheckout
            }
            className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isCreatingCheckout ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Preparing checkout
              </>
            ) : (
              <>
                Continue to delivery
                <ArrowRight className="size-4" />
              </>
            )}
          </button>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#03CEA4]" />

            <p className="text-xs leading-5 text-white/40">
              Your delivery selection and cart will be
              validated again before payment.
            </p>
          </div>

          <Link
            href="/shop/cart"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 text-xs font-medium text-white/40 transition hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Return to cart
          </Link>
        </div>
      </aside>
    </div>
  );
}

type CheckoutItemProps = {
  item: CartProduct & {
    quantity: number;
  };
};

function CheckoutItem({
  item,
}: CheckoutItemProps) {
  return (
    <article className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-white/5">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />

        <span className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-[#07111f] text-[10px] font-semibold text-white">
          {item.quantity}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-white">
          {item.name}
        </h3>

        <p className="mt-1 text-xs text-white/35">
          Quantity: {item.quantity}
        </p>

        <p className="mt-3 text-sm font-semibold text-[#03CEA4]">
          {formatPrice(
            item.price * item.quantity,
          )}
        </p>
      </div>
    </article>
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