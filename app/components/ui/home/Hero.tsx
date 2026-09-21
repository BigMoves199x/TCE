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
      const ideas = hero.querySelector<HTMLElement>("[data-word-ideas]");
      const worth = hero.querySelector<HTMLElement>("[data-word-worth]");
      const building = hero.querySelector<HTMLElement>("[data-word-building]");
      const caption = hero.querySelector<HTMLElement>("[data-hero-caption]");
      const scroll = hero.querySelector<HTMLElement>("[data-scroll-label]");
      const paper = hero.querySelector<HTMLElement>("[data-paper-edge]");
      const halo = hero.querySelector<HTMLElement>("[data-center-halo]");
      const edgeLeft = hero.querySelector<HTMLElement>("[data-edge-left]");
      const edgeRight = hero.querySelector<HTMLElement>("[data-edge-right]");
      const ideaObjects = gsap.utils.toArray<HTMLElement>("[data-idea-object]", hero);
      const layers = gsap.utils.toArray<HTMLElement>("[data-parallax]", hero);

      let firstLoad = true;
      let heroVisible = true;
      let entrance: gsap.core.Timeline | null = null;

      /* =========================================================
         HERO TEXT REVEAL
      ========================================================= */

      const revealHero = (returning = false) => {
        entrance?.kill();

        gsap.killTweensOf([ideas, worth, building, caption, scroll, paper, halo, edgeLeft, edgeRight]);

        entrance = gsap.timeline();

        /* IDEAS — DISCOVERY */
        entrance.fromTo(
          ideas,
          {
            yPercent: returning ? -115 : 115,
            rotate: returning ? -2 : 2,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power4.out",
          },
          0,
        );

        /* WORTH — EXPANSION */
        entrance.fromTo(
          worth,
          {
            x: returning ? 75 : -75,
            scale: 0.8,
            letterSpacing: "0.03em",
            autoAlpha: 0,
          },
          {
            x: 0,
            scale: 1,
            letterSpacing: "-0.045em",
            autoAlpha: 1,
            duration: 1,
            ease: "expo.out",
          },
          0.1,
        );

        /* BUILDING — CONSTRUCTION */
        entrance.fromTo(
          building,
          {
            yPercent: returning ? -125 : 125,
            scaleY: 0.72,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            scaleY: 1,
            autoAlpha: 1,
            duration: 1,
            ease: "power4.out",
          },
          0.2,
        );

        /* CAPTION */
        entrance.fromTo(
          caption,
          {
            y: returning ? -16 : 16,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          0.52,
        );

        /* EDGE DETAILS */
        entrance.fromTo(
          [edgeLeft, edgeRight],
          {
            y: returning ? -10 : 10,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.6,
        );

        /* SCROLL */
        entrance.fromTo(
          scroll,
          {
            y: returning ? -12 : 12,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          0.68,
        );

        /* PAPER EDGE */
        entrance.fromTo(
          paper,
          {
            y: returning ? -10 : 20,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          0.3,
        );

        /* CENTRAL HALO */
        entrance.fromTo(
          halo,
          {
            scale: returning ? 1.1 : 0.85,
            autoAlpha: 0,
          },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          0.05,
        );

        /* IDEA OBJECTS */
        entrance.fromTo(
          ideaObjects,
          {
            scale: returning ? 1.08 : 0.72,
            autoAlpha: 0,
          },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.4,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.05,
        );
      };

      revealHero(false);

      /* =========================================================
         FLOATING OBJECTS
      ========================================================= */

      gsap.utils.toArray<HTMLElement>("[data-float]", hero).forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -15 : 15,
          x: index % 3 === 0 ? 9 : -7,
          rotate: index % 2 === 0 ? 4 : -4,
          duration: 5 + index * 0.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* =========================================================
         ORBITS
      ========================================================= */

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

      gsap.to("[data-forming-square]", {
        rotate: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });

      /* =========================================================
         THINKING NODES
      ========================================================= */

      gsap.utils.toArray<HTMLElement>("[data-node]", hero).forEach((node, index) => {
        gsap.to(node, {
          scale: 1.7,
          opacity: 0.38,
          duration: 1.8 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* =========================================================
         DRAWING LINES
      ========================================================= */

      gsap.utils.toArray<HTMLElement>("[data-line]", hero).forEach((line, index) => {
        gsap.fromTo(
          line,
          {
            scaleX: 0.15,
            opacity: 0.08,
          },
          {
            scaleX: 1,
            opacity: 0.3,
            duration: 3 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "left center",
          },
        );
      });

      /* =========================================================
         SPARKS
      ========================================================= */

      gsap.utils.toArray<HTMLElement>("[data-spark]", hero).forEach((spark, index) => {
        gsap.to(spark, {
          scale: 1.4,
          opacity: 0.8,
          duration: 1.8 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* =========================================================
         MOUSE PARALLAX
      ========================================================= */

      const handleMouseMove = (event: MouseEvent) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        layers.forEach((layer, index) => {
          const strength = 4 + index * 5;

          gsap.to(layer, {
            x: x * strength,
            y: y * strength,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      /* =========================================================
         REPLAY HERO WHEN SCROLLING BACK UP
      ========================================================= */

      const intersection = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.55 && !heroVisible) {
            heroVisible = true;

            if (!firstLoad) {
              revealHero(true);
            }
          }

          if (!entry.isIntersecting) {
            heroVisible = false;
            firstLoad = false;
          }
        },
        {
          threshold: [0, 0.2, 0.35, 0.55, 0.75, 1],
        },
      );

      intersection.observe(hero);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        intersection.disconnect();
        entrance?.kill();
      };
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#F7F3EA] px-5 pb-16 text-[#07111F] sm:px-8 sm:pb-20 md:px-12 lg:px-16">

      <Navbar />

      {/* BASE */}
      <div className="pointer-events-none absolute inset-0 bg-[#F7F3EA]" />

      {/* EDITORIAL GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(7,17,31,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(7,17,31,.16)_1px,transparent_1px)] [background-size:70px_70px]" />

      {/* PAPER GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_center,#07111F_0.55px,transparent_0.7px)] [background-size:6px_6px]" />

      {/* VERY SOFT CENTER LIGHT */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[140px] sm:size-[850px]" />

      {/* SMALL EDITORIAL MARKS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-4 top-[10%] font-black text-[8rem] leading-none text-[#07111F]/[0.025] sm:text-[12rem] lg:text-[17rem]">+</span>
        <span className="absolute -right-5 bottom-[10%] font-black text-[9rem] leading-none text-[#345995]/[0.035] sm:text-[14rem] lg:text-[19rem]">×</span>
      </div>

      {/* =========================================================
          IDEA FORMATION
      ========================================================= */}

      <div data-parallax className="pointer-events-none absolute inset-0">

        {/* LEFT THOUGHT CLUSTER */}
        <div data-idea-object data-float className="absolute left-[4%] top-[23%] hidden size-[190px] opacity-70 sm:block lg:left-[8%] lg:size-[240px]">

          <div data-orbit-one className="absolute inset-0 rounded-full border border-[#07111F]/15">
            <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#03CEA4]" />
          </div>

          <div className="absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#345995]/20" />

          <span data-node className="absolute left-[28%] top-[34%] size-2 rounded-full bg-[#EAC435]" />
          <span data-node className="absolute right-[22%] top-[45%] size-1.5 rounded-full bg-[#03CEA4]" />
          <span data-node className="absolute bottom-[20%] left-[45%] size-1.5 rounded-full bg-[#FB4D3D]" />

          <span data-line className="absolute left-[30%] top-[36%] h-px w-[45%] rotate-[18deg] bg-[#07111F]" />
          <span data-line className="absolute left-[43%] top-[53%] h-px w-[30%] rotate-[68deg] bg-[#07111F]" />

        </div>

        {/* RIGHT FORMING OBJECT */}
        <div data-idea-object data-float className="absolute right-[4%] top-[18%] hidden size-[210px] opacity-70 sm:block lg:right-[8%] lg:size-[280px]">

          <div data-forming-square className="absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rotate-12 border border-[#FB4D3D]/35" />

          <div data-orbit-two className="absolute inset-[8%] rounded-full border border-dashed border-[#07111F]/15">
            <span className="absolute bottom-[8%] right-[10%] size-2.5 rounded-full bg-[#FB4D3D]" />
          </div>

          <span className="absolute left-[30%] top-[24%] text-xl font-light text-[#EAC435]">+</span>
          <span className="absolute bottom-[23%] right-[23%] text-xl font-light text-[#03CEA4]">×</span>

        </div>

        {/* LOWER LEFT SKETCH */}
        <div data-idea-object data-float className="absolute bottom-[22%] left-[8%] hidden h-[120px] w-[170px] opacity-65 md:block">

          <span className="absolute left-0 top-3 h-px w-24 rotate-[-12deg] bg-[#EAC435]/80" />
          <span className="absolute left-12 top-12 h-px w-28 rotate-[8deg] bg-[#07111F]/20" />
          <span className="absolute left-5 top-[75px] h-px w-20 rotate-[-20deg] bg-[#345995]/45" />

          <span data-spark className="absolute right-5 top-2 size-2 rounded-full bg-[#FB4D3D]" />
          <span data-spark className="absolute bottom-5 left-8 size-1.5 rounded-full bg-[#03CEA4]" />

        </div>

        {/* LOWER RIGHT IDEA */}
        <div data-idea-object data-float className="absolute bottom-[23%] right-[10%] hidden size-28 opacity-60 md:block">

          <span className="absolute inset-0 rounded-full border border-[#07111F]/15" />
          <span className="absolute left-1/2 top-1/2 h-[140%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#07111F]/10" />
          <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#07111F]/10" />

          <span data-spark className="absolute right-0 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#CA1551]" />

        </div>

      </div>

      {/* =========================================================
          CENTRAL IDEA HALO
      ========================================================= */}

      <div data-center-halo data-parallax className="pointer-events-none absolute left-1/2 top-1/2 size-[330px] -translate-x-1/2 -translate-y-1/2 sm:size-[480px] lg:size-[650px]">

        <div className="absolute inset-0 rounded-full border border-[#07111F]/[0.045]" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-[#345995]/[0.08]" />

        <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EAC435]/40" />

      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-center text-center">

        <div className="w-full">

          <h1 className="mx-auto max-w-[1050px] text-center font-black text-[clamp(3.5rem,14vw,5rem)] leading-[0.9] tracking-[-0.045em] sm:text-[clamp(4.5rem,10vw,6.5rem)] sm:leading-[0.88] md:text-[clamp(5rem,8.5vw,7.2rem)] lg:text-[clamp(5.5rem,7.2vw,8rem)]">

            {/* IDEAS */}
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-word-ideas className="block text-[#07111F]">Ideas</span>
            </span>

            {/* WORTH */}
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-word-worth className="block text-[#CA1551]">Worth</span>
            </span>

            {/* BUILDING */}
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-word-building className="block origin-bottom text-[#345995]">Building.</span>
            </span>

          </h1>

          {/* CAPTION */}
          <div data-hero-caption className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-8 sm:gap-x-4">

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07111F]/65 sm:text-xs sm:tracking-[0.28em]">Branding</span>

            <span className="size-1 rounded-full bg-[#FB4D3D]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07111F]/65 sm:text-xs sm:tracking-[0.28em]">Technology</span>

            <span className="size-1 rounded-full bg-[#EAC435]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07111F]/65 sm:text-xs sm:tracking-[0.28em]">Creative Production</span>

          </div>

        </div>

      </div>

      {/* =========================================================
          SCROLL
      ========================================================= */}

      <div data-scroll-label className="absolute bottom-[5.5rem] left-1/2 z-20 -translate-x-1/2 sm:bottom-24">

        <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#07111F]/45">Scroll</p>

        <div className="mx-auto mt-3 h-7 w-px overflow-hidden bg-[#07111F]/15">
          <div className="h-3 w-full bg-[#03CEA4]" />
        </div>

      </div>

      {/* =========================================================
          EDGE DETAILS
      ========================================================= */}

      <p data-edge-left className="absolute bottom-20 left-8 z-20 hidden text-[8px] font-semibold uppercase tracking-[.24em] text-[#07111F]/30 lg:block">Explore / Create / Build</p>

      <p data-edge-right className="absolute bottom-20 right-8 z-20 hidden text-[8px] font-semibold uppercase tracking-[.24em] text-[#07111F]/30 lg:block">TCE / 2026</p>

      {/* =========================================================
          TORN PAPER EDGE
      ========================================================= */}

      <div data-paper-edge className="pointer-events-none absolute bottom-0 left-0 z-30 h-[58px] w-full sm:h-[66px]">

        {/* SHADOW */}
        <div className="absolute bottom-0 left-0 h-[48px] w-full bg-[#07111F]/12 blur-[5px]" style={{ clipPath: "polygon(0 20%,3% 29%,7% 21%,10% 37%,14% 26%,18% 34%,22% 18%,26% 30%,30% 24%,34% 40%,38% 27%,42% 35%,46% 20%,50% 32%,54% 24%,58% 41%,62% 29%,66% 36%,70% 21%,74% 32%,78% 18%,82% 38%,86% 26%,90% 34%,94% 21%,97% 31%,100% 25%,100% 100%,0 100%)" }} />

        {/* NEXT SECTION PAPER */}
        <div className="absolute bottom-0 left-0 h-[52px] w-full bg-[#EEE8DB]" style={{ clipPath: "polygon(0 28%,3% 36%,6% 25%,9% 42%,13% 30%,16% 38%,20% 23%,24% 34%,27% 28%,31% 44%,35% 32%,39% 39%,43% 25%,47% 36%,51% 27%,55% 43%,59% 31%,63% 40%,67% 26%,71% 37%,75% 23%,79% 42%,83% 30%,87% 38%,91% 25%,95% 35%,100% 29%,100% 100%,0 100%)" }} />

        {/* HERO PAPER */}
        <div className="absolute inset-0 bg-[#F7F3EA]" style={{ clipPath: "polygon(0 0,100% 0,100% 22%,97% 31%,94% 19%,91% 35%,88% 27%,85% 42%,81% 24%,78% 36%,74% 21%,71% 39%,67% 29%,63% 43%,60% 25%,56% 35%,52% 20%,49% 40%,45% 28%,41% 36%,37% 22%,33% 42%,30% 26%,26% 35%,22% 19%,18% 38%,15% 27%,11% 41%,8% 23%,4% 34%,0 25%)" }} />

        {/* PAPER FIBRES */}
        <span className="absolute bottom-[14px] left-[8%] h-px w-7 rotate-[-7deg] bg-[#07111F]/15" />
        <span className="absolute bottom-[8px] left-[23%] h-px w-4 rotate-[12deg] bg-[#07111F]/10" />
        <span className="absolute bottom-[15px] left-[42%] h-px w-8 rotate-[-5deg] bg-[#07111F]/10" />
        <span className="absolute bottom-[9px] left-[61%] h-px w-5 rotate-[8deg] bg-[#07111F]/10" />
        <span className="absolute bottom-[15px] left-[78%] h-px w-6 rotate-[-9deg] bg-[#07111F]/10" />
        <span className="absolute bottom-[8px] left-[91%] h-px w-4 rotate-[5deg] bg-[#07111F]/10" />

      </div>

    </section>
  );
}