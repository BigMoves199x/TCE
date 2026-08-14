"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Observer, SplitText);

const slides = [
  {
    eyebrow: "The Creative Explorer",
    title: "Precision in Every Detail.",
    description:
      "We build thoughtful brands, digital experiences and creative products with intention.",
    accent: "#03CEA4",
    background:
      "linear-gradient(135deg, #07111f 0%, #0a2a28 50%, #07111f 100%)",
  },
  {
    eyebrow: "Creative Direction",
    title: "Creativity Without Compromise.",
    description:
      "Every visual decision is shaped to feel distinctive, memorable and true to your brand.",
    accent: "#EAC435",
    background:
      "linear-gradient(135deg, #07111f 0%, #30290d 50%, #07111f 100%)",
  },
  {
    eyebrow: "Technology",
    title: "Built to Perform Beautifully.",
    description:
      "From websites to business systems, we combine strong design with dependable technology.",
    accent: "#FB4D3D",
    background:
      "linear-gradient(135deg, #07111f 0%, #351612 50%, #07111f 100%)",
  },
  {
    eyebrow: "TCE Products",
    title: "Ideas Made Tangible.",
    description:
      "Original artwork, customized fashion and creative tools designed to inspire exploration.",
    accent: "#03CEA4",
    background:
      "linear-gradient(135deg, #07111f 0%, #14263a 50%, #07111f 100%)",
  },
];

export default function ObserverShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const sectionElements =
      gsap.utils.toArray<HTMLElement>(".observer-slide", root);

    const backgrounds =
      gsap.utils.toArray<HTMLElement>(".observer-bg", root);

    const outerWrappers =
      gsap.utils.toArray<HTMLElement>(".observer-outer", root);

    const innerWrappers =
      gsap.utils.toArray<HTMLElement>(".observer-inner", root);

    const headings =
      gsap.utils.toArray<HTMLElement>(".observer-heading", root);

    if (
      !sectionElements.length ||
      sectionElements.length !== backgrounds.length ||
      sectionElements.length !== outerWrappers.length ||
      sectionElements.length !== innerWrappers.length ||
      sectionElements.length !== headings.length
    ) {
      return;
    }

    const splitHeadings = headings.map(
      (heading) =>
        new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "observer-line",
          mask: "lines",
        }),
    );

    let currentIndex = -1;
    let animating = false;

    const wrap = gsap.utils.wrap(0, sectionElements.length);

    gsap.set(sectionElements, {
      autoAlpha: 0,
    });

    gsap.set(outerWrappers, {
      yPercent: 100,
    });

    gsap.set(innerWrappers, {
      yPercent: -100,
    });

    function goToSection(index: number, direction: number) {
      index = wrap(index);
      animating = true;

      const fromTop = direction === -1;
      const directionFactor = fromTop ? -1 : 1;

      const timeline = gsap.timeline({
        defaults: {
          duration: 1.1,
          ease: "power2.inOut",
        },
        onComplete: () => {
          animating = false;
        },
      });

      if (currentIndex >= 0) {
        gsap.set(sectionElements[currentIndex], {
          zIndex: 0,
        });

        timeline
          .to(
            backgrounds[currentIndex],
            {
              yPercent: -12 * directionFactor,
            },
            0,
          )
          .to(
            sectionElements[currentIndex],
            {
              autoAlpha: 0,
              duration: 0.45,
            },
            0.55,
          );
      }

      gsap.set(sectionElements[index], {
        autoAlpha: 1,
        zIndex: 1,
      });

      timeline
        .fromTo(
          [
            outerWrappers[index],
            innerWrappers[index],
          ],
          {
            yPercent: (itemIndex: number) =>
              itemIndex
                ? -100 * directionFactor
                : 100 * directionFactor,
          },
          {
            yPercent: 0,
          },
          0,
        )
        .fromTo(
          backgrounds[index],
          {
            yPercent: 12 * directionFactor,
            scale: 1.08,
          },
          {
            yPercent: 0,
            scale: 1,
          },
          0,
        )
        .fromTo(
          splitHeadings[index].chars,
          {
            autoAlpha: 0,
            yPercent: 140 * directionFactor,
            rotateX: 35 * directionFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: {
              each: 0.018,
              from: "random",
            },
          },
          0.2,
        )
        .fromTo(
          sectionElements[index].querySelectorAll(
            "[data-observer-reveal]",
          ),
          {
            y: 25 * directionFactor,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
          },
          0.45,
        );

      currentIndex = index;
    }

    const observer = Observer.create({
      target: root,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,

      onDown: () => {
        if (!animating) {
          goToSection(currentIndex - 1, -1);
        }
      },

      onUp: () => {
        if (!animating) {
          goToSection(currentIndex + 1, 1);
        }
      },
    });

    goToSection(0, 1);

    return () => {
      observer.kill();

      splitHeadings.forEach((split) => {
        split.revert();
      });

      gsap.killTweensOf([
        sectionElements,
        backgrounds,
        outerWrappers,
        innerWrappers,
      ]);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-[#07111f]"
      aria-label="TCE brand showcase"
    >
      {slides.map((slide, index) => (
        <section
          key={slide.title}
          className="observer-slide invisible absolute inset-0"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
        >
          <div className="observer-outer absolute inset-0 overflow-hidden">
            <div className="observer-inner absolute inset-0 overflow-hidden">
              <div
                className="observer-bg absolute inset-0"
                style={{
                  background: slide.background,
                }}
              />

              <div className="absolute" />

              <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
                <div className="max-w-5xl">
                  <div
                    data-observer-reveal
                    className="flex items-center gap-3"
                  >
                    <span
                      className="h-px w-12"
                      style={{
                        backgroundColor: slide.accent,
                      }}
                    />

                    <p
                      className="text-xs font-semibold uppercase tracking-[0.28em]"
                      style={{
                        color: slide.accent,
                      }}
                    >
                      {slide.eyebrow}
                    </p>
                  </div>

                  <h2 className="observer-heading font-abril mt-7 text-[clamp(3.8rem,8vw,9rem)] leading-[0.88] tracking-[-0.045em] text-white">
                    {slide.title}
                  </h2>

                  <p
                    data-observer-reveal
                    className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg"
                  >
                    {slide.description}
                  </p>

                  <div
                    data-observer-reveal
                    className="mt-10 flex items-center gap-5"
                  >
                    <span className="text-sm text-white/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="h-px w-24 bg-white/15">
                      <div
                        className="h-full"
                        style={{
                          width: `${
                            ((index + 1) / slides.length) * 100
                          }%`,
                          backgroundColor: slide.accent,
                        }}
                      />
                    </div>

                    <span className="text-sm text-white/25">
                      {String(slides.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              <p className="absolute bottom-8 right-8 z-20 hidden text-xs uppercase tracking-[0.22em] text-white/30 md:block">
                Scroll or swipe
              </p>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}