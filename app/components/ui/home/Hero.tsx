"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import Navbar from "../layout/Navbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
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
        )
        .fromTo(
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
        )
        .fromTo(
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
        )
        .fromTo(
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
        )
        .fromTo(
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

      gsap.to("[data-worth-glow]", {
        scale: 1.12,
        opacity: 0.8,
        duration: 3.2,
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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07111f] px-5 py-24 text-white sm:px-8 md:px-12 lg:px-10"
    >
      <Navbar />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-1/3 size-[32rem] rounded-full bg-[#03CEA4]/10 blur-[180px]" />

        <div className="absolute -right-52 top-1/4 size-[30rem] rounded-full bg-[#FB4D3D]/10 blur-[180px]" />

        <div
          data-worth-glow
          className="absolute bottom-[-14rem] left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[#EAC435]/15 opacity-50 blur-[180px]"
        />
      </div>

      {/* Decorative lines */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/[0.035]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.025]" />

      {/* Main hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
        <div className="w-full max-w-6xl">
          <h1 className=" font-bold text-[clamp(4.8rem,10vw,11rem)] leading-[0.78] tracking-[-0.065em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                data-hero-word="ideas"
                className="block"
              >
                Ideas
              </span>
            </span>

            <span className="relative block overflow-visible py-[0.05em]">
              <span
                data-hero-word="worth"
                className="relative z-10 block scale-[1.06] text-[#EAC435] sm:scale-[1.1]"
              >
                Worth
              </span>

              <span className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EAC435]/10 blur-3xl" />
            </span>

            <span className="block overflow-hidden pt-[0.08em]">
              <span
                data-hero-word="building"
                className="block"
              >
                Building.
              </span>
            </span>
          </h1>

          <p
            data-hero-caption
            className="mx-auto mt-4 max-w-3xl text-[10px] font-medium uppercase tracking-[0.32em] text-white/35 sm:text-xs sm:tracking-[0.48em]"
          >
            Branding
            <span className="mx-3 text-[#03CEA4]">•</span>
            Technology
            <span className="mx-3 text-[#FB4D3D]">•</span>
            Creative Production
          </p>
        </div>
      </div>

      {/* Minimal scroll cue */}
      <div
        data-scroll-label
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 sm:bottom-10"
      >
        <p className="text-[9px] font-medium uppercase tracking-[0.5em] text-white/25">
          Scroll
        </p>

        <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-white/10">
          <div className="h-4 w-full animate-[heroScrollLine_1.8s_ease-in-out_infinite] bg-[#03CEA4]" />
        </div>
      </div>

      {/* Corner details */}
      <p className="absolute bottom-8 left-8 hidden text-[9px] uppercase tracking-[0.35em] text-white/20 lg:block">
        The Creative Explorer
      </p>

      <p className="absolute bottom-8 right-8 hidden text-[9px] uppercase tracking-[0.35em] text-white/20 lg:block">
        Est. 2026
      </p>
    </section>
  );
}