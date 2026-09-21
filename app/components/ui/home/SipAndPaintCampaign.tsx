"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowUpRight,
  GlassWater,
  Palette,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";

export default function SipAndPaintCampaign() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      gsap.set("[data-word]", {
        yPercent: 115,
        rotate: 2,
      });

      gsap.set("[data-reveal]", {
        y: 18,
        autoAlpha: 0,
      });

      gsap.set("[data-ticket]", {
        y: 35,
        rotate: 5,
        autoAlpha: 0,
      });

      tl.to("[data-word]", {
        yPercent: 0,
        rotate: 0,
        duration: 0.95,
        stagger: 0.1,
      })
        .to(
          "[data-reveal]",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            stagger: 0.07,
          },
          "-=.55",
        )
        .to(
          "[data-ticket]",
          {
            y: 0,
            rotate: -3,
            autoAlpha: 1,
            duration: 0.9,
          },
          "-=.6",
        );

      gsap.to("[data-float-one]", {
        y: -12,
        rotate: 5,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-float-two]", {
        y: 14,
        rotate: -7,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-orbit]", {
        rotate: 360,
        duration: 32,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-marquee]", {
        xPercent: -50,
        duration: 28,
        repeat: -1,
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#F2EEE3] text-[#07111F]"
      aria-label="TCE Sip and Paint campaign"
    >
      {/* CAMPAIGN FRAME */}
      <div className="pointer-events-none absolute inset-3 border border-[#07111F]/10 sm:inset-5" />


      {/* TOP CAMPAIGN BAR */}
      <header className="relative z-30 mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-7 sm:px-10 lg:px-14">
        <p
          data-reveal
          className="text-[9px] font-bold uppercase tracking-[.25em] text-[#07111F]/55 sm:text-[10px]"
        >
          The Creative Explorer Presents
        </p>

        <p
          data-reveal
          className="text-[9px] font-bold uppercase tracking-[.2em] text-[#FB4D3D]"
        >
          TCE / Experience 001
        </p>
      </header>


      {/* DECORATIVE ART */}
      <div
        data-float-one
        className="pointer-events-none absolute -left-10 top-[20%] size-28 rounded-full bg-[#03CEA4] sm:left-[4%] sm:size-36 lg:size-44"
      />

      <div
        data-float-two
        className="pointer-events-none absolute -right-10 top-[14%] size-32 rotate-12 bg-[#FB4D3D] sm:right-[5%] sm:size-40 lg:size-48"
      />

      <div
        data-orbit
        className="pointer-events-none absolute -right-16 bottom-[14%] size-44 rounded-full border border-[#07111F]/10 sm:right-[5%] sm:size-64"
      >
        <span className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#03CEA4]" />
      </div>


      {/* MAIN CAMPAIGN */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-24 pt-12 sm:px-10 sm:pb-28 sm:pt-16 lg:px-14 lg:pt-20">

        {/* INTRO */}
        <div
          data-reveal
          className="mx-auto mb-8 max-w-[760px] text-center sm:mb-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#CA1551]">
            A creative social experience
          </p>
        </div>


        {/* HERO TYPOGRAPHY */}
        <div className="relative mx-auto max-w-[1200px] text-center">

          <div className="overflow-hidden">
            <h1
              data-word
              className="font-abril text-[clamp(5rem,17vw,13rem)] font-black leading-[.7] tracking-[-.065em]"
            >
              SIP.
            </h1>
          </div>

          <div className="overflow-hidden">
            <h2
              data-word
              className="font-abril text-[clamp(5rem,17vw,13rem)] font-black leading-[.7] tracking-[-.065em] text-[#FB4D3D]"
            >
              PAINT.
            </h2>
          </div>

          <div className="overflow-hidden pb-5">
            <h2
              data-word
              className="font-abril text-[clamp(4.3rem,14vw,11rem)] font-black leading-[.78] tracking-[-.06em] text-[#03CEA4]"
            >
              CONNECT.
            </h2>
          </div>


          {/* TICKET */}
          <div
            data-ticket
            className="relative z-20 mx-auto -mt-1 w-[min(88%,350px)] rotate-[-3deg] bg-[#EAC435] px-6 py-6 shadow-[10px_12px_0_rgba(7,17,31,.12)] sm:absolute sm:-bottom-16 sm:right-[2%] sm:mt-0 sm:w-[310px] lg:right-[5%]"
          >
            {/* ticket cuts */}
            <span className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-[#F2EEE3]" />
            <span className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-[#F2EEE3]" />

            <div className="border-b border-[#07111F]/15 pb-4">
              <p className="text-[8px] font-bold uppercase tracking-[.25em] text-[#07111F]/55">
                Admission
              </p>

              <p className="mt-1 font-abril text-5xl tracking-[-.045em]">
                ₦20,000
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[.18em] text-[#07111F]/50">
                Per guest
              </p>
            </div>

            <div className="pt-4">
              <p className="text-[9px] font-black uppercase tracking-[.17em] text-[#CA1551]">
                Early Explorer Offer
              </p>

              <p className="mt-1 text-sm font-bold">
                First 20 guests — ₦16,000
              </p>

              <p className="mt-1 text-[9px] text-[#07111F]/50">
                20% off admission
              </p>
            </div>
          </div>

        </div>


        {/* EXPERIENCE COPY */}
        <div className="mx-auto mt-12 max-w-[620px] text-center sm:mt-24 lg:mt-28">

          <p
            data-reveal
            className="text-[15px] font-medium leading-7 text-[#07111F]/65 sm:text-base sm:leading-8"
          >
            An evening to paint without pressure, sip something good,
            meet people and enjoy creativity for what it is — an experience.
          </p>


          {/* INCLUSIONS */}
          <div
            data-reveal
            className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
          >
            <Inclusion
              icon={<Palette className="size-3.5" />}
              text="Guided painting"
            />

            <Inclusion
              icon={<GlassWater className="size-3.5" />}
              text="Drinks"
            />

            <Inclusion
              icon={<UtensilsCrossed className="size-3.5" />}
              text="Chops"
            />
          </div>


          {/* CTA */}
          <div data-reveal className="mt-9">
            <Link
              href="/events/sip-and-paint"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#07111F] px-8 text-[9px] font-bold uppercase tracking-[.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#FB4D3D]"
            >
              <Ticket className="size-3.5" />

              Reserve Your Seat

              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <p className="mt-4 text-[8px] font-semibold uppercase tracking-[.22em] text-[#07111F]/35">
              Limited spaces available
            </p>
          </div>

        </div>

      </div>


      {/* BOTTOM CAMPAIGN MARQUEE */}
      <div className="relative z-20 overflow-hidden border-y border-[#07111F]/10 bg-[#07111F] py-3">
        <div
          data-marquee
          className="flex w-max whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center"
            >
              <span className="px-5 text-[9px] font-bold uppercase tracking-[.22em] text-white">
                Sip
              </span>

              <span className="text-[#EAC435]">✦</span>

              <span className="px-5 text-[9px] font-bold uppercase tracking-[.22em] text-white">
                Paint
              </span>

              <span className="text-[#FB4D3D]">✦</span>

              <span className="px-5 text-[9px] font-bold uppercase tracking-[.22em] text-white">
                Create
              </span>

              <span className="text-[#03CEA4]">✦</span>

              <span className="px-5 text-[9px] font-bold uppercase tracking-[.22em] text-white">
                Connect
              </span>

              <span className="mr-5 text-[#EAC435]">✦</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}


function Inclusion({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#CA1551]">
        {icon}
      </span>

      <span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#07111F]/55">
        {text}
      </span>
    </div>
  );
}