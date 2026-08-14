"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import { useCartStore } from "@/app/store/useCartStore";

export default function CartPageContent() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#07111f] text-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-6 h-14 w-14 text-white/30" />

          <h1 className="text-3xl font-semibold">
            Your cart is empty
          </h1>

          <p className="mt-3 text-white/50">
            Explore our latest collection.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-xl bg-[#03CEA4] px-6 py-3 font-semibold text-[#07111f]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-4xl font-semibold">
          Shopping Cart
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">

          <div className="space-y-5">

            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex gap-5">

                  <div className="relative h-32 w-28 overflow-hidden rounded-2xl">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">

                    <div className="flex justify-between">

                      <div>

                        <h2 className="text-xl font-semibold">
                          {item.name}
                        </h2>

                        <p className="mt-2 text-[#03CEA4]">
                          {formatPrice(item.price)}
                        </p>

                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-5 w-5 text-red-400" />
                      </button>

                    </div>

                    <div className="mt-auto flex items-center gap-4">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus />
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 h-fit sticky top-8">

            <h2 className="text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-8 flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mt-4 flex justify-between text-white/50">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>

            <hr className="my-8 border-white/10" />

            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button className="mt-8 w-full rounded-2xl bg-[#03CEA4] py-4 font-semibold text-[#07111f]">
              Checkout
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price / 100);
}