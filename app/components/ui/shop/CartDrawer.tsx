"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useCartDrawerStore } from "@/app/store/useCartDrawerStore";
import { useCartStore } from "@/app/store/useCartStore";

const FREE_SHIPPING_THRESHOLD = 150;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CartDrawer() {
  const [hasMounted, setHasMounted] = useState(false);

  const isOpen = useCartDrawerStore((state) => state.isOpen);
  const closeCart = useCartDrawerStore((state) => state.closeCart);

  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  );

  const removeItem = useCartStore(
    (state) => state.removeItem,
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [hasMounted, isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeCart]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [items]);

  const amountUntilFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );

  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  const hasFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD;

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col border-l border-white/[0.08] bg-[#07111f] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="shrink-0 border-b border-white/[0.08]">
          <div className="flex items-center justify-between px-5 py-5 sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-[#03CEA4]" />

                <h2 className="text-lg font-semibold text-white">
                  Your cart
                </h2>
              </div>

              <p className="mt-1 text-sm text-white/50">
                {totalItems === 1
                  ? "1 item selected"
                  : `${totalItems} items selected`}
              </p>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          {items.length > 0 && (
            <div className="border-t border-white/[0.06] px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${
                    hasFreeShipping
                      ? "bg-[#03CEA4]/15 text-[#03CEA4]"
                      : "bg-[#EAC435]/15 text-[#EAC435]"
                  }`}
                >
                  {hasFreeShipping ? (
                    <Check className="size-4" />
                  ) : (
                    <PackageCheck className="size-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">
                    {hasFreeShipping
                      ? "Free shipping unlocked"
                      : `${formatCurrency(
                          amountUntilFreeShipping,
                        )} away from free shipping`}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    {hasFreeShipping
                      ? "Your order qualifies for complimentary shipping."
                      : `Spend ${formatCurrency(
                          FREE_SHIPPING_THRESHOLD,
                        )} or more to qualify.`}
                  </p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        hasFreeShipping
                          ? "bg-[#03CEA4]"
                          : "bg-[#EAC435]"
                      }`}
                      style={{
                        width: `${shippingProgress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Empty cart */}
        {items.length === 0 ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#03CEA4]/20 blur-3xl" />

              <div className="relative grid size-24 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                <ShoppingBag className="size-9 text-white/40" />
              </div>
            </div>

            <h3 className="mt-7 text-xl font-semibold text-white">
              Your cart is empty
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-white/50">
              Discover original artwork, custom fashion, and limited TCE
              creative releases.
            </p>

            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#03CEA4] px-6 py-3 text-sm font-semibold text-[#07111f] transition hover:scale-[1.02] hover:brightness-110"
            >
              Explore the shop
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="animate-[cartItemIn_350ms_ease-out] rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 transition hover:border-white/[0.12] hover:bg-white/[0.045]"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={closeCart}
                        className="group relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white/[0.05]"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/shop/${item.slug}`}
                              onClick={closeCart}
                              className="line-clamp-2 text-sm font-medium leading-5 text-white transition hover:text-[#03CEA4]"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-1 text-sm font-semibold text-white/75">
                              {formatCurrency(item.price)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="grid size-8 shrink-0 place-items-center rounded-full text-white/35 transition hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex items-center rounded-full border border-white/[0.08] bg-black/20 p-1">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              aria-label={`Decrease ${item.name} quantity`}
                              className="grid size-7 place-items-center rounded-full text-white/60 transition hover:bg-white/[0.08] hover:text-white"
                            >
                              <Minus className="size-3.5" />
                            </button>

                            <span className="min-w-8 text-center text-sm font-medium text-white">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              disabled={
                                item.quantity >= item.stock
                              }
                              aria-label={`Increase ${item.name} quantity`}
                              className="grid size-7 place-items-center rounded-full text-white/60 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-white">
                            {formatCurrency(
                              item.price * item.quantity,
                            )}
                          </p>
                        </div>

                        {item.quantity >= item.stock && (
                          <p className="mt-2 text-right text-[11px] text-[#EAC435]">
                            Maximum stock selected
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="shrink-0 border-t border-white/[0.08] bg-[#07111f] px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/50">
                    Subtotal
                  </p>

                  <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    {formatCurrency(subtotal)}
                  </p>
                </div>

                <p className="max-w-36 text-right text-xs leading-5 text-white/35">
                  Taxes calculated during checkout.
                </p>
              </div>

              <Link
                href="/shop/checkout"
                onClick={closeCart}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-5 py-3.5 text-sm font-semibold text-[#07111f] transition hover:scale-[1.01] hover:brightness-110"
              >
                Checkout
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/shop/cart"
                onClick={closeCart}
                className="mt-3 flex w-full items-center justify-center rounded-full border border-white/[0.09] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                View full cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}