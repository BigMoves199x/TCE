"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Observer, SplitText);

/*
|--------------------------------------------------------------------------
| TCE SHOWCASE CONTENT
|--------------------------------------------------------------------------
|
| Each slide uses one SOLID TCE color.
|
| No gradients.
| No glass cards.
| No excessive decoration.
|
*/

const slides = [
  {
    kicker: "Ideas need more than imagination.",
    title: "Ideas deserve direction.",
    description:
      "We give ambitious ideas the clarity, creativity and structure they need to become something real.",

    // switched from navy to TCE red
    background: "#FB4D3D",
    foreground: "#FFFFFF",
    muted: "rgba(255,255,255,0.68)",
    accent: "#EAC435",
    ghost: "rgba(255,255,255,0.055)",
  },

  {
    kicker: "Distinctive by intention.",
    title: "Creativity with consequence.",
    description:
      "We don't create simply to make things look good. We create identities, experiences and stories designed to be remembered.",

    background: "#EAC435",
    foreground: "#07111f",
    muted: "rgba(7,17,31,0.62)",
    accent: "#07111f",
    ghost: "rgba(7,17,31,0.055)",
  },

  {
    kicker: "Beauty should perform.",
    title: "Built to move ideas forward.",
    description:
      "Technology becomes meaningful when it solves a real problem. We build digital experiences where design and function move as one.",

    background: "#03CEA4",
    foreground: "#07111f",
    muted: "rgba(7,17,31,0.60)",
    accent: "#07111f",
    ghost: "rgba(7,17,31,0.055)",
  },

  {
    eyebrow: "",
    kicker: "This is where imagination becomes tangible.",
    title: "We make ideas real.",
    description:
      "Brands. Technology. Art. Products. Experiences. TCE exists to explore what an idea could become — and then build it.",

    // switched from red to TCE navy
    background: "#07111f",
    foreground: "#FFFFFF",
    muted: "rgba(255,255,255,0.52)",
    accent: "#EAC435",
    ghost: "rgba(255,255,255,0.035)",
  },
];

export default function ObserverShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const showcase = root;

    const sections = gsap.utils.toArray<HTMLElement>(
      ".tce-showcase-slide",
      showcase,
    );

    const titleElements = gsap.utils.toArray<HTMLElement>(
      ".tce-showcase-title",
      showcase,
    );

    const numberElements = gsap.utils.toArray<HTMLElement>(
      ".tce-showcase-number",
      showcase,
    );

    const splitTitles = titleElements.map(
      (title) =>
        new SplitText(title, {
          type: "words,chars",
          wordsClass: "tce-word",
          charsClass: "tce-char",
        }),
    );

    let currentIndex = -1;
    let animating = false;
    let leavingShowcase = false;

    let observer: ReturnType<typeof Observer.create>;

    /*
    |--------------------------------------------------------------------------
    | INITIAL STATE
    |--------------------------------------------------------------------------
    */

    gsap.set(sections, {
      autoAlpha: 0,
    });

    /*
    |--------------------------------------------------------------------------
    | SLIDE TRANSITION
    |--------------------------------------------------------------------------
    */

    function goToSection(index: number, direction: 1 | -1) {
      if (animating || index < 0 || index >= sections.length) {
        return;
      }

      animating = true;

      const incoming = sections[index];

      const incomingContent = incoming.querySelectorAll<HTMLElement>(
        "[data-showcase-reveal]",
      );

      const incomingRule = incoming.querySelector<HTMLElement>(
        "[data-showcase-rule]",
      );

      const incomingIndex = numberElements[index];

      const directionFactor = direction === 1 ? 1 : -1;

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.inOut",
        },

        onComplete: () => {
          animating = false;
        },
      });

      /*
      |--------------------------------------------------------------------------
      | OUTGOING
      |--------------------------------------------------------------------------
      */

      if (currentIndex >= 0) {
        const outgoing = sections[currentIndex];

        const outgoingTitle = splitTitles[currentIndex];

        tl.to(
          outgoingTitle.chars,
          {
            yPercent: -120 * directionFactor,

            autoAlpha: 0,

            stagger: {
              each: 0.008,
              from: direction === 1 ? "start" : "end",
            },

            duration: 0.55,

            ease: "power3.in",
          },
          0,
        );

        tl.to(
          outgoing,
          {
            autoAlpha: 0,
            duration: 0.4,
          },
          0.35,
        );
      }

      /*
      |--------------------------------------------------------------------------
      | INCOMING BACKGROUND
      |--------------------------------------------------------------------------
      */

      gsap.set(incoming, {
        autoAlpha: 1,
        zIndex: 2,
      });

      /*
      |--------------------------------------------------------------------------
      | GIANT NUMBER
      |--------------------------------------------------------------------------
      */

      if (incomingIndex) {
        tl.fromTo(
          incomingIndex,
          {
            scale: 1.22,
            autoAlpha: 0,
          },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          0.2,
        );
      }

      /*
      |--------------------------------------------------------------------------
      | MAIN TITLE
      |--------------------------------------------------------------------------
      */

      tl.fromTo(
        splitTitles[index].chars,
        {
          yPercent: 130 * directionFactor,

          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,

          stagger: {
            each: 0.012,
            from: "start",
          },

          duration: 0.9,

          ease: "power4.out",
        },
        0.28,
      );

      /*
      |--------------------------------------------------------------------------
      | SUPPORTING CONTENT
      |--------------------------------------------------------------------------
      */

      tl.fromTo(
        incomingContent,
        {
          y: 30 * directionFactor,

          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,

          stagger: 0.08,

          duration: 0.7,

          ease: "power3.out",
        },
        0.55,
      );

      /*
      |--------------------------------------------------------------------------
      | EDITORIAL RULE
      |--------------------------------------------------------------------------
      */

      if (incomingRule) {
        tl.fromTo(
          incomingRule,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          0.55,
        );
      }

      currentIndex = index;
    }

    /*
    |--------------------------------------------------------------------------
    | LEAVE DOWN → NEXT PAGE SECTION
    |--------------------------------------------------------------------------
    */

    function leaveShowcaseDown() {
      if (leavingShowcase || animating) {
        return;
      }

      const nextSection = showcase.nextElementSibling as HTMLElement | null;

      if (!nextSection) return;

      leavingShowcase = true;

      observer.disable();

      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.setTimeout(() => {
        leavingShowcase = false;
      }, 1000);
    }

    /*
    |--------------------------------------------------------------------------
    | LEAVE UP → HERO
    |--------------------------------------------------------------------------
    */

    function leaveShowcaseUp() {
      if (leavingShowcase || animating) {
        return;
      }

      leavingShowcase = true;

      observer.disable();

      window.scrollTo({
        top: Math.max(0, showcase.offsetTop - window.innerHeight),

        behavior: "smooth",
      });

      window.setTimeout(() => {
        leavingShowcase = false;
      }, 1000);
    }

    /*
    |--------------------------------------------------------------------------
    | GSAP OBSERVER
    |--------------------------------------------------------------------------
    */

    observer = Observer.create({
      target: showcase,

      type: "wheel,touch,pointer",

      wheelSpeed: -1,

      tolerance: 12,

      preventDefault: true,

      /*
       * scroll upward
       */

      onDown: () => {
        if (animating || leavingShowcase) {
          return;
        }

        if (currentIndex === 0) {
          leaveShowcaseUp();

          return;
        }

        goToSection(currentIndex - 1, -1);
      },

      /*
       * scroll downward
       */

      onUp: () => {
        if (animating || leavingShowcase) {
          return;
        }

        const lastIndex = sections.length - 1;

        if (currentIndex === lastIndex) {
          leaveShowcaseDown();

          return;
        }

        goToSection(currentIndex + 1, 1);
      },
    });

    /*
    |--------------------------------------------------------------------------
    | ENABLE OBSERVER ONLY WHILE THIS SECTION IS ACTIVE
    |--------------------------------------------------------------------------
    */

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry || leavingShowcase) {
          return;
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.72) {
          observer.enable();
        } else {
          observer.disable();
        }
      },

      {
        threshold: [0, 0.25, 0.5, 0.72, 1],
      },
    );

    intersectionObserver.observe(showcase);

    /*
    |--------------------------------------------------------------------------
    | FIRST SCREEN
    |--------------------------------------------------------------------------
    */

    goToSection(0, 1);

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      observer.kill();

      intersectionObserver.disconnect();

      splitTitles.forEach((split) => {
        split.revert();
      });

      gsap.killTweensOf(sections);

      gsap.killTweensOf(titleElements);

      gsap.killTweensOf(numberElements);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden"
      
    >
      {slides.map((slide, index) => {
        const number = String(index + 1).padStart(2, "0");

        const isLast = index === slides.length - 1;

        return (
          <section
            key={slide.title}
            className="
                tce-showcase-slide
                invisible
                absolute
                inset-0
                overflow-hidden
              "
            style={{
              backgroundColor: slide.background,

              color: slide.foreground,
            }}
          >
    


            <div
              data-showcase-reveal
              className="
                  absolute
                  left-8
                  right-8
                  top-8
                  z-20
                  flex
                  items-center
                  justify-between
                  sm:left-10
                  sm:right-10
                "
            >
             
            </div>

            {/* =================================================
                  MAIN CONTENT
              ================================================= */}

            <div
              className="
                  relative
                  z-10
                  mx-auto
                  flex
                  h-full
                  w-full
                  max-w-[1500px]
                  items-center
                  px-7
                  sm:px-12
                  lg:px-16
                  xl:px-20
                "
            >
              <div
                className="
                    w-full
                    max-w-[1150px]
                  "
              >

            

                {/* KICKER */}

                <p
                  data-showcase-reveal
                  className="
                      mt-8
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.24em]
                      sm:text-sm
                    "
                  style={{
                    color: slide.muted,
                  }}
                >
                  {slide.kicker}
                </p>

                {/* TITLE */}

                <h2
                  className="
                      tce-showcase-title
                      mt-4
                      max-w-[1100px]
                      overflow-hidden
                      font-abril
                      text-[clamp(4.4rem,9vw,10rem)]
                      font-black
                      leading-[0.82]
                      tracking-[-0.065em]
                    "
                >
                  {slide.title}
                </h2>

                {/* LINE */}

                <div
                  data-showcase-rule
                  className="
                      mt-9
                      h-px
                      w-full
                      max-w-[180px]
                      origin-left
                    "
                  style={{
                    backgroundColor: slide.accent,
                  }}
                />

                {/* DESCRIPTION */}

                <p
                  data-showcase-reveal
                  className="
                      mt-7
                      max-w-2xl
                      text-base
                      leading-8
                      sm:text-lg
                      lg:text-xl
                      lg:leading-9
                    "
                  style={{
                    color: slide.muted,
                  }}
                >
                  {slide.description}
                </p>
              </div>
            </div>

            {/* =================================================
                  BOTTOM NAVIGATION
              ================================================= */}

            <div
              data-showcase-reveal
              className="
                  absolute
                  bottom-8
                  left-8
                  right-8
                  z-20
                  flex
                  items-end
                  justify-between
                  sm:left-10
                  sm:right-10
                "
            >
              {/* PROGRESS */}

              <div className="flex items-center gap-4">
                {slides.map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={`
                          block
                          h-px
                          transition-all
                          duration-500

                          ${dotIndex === index ? "w-12" : "w-4"}
                        `}
                    style={{
                      backgroundColor:
                        dotIndex === index ? slide.accent : slide.muted,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}
