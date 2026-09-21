"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const stages = [
  {
    number: "01",
    label: "Explore",
    title: "What if?",
    description: "Before an idea becomes something, there is curiosity — a question, a possibility, something worth following.",
    accent: "#EAC435",
    background: "#F3EFE5",
  },
  {
    number: "02",
    label: "Create",
    title: "Give it form.",
    description: "Creativity gives possibility a language — something we can begin to see, feel and understand.",
    accent: "#FB4D3D",
    background: "#F6E9E3",
  },
  {
    number: "03",
    label: "Build",
    title: "Make it real.",
    description: "Design, technology and structure move an idea beyond imagination and into something people can experience.",
    accent: "#03CEA4",
    background: "#E7F4EF",
  },
  {
    number: "04",
    label: "Explore again",
    title: "There is always more to discover.",
    description: "Building rarely ends the journey. Sometimes what you create reveals the next question, the next possibility and somewhere new to explore.",
    accent: "#EAC435",
    background: "#F2E9C9",
  },
];

export default function ObserverShowcase() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stageEls = gsap.utils.toArray<HTMLElement>(".idea-stage", root);
    const background = root.querySelector<HTMLElement>("[data-background]");
    const visual = root.querySelector<HTMLElement>("[data-visual]");
    const dot = root.querySelector<HTMLElement>("[data-dot]");
    const ring = root.querySelector<HTMLElement>("[data-ring]");
    const lineH = root.querySelector<HTMLElement>("[data-line-h]");
    const lineV = root.querySelector<HTMLElement>("[data-line-v]");
    const box = root.querySelector<HTMLElement>("[data-box]");
    const orbit = root.querySelector<HTMLElement>("[data-orbit]");
    const core = root.querySelector<HTMLElement>("[data-core]");
    const loop = root.querySelector<HTMLElement>("[data-loop]");
    const header = root.querySelector<HTMLElement>("[data-header]");
    const footer = root.querySelector<HTMLElement>("[data-footer]");
    const canvas = root.querySelector<HTMLElement>("[data-canvas]");
    const progress = gsap.utils.toArray<HTMLElement>("[data-progress]", root);

    if (!stageEls.length || !visual || !background) return;

    let current = -1;
    let active = false;
    let animating = false;
    let leaving = false;
    let entering = false;
    let observer: ReturnType<typeof Observer.create> | null = null;
    let gestureLocked = false;
    let gestureTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollTween: gsap.core.Tween | null = null;

    /* INITIAL STATE */

    gsap.set(stageEls, { autoAlpha: 0 });
    gsap.set(dot, { scale: 0, autoAlpha: 0 });
    gsap.set(ring, { scale: 0.4, autoAlpha: 0 });
    gsap.set(lineH, { scaleX: 0, autoAlpha: 0 });
    gsap.set(lineV, { scaleY: 0, autoAlpha: 0 });
    gsap.set(box, { scale: 0.7, rotate: -12, autoAlpha: 0 });
    gsap.set(orbit, { scale: 0.7, rotate: -25, autoAlpha: 0 });
    gsap.set(core, { scale: 0, autoAlpha: 0 });
    gsap.set(loop, { scale: 0.7, autoAlpha: 0 });
    gsap.set(header, { autoAlpha: 0, y: -15 });
    gsap.set(footer, { autoAlpha: 0, y: 15 });
    gsap.set(canvas, { autoAlpha: 0, y: 35 });

    /* PROGRESS */

    const setProgress = (index: number) => {
      progress.forEach((item, i) => {
        gsap.to(item, {
          width: i === index ? 36 : 10,
          opacity: i === index ? 1 : 0.22,
          backgroundColor: i === index ? stages[index].accent : "#07111F",
          duration: 0.45,
          ease: "power3.out",
        });
      });
    };

    /* BACKGROUND */

    const animateBackground = (index: number) => {
      gsap.to(background, {
        backgroundColor: stages[index].background,
        duration: 0.9,
        ease: "power2.inOut",
      });
    };

    /* VISUAL */

    const animateVisual = (index: number) => {
      const accent = stages[index].accent;
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      if (index === 0) {
        tl.to([box, orbit, core, loop], { autoAlpha: 0, duration: 0.3 }, 0)
          .to(lineH, { scaleX: 0.65, autoAlpha: 0.16, duration: 0.7 }, 0)
          .to(lineV, { scaleY: 0.65, autoAlpha: 0.16, duration: 0.7 }, 0)
          .to(ring, { scale: 1, autoAlpha: 0.7, borderColor: accent, duration: 0.8 }, 0.05)
          .to(dot, { x: 0, y: 0, scale: 1, autoAlpha: 1, backgroundColor: accent, duration: 0.6 }, 0.2);
      }

      if (index === 1) {
        tl.to([box, loop], { autoAlpha: 0, duration: 0.3 }, 0)
          .to(ring, { scale: 1.15, autoAlpha: 0.7, borderColor: accent, duration: 0.75 }, 0)
          .to(orbit, { scale: 1, rotate: 14, autoAlpha: 0.4, borderColor: accent, duration: 0.85 }, 0)
          .to(dot, { x: 38, y: -28, scale: 0.75, backgroundColor: accent, duration: 0.7 }, 0.05)
          .to(core, { scale: 1, autoAlpha: 1, backgroundColor: "#EAC435", duration: 0.6 }, 0.15)
          .to(lineH, { scaleX: 0.95, autoAlpha: 0.1, duration: 0.65 }, 0)
          .to(lineV, { scaleY: 0.95, autoAlpha: 0.1, duration: 0.65 }, 0);
      }

      if (index === 2) {
        tl.to(loop, { autoAlpha: 0, duration: 0.25 }, 0)
          .to(orbit, { scale: 0.75, rotate: 0, autoAlpha: 0.18, borderColor: accent, duration: 0.7 }, 0)
          .to(ring, { scale: 0.62, autoAlpha: 0.45, borderColor: accent, duration: 0.7 }, 0)
          .to(box, { scale: 1, rotate: 0, autoAlpha: 0.75, borderColor: accent, duration: 0.8 }, 0.05)
          .to(dot, { x: 0, y: 0, scale: 0.55, backgroundColor: accent, duration: 0.6 }, 0)
          .to(core, { scale: 0.6, autoAlpha: 0.8, backgroundColor: "#EAC435", duration: 0.6 }, 0)
          .to(lineH, { scaleX: 1, autoAlpha: 0.1, duration: 0.65 }, 0)
          .to(lineV, { scaleY: 1, autoAlpha: 0.1, duration: 0.65 }, 0);
      }

      if (index === 3) {
        tl.to([lineH, lineV], { autoAlpha: 0.05, duration: 0.4 }, 0)
          .to(box, { scale: 0.78, rotate: 10, autoAlpha: 0.15, borderColor: accent, duration: 0.7 }, 0)
          .to(ring, { scale: 0.48, autoAlpha: 0.25, borderColor: accent, duration: 0.7 }, 0)
          .to(orbit, { scale: 0.9, rotate: 40, autoAlpha: 0.18, borderColor: "#03CEA4", duration: 0.75 }, 0)
          .to(loop, { scale: 1, rotate: 0, autoAlpha: 0.7, borderColor: accent, duration: 0.9 }, 0.1)
          .to(dot, { x: 0, y: -72, scale: 0.6, backgroundColor: accent, duration: 0.75 }, 0.1)
          .to(core, { scale: 0.45, autoAlpha: 0.65, backgroundColor: "#03CEA4", duration: 0.65 }, 0.1);
      }
    };

    /* UNIQUE TEXT ANIMATIONS */

    const animateExplore = (stage: HTMLElement, direction: 1 | -1, tl: gsap.core.Timeline) => {
      const kicker = stage.querySelector("[data-kicker]");
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", stage);
      const description = stage.querySelector("[data-description]");

      tl.fromTo(kicker, { x: -24 * direction, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" }, 0.08);

      words.forEach((word, i) => {
        tl.fromTo(
          word,
          {
            x: i % 2 === 0 ? -35 * direction : 35 * direction,
            y: i % 2 === 0 ? 15 : -15,
            rotate: i % 2 === 0 ? -3 : 3,
            autoAlpha: 0,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power4.out",
          },
          0.12 + i * 0.08,
        );
      });

      tl.fromTo(description, { y: 15 * direction, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }, 0.42);
    };

    const animateCreate = (stage: HTMLElement, direction: 1 | -1, tl: gsap.core.Timeline) => {
      const kicker = stage.querySelector("[data-kicker]");
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", stage);
      const description = stage.querySelector("[data-description]");

      tl.fromTo(kicker, { scaleX: 0, autoAlpha: 0, transformOrigin: "left center" }, { scaleX: 1, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.05);

      words.forEach((word, i) => {
        tl.fromTo(
          word,
          {
            x: i === 0 ? -70 : 70,
            rotate: i === 0 ? -7 : 7,
            scale: 0.9,
            autoAlpha: 0,
          },
          {
            x: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: "back.out(1.15)",
          },
          0.12 + i * 0.1,
        );
      });

      tl.fromTo(description, { x: 28 * direction, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }, 0.45);
    };

    const animateBuild = (stage: HTMLElement, direction: 1 | -1, tl: gsap.core.Timeline) => {
      const kicker = stage.querySelector("[data-kicker]");
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", stage);
      const description = stage.querySelector("[data-description]");

      tl.fromTo(kicker, { y: -12 * direction, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, 0.05);

      words.forEach((word, i) => {
        tl.fromTo(
          word,
          {
            yPercent: 115 * direction,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: "power4.out",
          },
          0.12 + i * 0.08,
        );
      });

      tl.fromTo(description, { scaleY: 0.85, y: 18, autoAlpha: 0 }, { scaleY: 1, y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", transformOrigin: "top" }, 0.42);
    };

    const animateExploreAgain = (stage: HTMLElement, direction: 1 | -1, tl: gsap.core.Timeline) => {
      const kicker = stage.querySelector("[data-kicker]");
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", stage);
      const description = stage.querySelector("[data-description]");

      tl.fromTo(kicker, { autoAlpha: 0, letterSpacing: "0.45em" }, { autoAlpha: 1, letterSpacing: "0.24em", duration: 0.65, ease: "power3.out" }, 0.05);

      words.forEach((word, i) => {
        tl.fromTo(
          word,
          {
            x: (i - (words.length - 1) / 2) * 55 * direction,
            scale: 0.88,
            autoAlpha: 0,
          },
          {
            x: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.85,
            ease: "expo.out",
          },
          0.1 + i * 0.07,
        );
      });

      tl.fromTo(description, { y: 20 * direction, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" }, 0.5);
    };

    const goTo = (index: number, direction: 1 | -1) => {
      if (animating || leaving || index < 0 || index >= stageEls.length) return;

      animating = true;

      const incoming = stageEls[index];
      const outgoing = current >= 0 ? stageEls[current] : null;

      const tl = gsap.timeline({
        onComplete: () => {
          stageEls.forEach((stage, i) => {
            if (i !== index) gsap.set(stage, { autoAlpha: 0 });
          });

          animating = false;
        },
      });

      if (outgoing) {
        const outgoingWords = gsap.utils.toArray<HTMLElement>("[data-word]", outgoing);
        const outgoingDescription = outgoing.querySelector("[data-description]");
        const outgoingKicker = outgoing.querySelector("[data-kicker]");

        tl.to(outgoingWords, {
          y: -18 * direction,
          autoAlpha: 0,
          duration: 0.28,
          stagger: 0.025,
          ease: "power2.in",
        }, 0);

        tl.to([outgoingDescription, outgoingKicker], {
          y: -10 * direction,
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
        }, 0);
      }

      tl.set(incoming, { autoAlpha: 1 }, outgoing ? 0.22 : 0);

      if (index === 0) animateExplore(incoming, direction, tl);
      if (index === 1) animateCreate(incoming, direction, tl);
      if (index === 2) animateBuild(incoming, direction, tl);
      if (index === 3) animateExploreAgain(incoming, direction, tl);

      animateBackground(index);
      animateVisual(index);
      setProgress(index);

      current = index;
    };

    /* ENTER FROM HERO OR BELOW */

    const enterShowcase = (from: "top" | "bottom") => {
      if (entering || active || leaving) return;

      entering = true;
      observer?.disable();

      const startY = window.scrollY;
      const targetY = root.offsetTop;
      const scrollState = { y: startY };

      scrollTween?.kill();

      scrollTween = gsap.to(scrollState, {
        y: targetY,
        duration: 0.85,
        ease: "power3.inOut",
        onUpdate: () => window.scrollTo(0, scrollState.y),
        onComplete: () => {
          active = true;
          entering = false;

          gsap.timeline({
            onComplete: () => observer?.enable(),
          })
            .to(header, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0)
            .to(canvas, { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" }, 0)
            .to(footer, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.08)
            .call(() => {
              if (from === "top") {
                if (current === -1) goTo(0, 1);
                else goTo(current, 1);
              } else {
                if (current === -1) goTo(stages.length - 1, -1);
                else goTo(current, -1);
              }
            }, undefined, 0.08);
        },
      });
    };

    /* LEAVE DOWN */

    const leaveDown = () => {
      if (leaving || animating || entering) return;

      const next = root.nextElementSibling as HTMLElement | null;
      if (!next) return;

      leaving = true;
      active = false;
      observer?.disable();

      const scrollState = { y: window.scrollY };

      gsap.timeline()
        .to([header, footer], { autoAlpha: 0, duration: 0.25 }, 0)
        .to(canvas, { y: -25, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 0)
        .to(scrollState, {
          y: next.offsetTop,
          duration: 0.9,
          ease: "power3.inOut",
          onUpdate: () => window.scrollTo(0, scrollState.y),
          onComplete: () => {
            leaving = false;
            gsap.set(canvas, { y: 35 });
            gsap.set(header, { y: -15 });
            gsap.set(footer, { y: 15 });
          },
        }, 0.12);
    };

    /* LEAVE UP TO HERO */

    const leaveUp = () => {
      if (leaving || animating || entering) return;

      const previous = root.previousElementSibling as HTMLElement | null;
      if (!previous) return;

      leaving = true;
      active = false;
      observer?.disable();

      const scrollState = { y: window.scrollY };

      gsap.timeline()
        .to([header, footer], { autoAlpha: 0, duration: 0.25 }, 0)
        .to(canvas, { y: 25, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 0)
        .to(scrollState, {
          y: previous.offsetTop,
          duration: 0.9,
          ease: "power3.inOut",
          onUpdate: () => window.scrollTo(0, scrollState.y),
          onComplete: () => {
            leaving = false;
            gsap.set(canvas, { y: 35 });
            gsap.set(header, { y: -15 });
            gsap.set(footer, { y: 15 });
          },
        }, 0.12);
    };

    /* GESTURE */

    const handleDirection = (direction: 1 | -1) => {
      if (!active || animating || leaving || entering || gestureLocked) return;

      gestureLocked = true;

      if (gestureTimer) clearTimeout(gestureTimer);

      gestureTimer = setTimeout(() => {
        gestureLocked = false;
      }, 720);

      if (direction === 1) {
        if (current >= stages.length - 1) leaveDown();
        else goTo(current + 1, 1);
      } else {
        if (current <= 0) leaveUp();
        else goTo(current - 1, -1);
      }
    };

    observer = Observer.create({
      target: root,
      type: "wheel,touch,pointer",
      preventDefault: true,
      tolerance: 25,
      wheelSpeed: -1,
      onDown: () => handleDirection(-1),
      onUp: () => handleDirection(1),
    });

    observer.disable();

    /* DETECT ENTRY DIRECTION */

    let lastScrollY = window.scrollY;

    const intersection = new IntersectionObserver(
      ([entry]) => {
        if (!entry || leaving || entering || active) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          const scrollingDown = window.scrollY >= lastScrollY;

          enterShowcase(scrollingDown ? "top" : "bottom");
        }

        lastScrollY = window.scrollY;
      },
      {
        threshold: [0, 0.2, 0.35, 0.55, 0.75, 1],
      },
    );

    intersection.observe(root);

    return () => {
      if (gestureTimer) clearTimeout(gestureTimer);
      scrollTween?.kill();
      observer?.kill();
      intersection.disconnect();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden text-[#07111F]">

      {/* CHANGING BRIGHT BACKGROUND */}
      <div data-background className="absolute inset-0 bg-[#F3EFE5]" />

      {/* PAPER / DESIGN GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(7,17,31,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(7,17,31,.2)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* SUBTLE PAPER GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_center,#07111F_0.55px,transparent_0.7px)] [background-size:6px_6px]" />

      {/* DECORATIVE COLOR WASH */}
      <div className="pointer-events-none absolute -left-44 top-1/3 size-[28rem] rounded-full bg-[#EAC435]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-44 bottom-1/4 size-[28rem] rounded-full bg-[#03CEA4]/10 blur-[150px]" />

      {/* HEADER */}
      <header data-header className="absolute left-5 right-5 top-6 z-30 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8 md:left-12 md:right-12 lg:left-16 lg:right-16">
        <p className="text-[9px] font-bold uppercase tracking-[.24em] text-[#07111F]/70 sm:text-[10px]">The Creative Explorer</p>
        <p className="text-[9px] font-medium uppercase tracking-[.18em] text-[#07111F]/35">An idea takes shape</p>
      </header>

      {/* CANVAS */}
      <div data-canvas className="relative mx-auto h-full w-full max-w-[1400px] px-5 sm:px-8 md:px-12 lg:px-16">

        {/* TEXT */}
        <div className="absolute inset-x-5 bottom-[12%] top-[12%] sm:inset-x-8 md:inset-x-12 lg:inset-x-16">

          {stages.map((stage, index) => (
            <article key={stage.title} className="idea-stage invisible absolute inset-0 flex items-end pb-16 sm:items-center sm:pb-0">

              <div className="relative z-20 max-w-[760px]">

                <p data-kicker className="inline-block text-[9px] font-bold uppercase tracking-[.24em] sm:text-[10px]" style={{ color: stage.accent }}>
                  {stage.number} / {stage.label}
                </p>

                <h2 className="mt-4 max-w-[760px] overflow-hidden font-abril text-[clamp(3rem,10vw,4.8rem)] font-black leading-[.94] tracking-[-.04em] sm:mt-5 sm:text-[clamp(4rem,8vw,5.8rem)] lg:text-[clamp(4.4rem,5.8vw,6.3rem)]">
                  {stage.title.split(" ").map((word, wordIndex) => (
                    <span key={`${stage.title}-${wordIndex}`} className="mr-[0.18em] inline-block overflow-hidden align-top">
                      <span data-word className="inline-block">
                        {word}
                      </span>
                    </span>
                  ))}
                </h2>

                <p data-description className="mt-6 max-w-[570px] text-[14px] font-medium leading-7 text-[#33404D] sm:mt-7 sm:text-[15px] md:text-base md:leading-8">
                  {stage.description}
                </p>

              </div>

            </article>
          ))}

        </div>

        {/* EVOLVING IDEA */}
        <div data-visual className="pointer-events-none absolute right-[-65px] top-[15%] size-[280px] sm:right-[2%] sm:top-1/2 sm:size-[340px] sm:-translate-y-1/2 md:right-[5%] md:size-[400px] lg:right-[7%] lg:size-[470px]">

          <span data-line-h className="absolute left-1/2 top-1/2 h-px w-[82%] origin-center -translate-x-1/2 bg-[#07111F]" />

          <span data-line-v className="absolute left-1/2 top-1/2 h-[82%] w-px origin-center -translate-x-1/2 -translate-y-1/2 bg-[#07111F]" />

          <span data-loop className="absolute left-1/2 top-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#07111F]" />

          <span data-orbit className="absolute left-1/2 top-1/2 h-[42%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#07111F]" />

          <span data-box className="absolute left-1/2 top-1/2 size-[45%] -translate-x-1/2 -translate-y-1/2 border border-[#07111F]" />

          <span data-ring className="absolute left-1/2 top-1/2 size-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#07111F]" />

          <span data-core className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-5" />

          <span data-dot className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_28px_rgba(234,196,53,.25)] sm:size-3.5" />

        </div>

      </div>

      {/* FOOTER */}
      <footer data-footer className="absolute bottom-6 left-5 right-5 z-30 sm:bottom-8 sm:left-8 sm:right-8 md:left-12 md:right-12 lg:left-16 lg:right-16">

        <div className="mx-auto flex max-w-[1400px] items-end justify-between">

          <div className="flex items-center gap-1.5">
            {stages.map((stage, index) => (
              <span key={stage.label} data-progress className="block h-[2px] bg-[#07111F]" style={{ width: index === 0 ? 36 : 10, opacity: index === 0 ? 1 : 0.22 }} />
            ))}
          </div>

          <div className="text-right">
            <p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#07111F]/40 sm:text-[9px]">Scroll to explore</p>
            <span className="mt-2 block text-sm leading-none text-[#07111F]">↓</span>
          </div>

        </div>

      </footer>

    </section>
  );
}