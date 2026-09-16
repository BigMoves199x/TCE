"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import Navbar from "../layout/Navbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /*
       * IMAGE ENTRANCE
       */
      timeline.fromTo(
        "[data-hero-image]",
        {
          scale: 1.08,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.6,
          ease: "power2.out",
        },
      );

      /*
       * IDEAS
       */
      timeline.fromTo(
        "[data-hero-word='ideas']",
        {
          yPercent: 120,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
        },
        "-=1.05",
      );

      /*
       * WORTH
       */
      timeline.fromTo(
        "[data-hero-word='worth']",
        {
          scale: 0.88,
          rotate: -3,
          autoAlpha: 0,
        },
        {
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.05,
        },
        "-=0.65",
      );

      /*
       * BUILDING
       */
      timeline.fromTo(
        "[data-hero-word='building']",
        {
          yPercent: -100,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
        },
        "-=0.7",
      );

      /*
       * CAPTION
       */
      timeline.fromTo(
        "[data-hero-caption]",
        {
          y: 18,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
        },
        "-=0.35",
      );

      /*
       * SCROLL LABEL
       */
      timeline.fromTo(
        "[data-scroll-label]",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.7,
        },
        "-=0.25",
      );

      /*
       * YELLOW GLOW
       */
      gsap.to("[data-worth-glow]", {
        scale: 1.12,
        opacity: 0.8,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /*
       * SLOW CINEMATIC IMAGE MOTION
       */
      gsap.to("[data-hero-image]", {
        scale: 1.035,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, hero);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative
        flex
        h-screen
        min-h-[700px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#07111f]
        px-5
        py-24
        text-white
        sm:px-8
        md:px-12
        lg:px-10
      "
    >
      <Navbar />

      {/* =========================================================
          HERO IMAGE
      ========================================================= */}

      <div
        data-hero-image
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/tce-team-hero.png"
          alt="Creative team collaborating"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* =========================================================
          MAIN NAVY OVERLAY
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[#07111f]/35
        "
      />

      {/* =========================================================
          HORIZONTAL GRADIENT
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-r
          from-[#07111f]/85
          via-[#07111f]/45
          to-[#07111f]/20
        "
      />

      {/* =========================================================
          VERTICAL GRADIENT
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-[#07111f]/30
          via-transparent
          to-[#07111f]/75
        "
      />

      {/* =========================================================
          AMBIENT COLOR GLOWS
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-[3]">
        {/* GREEN */}

        <div
          className="
            absolute
            -left-52
            top-1/3
            size-[32rem]
            rounded-full
            bg-[#03CEA4]/10
            blur-[180px]
          "
        />

        {/* RED */}

        <div
          className="
            absolute
            -right-52
            top-1/4
            size-[30rem]
            rounded-full
            bg-[#FB4D3D]/10
            blur-[180px]
          "
        />

        {/* YELLOW */}

        <div
          data-worth-glow
          className="
            absolute
            bottom-[-14rem]
            left-1/2
            size-[36rem]
            -translate-x-1/2
            rounded-full
            bg-[#EAC435]/15
            opacity-50
            blur-[180px]
          "
        />
      </div>

      {/* =========================================================
          DECORATIVE LINES
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-1/2
          z-[4]
          h-px
          bg-white/[0.05]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-[4]
          h-full
          w-px
          -translate-x-1/2
          bg-white/[0.04]
        "
      />

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div
  className="
    relative
    z-10
    mx-auto
    flex
    w-full
    max-w-7xl
    -translate-y-[3vh]
    flex-col
    items-center
    justify-center
    text-center
  "
>
  <div className="w-full max-w-6xl">
    <h1
      className="
        font-bold
        text-[clamp(4rem,9.5vw,10.5rem)]
        leading-[0.78]
        tracking-[-0.06em]
        drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)]
      "
    >
      {/* IDEAS */}
      <span className="block overflow-hidden pb-[0.04em]">
        <span
          data-hero-word="ideas"
          className="block"
        >
          Ideas
        </span>
      </span>

      {/* WORTH */}
      <span
        className="
          relative
          block
          overflow-visible
          py-[0.08em]
        "
      >
        <span
          data-hero-word="worth"
          className="
            relative
            z-10
            block
            scale-[1.04]
            text-[#EAC435]
            sm:scale-[1.08]
          "
        >
          Worth
        </span>

        <span
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            -z-0
            h-[50%]
            w-[70%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#EAC435]/10
            blur-3xl
          "
        />
      </span>

      {/* BUILDING */}
      <span className="block overflow-hidden pt-[0.16em] pb-[0.08em]">
        <span
          data-hero-word="building"
          className="
            relative
            z-10
            block
            text-[#FB4D3D]
          "
        >
          Building.
        </span>
      </span>
    </h1>

    <p
      data-hero-caption
      className="
        mx-auto
        mt-7
        max-w-3xl
        text-[10px]
        font-medium
        uppercase
        tracking-[0.32em]
        text-white/70
        sm:text-xs
        sm:tracking-[0.48em]
      "
    >
      Branding

      <span className="mx-3 text-[#03CEA4]">•</span>

      Technology

      <span className="mx-3 text-[#FB4D3D]">•</span>

      Creative Production
    </p>
  </div>
</div>
      {/* =========================================================
          SCROLL LABEL
      ========================================================= */}

      <div
        data-scroll-label
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          -translate-x-1/2
          sm:bottom-10
        "
      >
        <p
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.5em]
            text-white/45
          "
        >
          Scroll
        </p>

        <div
          className="
            mx-auto
            mt-3
            h-10
            w-px
            overflow-hidden
            bg-white/15
          "
        >
          <div
            className="
              h-4
              w-full
              animate-[heroScrollLine_1.8s_ease-in-out_infinite]
              bg-[#03CEA4]
            "
          />
        </div>
      </div>

    </section>
  );
}