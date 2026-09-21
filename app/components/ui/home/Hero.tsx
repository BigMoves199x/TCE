"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../layout/Navbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      /* =========================
         HERO ENTRANCE
      ========================= */

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        "[data-hero-word]",
        { y: 45, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
        },
      )
        .fromTo(
          "[data-hero-caption]",
          { y: 12, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
          },
          "-=0.35",
        )
        .fromTo(
          "[data-scroll-label]",
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.5,
          },
          "-=0.2",
        );


      /* =========================
         BACKGROUND ENTRANCE
      ========================= */

      gsap.fromTo(
        "[data-idea-object]",
        {
          autoAlpha: 0,
          scale: 0.75,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.35,
        },
      );


      /* =========================
         FLOATING OBJECTS
      ========================= */

      gsap.utils
        .toArray<HTMLElement>("[data-float]")
        .forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 === 0 ? -16 : 16,
            x: index % 3 === 0 ? 10 : -8,
            rotate: index % 2 === 0 ? 5 : -5,
            duration: 5 + index * 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });


      /* =========================
         IDEA ORBITS
      ========================= */

      gsap.to("[data-orbit-one]", {
        rotate: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-orbit-two]", {
        rotate: -360,
        duration: 48,
        repeat: -1,
        ease: "none",
      });


      /* =========================
         THINKING NODES
      ========================= */

      gsap.utils
        .toArray<HTMLElement>("[data-node]")
        .forEach((node, index) => {
          gsap.to(node, {
            scale: 1.8,
            opacity: 0.18,
            duration: 1.8 + index * 0.25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });


      /* =========================
         DRAWING LINES
      ========================= */

      gsap.utils
        .toArray<HTMLElement>("[data-line]")
        .forEach((line, index) => {
          gsap.fromTo(
            line,
            {
              scaleX: 0.15,
              opacity: 0.03,
            },
            {
              scaleX: 1,
              opacity: 0.12,
              duration: 3 + index * 0.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              transformOrigin: "left center",
            },
          );
        });


      /* =========================
         FORMING SQUARE
      ========================= */

      gsap.to("[data-forming-square]", {
        rotate: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });


      /* =========================
         SMALL IDEA SPARK
      ========================= */

      gsap.to("[data-spark]", {
        scale: 1.35,
        opacity: 0.55,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.3,
          repeat: -1,
        },
        ease: "sine.inOut",
      });


      /* =========================
         MOUSE PARALLAX
      ========================= */

      const layers = gsap.utils.toArray<HTMLElement>(
        "[data-parallax]",
      );

      const handleMouseMove = (
        event: MouseEvent,
      ) => {
        const x =
          event.clientX / window.innerWidth - 0.5;

        const y =
          event.clientY / window.innerHeight - 0.5;

        layers.forEach((layer, index) => {
          const strength = (index + 1) * 5;

          gsap.to(layer, {
            x: x * strength,
            y: y * strength,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      window.addEventListener(
        "mousemove",
        handleMouseMove,
      );

      return () => {
        window.removeEventListener(
          "mousemove",
          handleMouseMove,
        );
      };
    }, hero);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#07111F] px-5 text-white sm:px-8 md:px-12 lg:px-16"
    >
      <Navbar />


      {/* ==================================
          BASE
      ================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[#07111F]" />


      {/* ==================================
          VERY FAINT THINKING GRID
      ================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />


      {/* ==================================
          SOFT BRAND ATMOSPHERE
      ================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 top-1/3 size-[25rem] rounded-full bg-[#03CEA4]/[0.05] blur-[150px]" />

        <div className="absolute -right-40 top-1/4 size-[25rem] rounded-full bg-[#FB4D3D]/[0.05] blur-[150px]" />

        <div className="absolute -bottom-52 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[#EAC435]/[0.05] blur-[160px]" />

      </div>


      {/* ==================================
          IDEA FORMATION SYSTEM
      ================================== */}

      <div
        data-parallax
        className="pointer-events-none absolute inset-0"
      >

        {/* LEFT THOUGHT CLUSTER */}

        <div
          data-idea-object
          data-float
          className="absolute left-[5%] top-[26%] hidden size-[190px] opacity-50 sm:block lg:left-[8%] lg:size-[240px]"
        >

          <div
            data-orbit-one
            className="absolute inset-0 rounded-full border border-white/[0.07]"
          >

            <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#03CEA4]/60" />

          </div>


          <div className="absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#03CEA4]/10" />


          <span
            data-node
            className="absolute left-[28%] top-[34%] size-2 rounded-full bg-[#EAC435]/70"
          />

          <span
            data-node
            className="absolute right-[22%] top-[45%] size-1.5 rounded-full bg-[#03CEA4]/70"
          />

          <span
            data-node
            className="absolute bottom-[20%] left-[45%] size-1 rounded-full bg-[#FB4D3D]/70"
          />


          <span
            data-line
            className="absolute left-[30%] top-[36%] h-px w-[45%] rotate-[18deg] bg-white"
          />

          <span
            data-line
            className="absolute left-[43%] top-[53%] h-px w-[30%] rotate-[68deg] bg-white"
          />

        </div>


        {/* RIGHT FORMING OBJECT */}

        <div
          data-idea-object
          data-float
          className="absolute right-[5%] top-[20%] hidden size-[210px] opacity-50 sm:block lg:right-[8%] lg:size-[280px]"
        >

          <div
            data-forming-square
            className="absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rotate-12 border border-[#FB4D3D]/15"
          />

          <div
            data-orbit-two
            className="absolute inset-[8%] rounded-full border border-dashed border-white/[0.07]"
          >

            <span className="absolute bottom-[8%] right-[10%] size-2 rounded-full bg-[#FB4D3D]/60" />

          </div>

          <span className="absolute left-[30%] top-[24%] text-lg font-light text-[#EAC435]/25">
            +
          </span>

          <span className="absolute bottom-[23%] right-[23%] text-lg font-light text-[#03CEA4]/25">
            ×
          </span>

        </div>


        {/* LOWER LEFT SKETCH */}

        <div
          data-idea-object
          data-float
          className="absolute bottom-[17%] left-[9%] hidden h-[120px] w-[170px] opacity-40 md:block"
        >

          <span className="absolute left-0 top-3 h-px w-24 rotate-[-12deg] bg-[#EAC435]/20" />

          <span className="absolute left-12 top-12 h-px w-28 rotate-[8deg] bg-white/10" />

          <span className="absolute left-5 top-[75px] h-px w-20 rotate-[-20deg] bg-[#03CEA4]/20" />

          <span
            data-spark
            className="absolute right-5 top-2 size-2 rounded-full bg-[#EAC435]"
          />

          <span
            data-spark
            className="absolute bottom-5 left-8 size-1.5 rounded-full bg-[#03CEA4]"
          />

        </div>


        {/* LOWER RIGHT MINI IDEA */}

        <div
          data-idea-object
          data-float
          className="absolute bottom-[19%] right-[11%] hidden size-28 opacity-40 md:block"
        >

          <span className="absolute inset-0 rounded-full border border-white/[0.08]" />

          <span className="absolute left-1/2 top-1/2 h-[140%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/[0.06]" />

          <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/[0.06]" />

          <span
            data-spark
            className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#FB4D3D]"
          />

        </div>

      </div>


      {/* ==================================
          CENTER IDEA HALO
      ================================== */}

      <div
        data-parallax
        className="pointer-events-none absolute left-1/2 top-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2 sm:size-[480px] lg:size-[650px]"
      >

        <div className="absolute inset-0 rounded-full border border-white/[0.025]" />

        <div className="absolute inset-[18%] rounded-full border border-dashed border-white/[0.025]" />

        <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EAC435]/10 blur-sm" />

      </div>


      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-center text-center">

        <div className="w-full">

          <h1 className="mx-auto max-w-[1050px] text-center font-black text-[clamp(3.5rem,14vw,5rem)] leading-[0.9] tracking-[-0.045em] sm:text-[clamp(4.5rem,10vw,6.5rem)] sm:leading-[0.88] md:text-[clamp(5rem,8.5vw,7.2rem)] lg:text-[clamp(5.5rem,7.2vw,8rem)]">

            <span className="block overflow-hidden pb-[0.08em]">
              <span
                data-hero-word
                className="block text-white"
              >
                Ideas
              </span>
            </span>

            <span className="block overflow-hidden pb-[0.08em]">
              <span
                data-hero-word
                className="block text-[#EAC435]"
              >
                Worth
              </span>
            </span>

            <span className="block overflow-hidden pb-[0.1em]">
              <span
                data-hero-word
                className="block text-[#FB4D3D]"
              >
                Building.
              </span>
            </span>

          </h1>


          {/* SUBTEXT */}

          <div
            data-hero-caption
            className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-8 sm:gap-x-4"
          >

            <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-white/80 sm:text-xs sm:tracking-[0.28em]">
              Branding
            </span>

            <span className="size-1 rounded-full bg-[#03CEA4]" />

            <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-white/80 sm:text-xs sm:tracking-[0.28em]">
              Technology
            </span>

            <span className="size-1 rounded-full bg-[#EAC435]" />

            <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-white/80 sm:text-xs sm:tracking-[0.28em]">
              Creative Production
            </span>

          </div>

        </div>

      </div>


      {/* ==================================
          SCROLL
      ================================== */}

      <div
        data-scroll-label
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-8"
      >

        <p className="text-[9px] font-normal uppercase tracking-[0.4em] text-white/55">
          Scroll
        </p>

        <div className="mx-auto mt-3 h-8 w-px overflow-hidden bg-white/15">
          <div className="h-3 w-full bg-[#03CEA4]" />
        </div>

      </div>


      {/* EDGE DETAILS */}

      <p className="absolute bottom-8 left-8 hidden text-[8px] uppercase tracking-[.24em] text-white/20 lg:block">
        Explore / Create / Build
      </p>

      <p className="absolute bottom-8 right-8 hidden text-[8px] uppercase tracking-[.24em] text-white/20 lg:block">
        TCE / 2026
      </p>

    </section>
  );
}