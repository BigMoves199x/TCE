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
    description:
      "Before an idea becomes something, there is curiosity — a question, a possibility, something worth following.",
    accent: "#EAC435",
  },
  {
    number: "02",
    label: "Create",
    title: "Give it form.",
    description:
      "Creativity gives possibility a language — something we can begin to see, feel and understand.",
    accent: "#FB4D3D",
  },
  {
    number: "03",
    label: "Build",
    title: "Make it real.",
    description:
      "Design, technology and structure move an idea beyond imagination and into something people can experience.",
    accent: "#03CEA4",
  },
  {
    number: "04",
    label: "Explore again",
    title: "There is always more to discover.",
    description:
      "Building rarely ends the journey. Sometimes what you create reveals the next question, the next possibility and somewhere new to explore.",
    accent: "#EAC435",
  },
];

export default function ObserverShowcase() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stageEls = gsap.utils.toArray<HTMLElement>(".idea-stage", root);
    const visual = root.querySelector<HTMLElement>("[data-visual]");
    const dot = root.querySelector<HTMLElement>("[data-dot]");
    const ring = root.querySelector<HTMLElement>("[data-ring]");
    const lineH = root.querySelector<HTMLElement>("[data-line-h]");
    const lineV = root.querySelector<HTMLElement>("[data-line-v]");
    const box = root.querySelector<HTMLElement>("[data-box]");
    const orbit = root.querySelector<HTMLElement>("[data-orbit]");
    const core = root.querySelector<HTMLElement>("[data-core]");
    const loop = root.querySelector<HTMLElement>("[data-loop]");
    const progress = gsap.utils.toArray<HTMLElement>("[data-progress]", root);

    if (!stageEls.length || !visual) return;

    let current = -1;
    let animating = false;
    let leaving = false;
    let active = false;
    let observer: ReturnType<typeof Observer.create> | null = null;
    let gestureLocked = false;
    let gestureTimer: ReturnType<typeof setTimeout> | null = null;

    gsap.set(stageEls, { autoAlpha: 0, y: 16 });
    gsap.set(dot, { scale: 0, autoAlpha: 0 });
    gsap.set(ring, { scale: 0.45, autoAlpha: 0 });
    gsap.set(lineH, { scaleX: 0, autoAlpha: 0 });
    gsap.set(lineV, { scaleY: 0, autoAlpha: 0 });
    gsap.set(box, { scale: 0.78, autoAlpha: 0 });
    gsap.set(orbit, { scale: 0.7, rotate: -18, autoAlpha: 0 });
    gsap.set(core, { scale: 0, autoAlpha: 0 });
    gsap.set(loop, { scale: 0.8, rotate: -20, autoAlpha: 0 });

    const setProgress = (index: number) => {
      progress.forEach((item, i) => {
        gsap.to(item, {
          width: i === index ? 32 : 10,
          opacity: i === index ? 1 : 0.22,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    const animateVisual = (index: number) => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (index === 0) {
        tl.to([box, orbit, core, loop], {
          autoAlpha: 0,
          duration: 0.3,
        })
          .to(
            lineH,
            {
              scaleX: 0.65,
              autoAlpha: 0.28,
              duration: 0.65,
            },
            0,
          )
          .to(
            lineV,
            {
              scaleY: 0.65,
              autoAlpha: 0.28,
              duration: 0.65,
            },
            0,
          )
          .to(
            ring,
            {
              scale: 1,
              autoAlpha: 1,
              borderColor: "#EAC435",
              duration: 0.7,
            },
            0.1,
          )
          .to(
            dot,
            {
              scale: 1,
              autoAlpha: 1,
              backgroundColor: "#EAC435",
              duration: 0.5,
            },
            0.22,
          );
      }

      if (index === 1) {
        tl.to([box, loop], {
          autoAlpha: 0,
          duration: 0.3,
        })
          .to(
            ring,
            {
              scale: 1.15,
              borderColor: "#FB4D3D",
              autoAlpha: 0.85,
              duration: 0.7,
            },
            0,
          )
          .to(
            orbit,
            {
              scale: 1,
              rotate: 14,
              autoAlpha: 0.55,
              borderColor: "#FB4D3D",
              duration: 0.8,
            },
            0.05,
          )
          .to(
            dot,
            {
              x: 36,
              y: -26,
              scale: 0.75,
              backgroundColor: "#FB4D3D",
              duration: 0.65,
            },
            0.08,
          )
          .to(
            core,
            {
              scale: 1,
              autoAlpha: 1,
              backgroundColor: "#EAC435",
              duration: 0.55,
            },
            0.18,
          )
          .to(
            lineH,
            {
              scaleX: 0.95,
              autoAlpha: 0.18,
              duration: 0.6,
            },
            0,
          )
          .to(
            lineV,
            {
              scaleY: 0.95,
              autoAlpha: 0.18,
              duration: 0.6,
            },
            0,
          );
      }

      if (index === 2) {
        tl.to(loop, {
          autoAlpha: 0,
          duration: 0.25,
        })
          .to(
            orbit,
            {
              scale: 0.75,
              rotate: 0,
              autoAlpha: 0.22,
              borderColor: "#03CEA4",
              duration: 0.65,
            },
            0,
          )
          .to(
            ring,
            {
              scale: 0.62,
              autoAlpha: 0.5,
              borderColor: "#03CEA4",
              duration: 0.65,
            },
            0,
          )
          .to(
            box,
            {
              scale: 1,
              autoAlpha: 1,
              borderColor: "#03CEA4",
              duration: 0.75,
            },
            0.08,
          )
          .to(
            dot,
            {
              x: 0,
              y: 0,
              scale: 0.55,
              backgroundColor: "#03CEA4",
              duration: 0.55,
            },
            0,
          )
          .to(
            core,
            {
              scale: 0.6,
              autoAlpha: 0.8,
              backgroundColor: "#EAC435",
              duration: 0.55,
            },
            0,
          )
          .to(
            lineH,
            {
              scaleX: 1,
              autoAlpha: 0.12,
              duration: 0.6,
            },
            0,
          )
          .to(
            lineV,
            {
              scaleY: 1,
              autoAlpha: 0.12,
              duration: 0.6,
            },
            0,
          );
      }

      if (index === 3) {
        tl.to([lineH, lineV], {
          autoAlpha: 0.06,
          duration: 0.4,
        })
          .to(
            box,
            {
              scale: 0.78,
              autoAlpha: 0.18,
              borderColor: "#EAC435",
              duration: 0.65,
            },
            0,
          )
          .to(
            ring,
            {
              scale: 0.48,
              autoAlpha: 0.28,
              borderColor: "#EAC435",
              duration: 0.65,
            },
            0,
          )
          .to(
            orbit,
            {
              scale: 0.9,
              rotate: 40,
              autoAlpha: 0.22,
              borderColor: "#03CEA4",
              duration: 0.7,
            },
            0,
          )
          .to(
            loop,
            {
              scale: 1,
              rotate: 0,
              autoAlpha: 1,
              borderColor: "#EAC435",
              duration: 0.85,
            },
            0.12,
          )
          .to(
            dot,
            {
              x: 0,
              y: -72,
              scale: 0.6,
              backgroundColor: "#EAC435",
              duration: 0.7,
            },
            0.12,
          )
          .to(
            core,
            {
              scale: 0.45,
              autoAlpha: 0.65,
              backgroundColor: "#03CEA4",
              duration: 0.6,
            },
            0.12,
          );
      }

      return tl;
    };

    const goTo = (index: number, direction: 1 | -1) => {
      if (
        animating ||
        leaving ||
        index < 0 ||
        index >= stageEls.length
      ) {
        return;
      }

      animating = true;

      const incoming = stageEls[index];
      const factor = direction === 1 ? 1 : -1;

      const incomingKicker =
        incoming.querySelector<HTMLElement>("[data-kicker]");

      const incomingTitle =
        incoming.querySelector<HTMLElement>("[data-title]");

      const incomingDescription =
        incoming.querySelector<HTMLElement>("[data-description]");

      const tl = gsap.timeline({
        onComplete: () => {
          stageEls.forEach((stage, i) => {
            if (i !== index) {
              gsap.set(stage, {
                autoAlpha: 0,
                y: 16,
              });
            }
          });

          animating = false;
        },
      });

      if (current >= 0) {
        const outgoing = stageEls[current];

        tl.to(
          outgoing,
          {
            y: -14 * factor,
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          0,
        );
      }

      tl.set(incoming, {
        autoAlpha: 1,
        y: 0,
      });

      if (incomingKicker) {
        tl.fromTo(
          incomingKicker,
          {
            y: 10 * factor,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          0.3,
        );
      }

      if (incomingTitle) {
        tl.fromTo(
          incomingTitle,
          {
            y: 24 * factor,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power4.out",
          },
          0.34,
        );
      }

      if (incomingDescription) {
        tl.fromTo(
          incomingDescription,
          {
            y: 12 * factor,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          0.48,
        );
      }

      animateVisual(index);
      setProgress(index);

      current = index;
    };

    const leaveDown = () => {
      if (leaving || animating) return;

      const next =
        root.nextElementSibling as HTMLElement | null;

      if (!next) return;

      leaving = true;
      active = false;

      observer?.disable();

      next.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.setTimeout(() => {
        leaving = false;
      }, 900);
    };

    const leaveUp = () => {
      if (leaving || animating) return;

      leaving = true;
      active = false;

      observer?.disable();

      const previous =
        root.previousElementSibling as HTMLElement | null;

      if (previous) {
        previous.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: Math.max(
            0,
            root.offsetTop - window.innerHeight,
          ),
          behavior: "smooth",
        });
      }

      window.setTimeout(() => {
        leaving = false;
      }, 900);
    };

    const handleDirection = (
      direction: 1 | -1,
    ) => {
      if (
        !active ||
        leaving ||
        animating ||
        gestureLocked
      ) {
        return;
      }

      gestureLocked = true;

      if (gestureTimer) {
        clearTimeout(gestureTimer);
      }

      gestureTimer = setTimeout(() => {
        gestureLocked = false;
      }, 700);

      if (direction === 1) {
        if (current >= stageEls.length - 1) {
          leaveDown();
        } else {
          goTo(current + 1, 1);
        }
      } else {
        if (current <= 0) {
          leaveUp();
        } else {
          goTo(current - 1, -1);
        }
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

    const activateShowcase = () => {
      if (leaving || active) return;

      active = true;

      window.scrollTo({
        top: root.offsetTop,
        behavior: "auto",
      });

      observer?.enable();
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        if (!entry || leaving) return;

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.25
        ) {
          activateShowcase();
        }

        if (!entry.isIntersecting) {
          active = false;
          observer?.disable();
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    intersection.observe(root);

    goTo(0, 1);

    return () => {
      if (gestureTimer) {
        clearTimeout(gestureTimer);
      }

      observer?.kill();
      intersection.disconnect();

      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#07111F] text-white"
    >

      {/* VERY SUBTLE BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(circle_at_center,white_0.7px,transparent_0.8px)] [background-size:7px_7px]" />


      {/* HEADER */}
      <header className="absolute left-5 right-5 top-6 z-30 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8 md:left-12 md:right-12 lg:left-16 lg:right-16">
        <p className="text-[9px] font-bold uppercase tracking-[.24em] text-white/70 sm:text-[10px]">
          The Creative Explorer
        </p>

        <p className="text-[9px] font-medium uppercase tracking-[.18em] text-white/30">
          An idea takes shape
        </p>
      </header>


      {/* MAIN CANVAS */}
      <div className="relative mx-auto h-full w-full max-w-[1400px] px-5 sm:px-8 md:px-12 lg:px-16">

        {/* TEXT STAGES */}
        <div className="absolute inset-x-5 bottom-[12%] top-[12%] sm:inset-x-8 md:inset-x-12 lg:inset-x-16">

          {stages.map((stage, index) => (
            <article
              key={stage.title}
              className="idea-stage invisible absolute inset-0 flex items-end pb-16 sm:items-center sm:pb-0"
            >
              <div className="relative z-20 max-w-[720px]">

                <p
                  data-kicker
                  className="text-[9px] font-bold uppercase tracking-[.24em] sm:text-[10px]"
                  style={{
                    color: stage.accent,
                  }}
                >
                  {stage.number} / {stage.label}
                </p>

                <h2
                  data-title
                  className="mt-4 max-w-[700px] font-abril text-[clamp(3.1rem,11vw,4.8rem)] font-black leading-[.94] tracking-[-.04em] sm:mt-5 sm:text-[clamp(4rem,8vw,5.8rem)] lg:text-[clamp(4.5rem,6vw,6.4rem)]"
                >
                  {stage.title}
                </h2>

                <p
                  data-description
                  className="mt-6 max-w-[560px] text-[14px] font-medium leading-7 text-[#A8B1BD] sm:mt-7 sm:text-[15px] md:text-base md:leading-8"
                >
                  {stage.description}
                </p>

              </div>
            </article>
          ))}

        </div>


        {/* EVOLVING IDEA */}
        <div
          data-visual
          className="pointer-events-none absolute right-[-60px] top-[16%] size-[280px] sm:right-[2%] sm:top-1/2 sm:size-[340px] sm:-translate-y-1/2 md:right-[5%] md:size-[400px] lg:right-[7%] lg:size-[470px]"
        >

          {/* HORIZONTAL AXIS */}
          <span
            data-line-h
            className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 bg-white origin-center"
          />

          {/* VERTICAL AXIS */}
          <span
            data-line-v
            className="absolute left-1/2 top-1/2 h-[82%] w-px -translate-x-1/2 -translate-y-1/2 bg-white origin-center"
          />

          {/* OUTER LOOP */}
          <span
            data-loop
            className="absolute left-1/2 top-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          />

          {/* ORBIT */}
          <span
            data-orbit
            className="absolute left-1/2 top-1/2 h-[42%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
          />

          {/* STRUCTURE */}
          <span
            data-box
            className="absolute left-1/2 top-1/2 size-[45%] -translate-x-1/2 -translate-y-1/2 border"
          />

          {/* RING */}
          <span
            data-ring
            className="absolute left-1/2 top-1/2 size-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          />

          {/* CORE */}
          <span
            data-core
            className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-5"
          />

          {/* MOVING IDEA */}
          <span
            data-dot
            className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_28px_rgba(234,196,53,.35)] sm:size-3.5"
          />

        </div>

      </div>


      {/* FOOTER */}
      <footer className="absolute bottom-6 left-5 right-5 z-30 sm:bottom-8 sm:left-8 sm:right-8 md:left-12 md:right-12 lg:left-16 lg:right-16">

        <div className="mx-auto flex max-w-[1400px] items-end justify-between">

          {/* PROGRESS */}
          <div className="flex items-center gap-1.5">
            {stages.map((stage, index) => (
              <span
                key={stage.label}
                data-progress
                className="block h-px bg-white"
                style={{
                  width: index === 0 ? 32 : 10,
                  opacity: index === 0 ? 1 : 0.22,
                }}
              />
            ))}
          </div>


          {/* SCROLL */}
          <div className="text-right">
            <p className="text-[8px] font-bold uppercase tracking-[.2em] text-white/45 sm:text-[9px]">
              Scroll to explore
            </p>

            <span className="mt-2 block text-sm leading-none text-[#EAC435]">
              ↓
            </span>
          </div>

        </div>

      </footer>

    </section>
  );
}