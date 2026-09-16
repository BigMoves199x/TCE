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
      gsap.set("[data-reveal]", {
        y: 18,
        autoAlpha: 0,
      });

      gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      }).to("[data-reveal]", {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
      });

      gsap.to("[data-marquee-top]", {
        xPercent: -50,
        duration: 34,
        repeat: -1,
        ease: "none",
      });

      gsap.fromTo(
        "[data-marquee-bottom]",
        {
          xPercent: -50,
        },
        {
          xPercent: 0,
          duration: 38,
          repeat: -1,
          ease: "none",
        },
      );

      gsap.to("[data-ticket-ring]", {
        scale: 1.08,
        autoAlpha: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        overflow-hidden
        bg-[#07111f]
        text-white
      "
      aria-label="TCE Sip and Paint"
    >
      {/* =========================================================
          SOFT BACKGROUND ACCENTS
      ========================================================= */}

      <div className="absolute inset-0 bg-[#07111f]" />

      <div className="pointer-events-none absolute -left-40 top-[25%] size-[28rem] rounded-full bg-[#03CEA4]/[0.06] blur-[150px]" />

      <div className="pointer-events-none absolute -right-32 bottom-[18%] size-[26rem] rounded-full bg-[#FB4D3D]/[0.05] blur-[160px]" />

      {/* =========================================================
          TOP SLIDING TEXT
      ========================================================= */}

      <div className="pointer-events-none absolute left-0 top-[9%] w-full overflow-hidden">
        <div
          data-marquee-top
          className="flex w-max whitespace-nowrap"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center pr-14"
            >
              <span className="font-abril text-[clamp(2.6rem,4.5vw,4.8rem)] font-normal tracking-[-0.035em] text-white/[0.04]">
                SIP
              </span>

              <span className="px-7 text-lg text-[#EAC435]/25">
                ✦
              </span>

              <span className="font-abril text-[clamp(2.6rem,4.5vw,4.8rem)] font-normal tracking-[-0.035em] text-[#03CEA4]/[0.07]">
                PAINT
              </span>

              <span className="px-7 text-lg text-[#FB4D3D]/25">
                ✦
              </span>

              <span className="font-abril text-[clamp(2.6rem,4.5vw,4.8rem)] font-normal tracking-[-0.035em] text-white/[0.04]">
                CREATE
              </span>

              <span className="px-7 text-lg text-[#EAC435]/25">
                ✦
              </span>

              <span className="font-abril text-[clamp(2.6rem,4.5vw,4.8rem)] font-normal tracking-[-0.035em] text-[#FB4D3D]/[0.07]">
                CONNECT
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 py-32 text-center sm:px-10 lg:px-14">
        {/* EYEBROW */}

        <div
          data-reveal
          className="flex items-center gap-4"
        >
          <span className="h-px w-8 bg-[#03CEA4]/70" />

          <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#03CEA4]/80 sm:text-[10px]">
            The Creative Explorer Presents
          </p>

          <span className="h-px w-8 bg-[#03CEA4]/70" />
        </div>

        {/* HEADLINE */}

        <div
          data-reveal
          className="mt-9 max-w-4xl"
        >
          <h2
            className="
              font-abril
              text-[clamp(3rem,5.5vw,5.8rem)]
              font-normal
              leading-[0.96]
              tracking-[-0.04em]
              text-white
            "
          >
            An invitation to create,
            <span className="block text-[#EAC435]">
              connect and linger.
            </span>
          </h2>
        </div>

        {/* COPY */}

        <p
          data-reveal
          className="
            mt-7
            max-w-2xl
            text-sm
            leading-7
            text-white/46
            sm:text-[15px]
            sm:leading-8
          "
        >
          A thoughtfully curated Sip & Paint experience by
          The Creative Explorer — with guided painting, drinks,
          chops and an atmosphere designed for easy creativity.
        </p>

        {/* DIVIDER */}

        <div
          data-reveal
          className="mt-9 h-px w-20 bg-white/[0.12]"
        />

        {/* PRICE */}

        <div
          data-reveal
          className="mt-8"
        >
          <p className="text-[9px] uppercase tracking-[0.24em] text-white/28">
            Admission
          </p>

          <p
            className="
              mt-2
              font-abril
              text-[clamp(3.1rem,5vw,4.8rem)]
              font-normal
              tracking-[-0.045em]
              text-white
            "
          >
            ₦20,000
          </p>

          <p className="mt-1 text-[10px] tracking-wide text-white/25">
            per guest
          </p>
        </div>

        {/* DISCOUNT */}

        <div
          data-reveal
          className="
            mt-7
            rounded-full
            border
            border-[#EAC435]/25
            bg-[#EAC435]/[0.06]
            px-6
            py-3
          "
        >
          <p className="text-[10px] font-medium tracking-[0.13em] text-[#EAC435]">
            First 20 guests receive 20% off
            <span className="mx-2 text-white/20">
              •
            </span>
            ₦16,000
          </p>
        </div>

        {/* INCLUSIONS */}

        <div
          data-reveal
          className="
            mt-9
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-8
            gap-y-4
          "
        >
          <Inclusion
            icon={<Palette className="size-3.5" />}
            text="Guided painting"
          />

          <Inclusion
            icon={<GlassWater className="size-3.5" />}
            text="Drinks included"
          />

          <Inclusion
            icon={<UtensilsCrossed className="size-3.5" />}
            text="Chops included"
          />
        </div>

        {/* CTA */}

        <div
          data-reveal
          className="relative mt-10"
        >
          <span
            data-ticket-ring
            className="pointer-events-none absolute inset-0 rounded-full border border-[#03CEA4]/35"
          />

          <Link
            href="/events/sip-and-paint"
            className="
              group
              relative
              inline-flex
              min-h-14
              items-center
              justify-center
              gap-3
              rounded-full
              border
              border-[#03CEA4]/30
              bg-[#03CEA4]
              px-9
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#07111f]
              transition-all
              duration-300
              hover:bg-white
            "
          >
            <Ticket className="size-3.5" />

            Reserve Your Seat

            <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <p
          data-reveal
          className="mt-4 text-[8px] uppercase tracking-[0.22em] text-white/20"
        >
          Limited spaces available
        </p>
      </div>

      {/* =========================================================
          BOTTOM SLIDING TEXT
      ========================================================= */}

      <div className="pointer-events-none absolute bottom-[6%] left-0 w-full overflow-hidden">
        <div
          data-marquee-bottom
          className="flex w-max whitespace-nowrap"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center pr-14"
            >
              <span className="font-abril text-[clamp(2.2rem,4vw,4.2rem)] font-normal tracking-[-0.03em] text-[#FB4D3D]/[0.06]">
                CREATE
              </span>

              <span className="px-7 text-base text-[#03CEA4]/25">
                •
              </span>

              <span className="font-abril text-[clamp(2.2rem,4vw,4.2rem)] font-normal tracking-[-0.03em] text-white/[0.035]">
                SIP
              </span>

              <span className="px-7 text-base text-[#EAC435]/25">
                •
              </span>

              <span className="font-abril text-[clamp(2.2rem,4vw,4.2rem)] font-normal tracking-[-0.03em] text-[#03CEA4]/[0.055]">
                EXPERIENCE
              </span>

              <span className="px-7 text-base text-[#FB4D3D]/25">
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FRAME */}

      <div className="pointer-events-none absolute inset-6 border border-white/[0.04] sm:inset-8 lg:inset-10" />
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
      <span className="text-[#EAC435]/75">
        {icon}
      </span>

      <span className="text-[9px] font-normal uppercase tracking-[0.15em] text-white/38">
        {text}
      </span>
    </div>
  );
}