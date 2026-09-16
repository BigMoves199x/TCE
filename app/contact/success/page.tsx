"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  Check,
  Home,
} from "lucide-react";

const REDIRECT_SECONDS = 5;

export default function ProjectSuccessPage() {
  const router = useRouter();

  const [seconds, setSeconds] =
    useState(REDIRECT_SECONDS);

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        setSeconds((current) =>
          Math.max(current - 1, 0),
        );
      }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =========================================================
     REDIRECT
  ========================================================= */

  useEffect(() => {
    if (seconds !== 0) {
      return;
    }

    router.replace("/");
  }, [seconds, router]);

  /* =========================================================
     PROGRESS
  ========================================================= */

  const progress =
    (seconds / REDIRECT_SECONDS) *
    100;

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* Background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#03CEA4]/[0.055] blur-[120px]" />

        <div className="absolute -right-40 -top-40 size-[420px] rounded-full bg-[#FB4D3D]/[0.04] blur-[100px]" />

        <div className="absolute -bottom-40 -left-40 size-[420px] rounded-full bg-[#EAC435]/[0.035] blur-[100px]" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />
      </div>

      {/* Header */}

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <Link
            href="/"
            aria-label="The Creative Explorer home"
            className="inline-flex items-center"
          >
            <span className="font-bebit text-[1.7rem] tracking-[-0.04em]">
              <span className="text-[#03CEA4]">
                T
              </span>

              <span className="text-[#EAC435]">
                C
              </span>

              <span className="text-[#FB4D3D]">
                E
              </span>
            </span>
          </Link>

          <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">
            Project enquiry
          </span>
        </div>
      </header>

      {/* Main content */}

      <section className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-center px-6 py-32 text-center lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          {/* Success mark */}

          <div className="relative mb-10">
            <div className="absolute inset-[-14px] rounded-full border border-[#03CEA4]/10" />

            <div className="absolute inset-[-28px] rounded-full border border-white/[0.025]" />

            <div className="flex size-20 items-center justify-center rounded-full border border-[#03CEA4]/30 bg-[#03CEA4]/10">
              <Check
                strokeWidth={1.5}
                className="size-8 text-[#03CEA4]"
              />
            </div>
          </div>

          {/* Eyebrow */}

          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-7 bg-[#03CEA4]/60" />

            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#03CEA4]">
              Enquiry received
            </span>

            <span className="h-px w-7 bg-[#03CEA4]/60" />
          </div>

          {/* Heading */}

          <h1 className="font-abril text-[clamp(2.7rem,6vw,5.3rem)] font-normal leading-[0.96] tracking-[-0.045em] text-white">
            Your idea is
            <br />

            <span className="text-white/45">
              now in motion.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-[15px]">
            Thank you for reaching out to
            The Creative Explorer. Your
            project enquiry has been
            successfully received, and
            we&apos;ll review the details
            you&apos;ve shared.
          </p>

          <p className="mt-3 text-sm leading-7 text-white/35">
            Expect to hear from us within
            1–2 business days.
          </p>

          <div className="my-9 h-px w-16 bg-white/10" />

          {/* Home button */}

          <Link
            href="/"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#03CEA4] px-7 text-sm font-semibold text-[#07111f] transition duration-300 hover:scale-[1.02] hover:brightness-110"
          >
            <Home className="size-4" />

            Back to home

            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Countdown */}

          <div className="mt-7 flex items-center gap-2 text-xs text-white/25">
            <span>
              Returning home in
            </span>

            <span className="inline-flex min-w-5 justify-center font-medium tabular-nums text-white/55">
              {seconds}
            </span>

            <span>
              {seconds === 1
                ? "second"
                : "seconds"}
            </span>
          </div>

          {/* Progress */}

          <div className="mt-4 h-px w-36 overflow-hidden bg-white/[0.07]">
            <div
              className="h-full bg-[#03CEA4] transition-[width] duration-1000 ease-linear"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="absolute inset-x-0 bottom-7 z-20">
        <p className="text-center text-[9px] uppercase tracking-[0.28em] text-white/20">
          Explore creativity · Build
          innovation
        </p>
      </footer>
    </main>
  );
}