"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
  Ticket,
} from "lucide-react";

const STANDARD_PRICE = 20000;
const EARLY_PRICE = 16000;

export default function SipAndPaintReservationPage() {
  const [quantity, setQuantity] = useState(1);

  /*
   * For now this is UI-only.
   * Later we can connect this to your database so the system
   * knows whether the first 20 discounted tickets are still available.
   */
  const earlyOfferAvailable = true;

  const unitPrice = earlyOfferAvailable
    ? EARLY_PRICE
    : STANDARD_PRICE;

  const total = useMemo(() => {
    return unitPrice * quantity;
  }, [quantity, unitPrice]);

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(current + 1, 10));
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* =======================================================
          TOP BAR
      ======================================================== */}

      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex min-h-20 w-full max-w-[1450px] items-center justify-between px-6 sm:px-10 lg:px-14">
          <Link
            href="/"
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />

            Back to TCE
          </Link>

          <Link
            href="/"
            className="font-bebit text-[1.9rem] leading-none tracking-[-0.03em]"
          >
            <span className="text-[#03CEA4]">T</span>
            <span className="text-[#EAC435]">C</span>
            <span className="text-[#FB4D3D]">E</span>
          </Link>

          <p className="hidden text-[9px] uppercase tracking-[0.24em] text-white/25 sm:block">
            Experience 001
          </p>
        </div>
      </header>

      {/* =======================================================
          PAGE
      ======================================================== */}

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-[1450px] lg:grid-cols-[0.92fr_1.08fr]">
        {/* =====================================================
            LEFT / EVENT
        ====================================================== */}

        <div className="relative flex flex-col justify-between border-b border-white/[0.06] px-6 py-16 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-20 xl:px-20">
          {/* subtle background details */}

          <div className="pointer-events-none absolute left-[-10rem] top-[20%] size-[28rem] rounded-full bg-[#03CEA4]/[0.06] blur-[150px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <span className="h-px w-9 bg-[#03CEA4]/70" />

              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#03CEA4]/80">
                The Creative Explorer Presents
              </p>
            </div>

            <h1 className="mt-8 max-w-xl font-abril text-[clamp(3.4rem,5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.045em]">
              Reserve your
              <span className="block text-[#EAC435]">
                place.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-white/45 sm:text-[15px] sm:leading-8">
              A thoughtfully curated Sip & Paint experience with
              guided painting, drinks, chops and space to create,
              connect and simply enjoy the moment.
            </p>

            {/* DETAILS */}

            <div className="mt-12 border-y border-white/[0.07] py-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-white/25">
                    Admission
                  </p>

                  <p className="mt-3 font-abril text-4xl font-normal tracking-[-0.04em]">
                    ₦20,000
                  </p>

                  <p className="mt-1 text-[10px] text-white/25">
                    per guest
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-[#EAC435]/70">
                    Early Explorer
                  </p>

                  <p className="mt-3 font-abril text-4xl font-normal tracking-[-0.04em] text-[#EAC435]">
                    ₦16,000
                  </p>

                  <p className="mt-1 text-[10px] text-white/30">
                    first 20 guests
                  </p>
                </div>
              </div>
            </div>

            {/* INCLUDED */}

            <div className="mt-9">
              <p className="text-[9px] uppercase tracking-[0.24em] text-white/25">
                Included
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Included text="Guided painting session" />
                <Included text="Painting materials" />
                <Included text="Drinks" />
                <Included text="Chops" />
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-16 text-[9px] uppercase tracking-[0.22em] text-white/20">
            Create • Connect • Experience
          </p>
        </div>

        {/* =====================================================
            RIGHT / RESERVATION
        ====================================================== */}

        <div className="flex items-center px-6 py-16 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
          <div className="mx-auto w-full max-w-[620px]">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.26em] text-white/25">
                  Reservation
                </p>

                <h2 className="mt-3 font-abril text-3xl font-normal tracking-[-0.03em] sm:text-4xl">
                  Your seat, your details.
                </h2>
              </div>

              <span className="hidden text-[10px] text-white/25 sm:block">
                Step 01 / 02
              </span>
            </div>

            <form className="mt-10">
              {/* NAME */}

              <Field
                label="Full name"
                type="text"
                name="name"
                placeholder="Your full name"
              />

              {/* EMAIL / PHONE */}

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                <Field
                  label="Email address"
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                />

                <Field
                  label="Phone number"
                  type="tel"
                  name="phone"
                  placeholder="+234"
                />
              </div>

              {/* QUANTITY */}

              <div className="mt-10 border-y border-white/[0.07] py-7">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-white/25">
                      Guests
                    </p>

                    <p className="mt-2 text-sm text-white/50">
                      How many seats would you like?
                    </p>
                  </div>

                  <div className="flex items-center gap-4 rounded-full border border-white/[0.09] px-2 py-2">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      aria-label="Decrease guests"
                      className="grid size-9 place-items-center rounded-full text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Minus className="size-3.5" />
                    </button>

                    <span className="min-w-6 text-center font-abril text-xl">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      aria-label="Increase guests"
                      className="grid size-9 place-items-center rounded-full text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* TICKET SUMMARY */}

              <div className="mt-8">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-white/25">
                      Ticket
                    </p>

                    <p className="mt-2 text-sm text-white/55">
                      Sip & Paint Admission
                    </p>
                  </div>

                  <p className="font-abril text-2xl tracking-[-0.03em]">
                    ₦{unitPrice.toLocaleString()}
                  </p>
                </div>

                {/* DISCOUNT NOTICE */}

                {earlyOfferAvailable && (
                  <div className="mt-6 flex items-center justify-between gap-5 rounded-2xl border border-[#EAC435]/15 bg-[#EAC435]/[0.05] px-5 py-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.22em] text-[#EAC435]/70">
                        Early Explorer applied
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        20% off for the first 20 guests.
                      </p>
                    </div>

                    <p className="text-xs text-[#EAC435]">
                      -₦4,000
                    </p>
                  </div>
                )}

                {/* TOTAL */}

                <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/[0.07] pt-7">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-white/25">
                      Total
                    </p>

                    <p className="mt-2 text-xs text-white/30">
                      {quantity} {quantity === 1 ? "guest" : "guests"}
                    </p>
                  </div>

                  <p className="font-abril text-[clamp(2.8rem,4vw,4rem)] font-normal tracking-[-0.045em]">
                    ₦{total.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* CTA */}

              <button
                type="submit"
                className="group mt-9 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#03CEA4] px-8 text-[9px] font-medium uppercase tracking-[0.2em] text-[#07111f] transition-all duration-300 hover:bg-white"
              >
                <Ticket className="size-4" />

                Continue to payment

                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <p className="mt-4 text-center text-[9px] uppercase tracking-[0.18em] text-white/18">
                Limited spaces available
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   FIELD
============================================================ */

function Field({
  label,
  type,
  name,
  placeholder,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-[0.23em] text-white/25">
        {label}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="
          mt-3
          w-full
          border-b
          border-white/[0.1]
          bg-transparent
          pb-3
          text-sm
          text-white
          outline-none
          transition-colors
          placeholder:text-white/18
          focus:border-[#03CEA4]/70
        "
      />
    </label>
  );
}

/* ============================================================
   INCLUDED
============================================================ */

function Included({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-5 place-items-center rounded-full bg-[#03CEA4]/[0.08] text-[#03CEA4]/80">
        <Check className="size-3" />
      </span>

      <span className="text-xs tracking-wide text-white/40">
        {text}
      </span>
    </div>
  );
}