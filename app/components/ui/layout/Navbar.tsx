"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Brush,
  Code2,
  Layers3,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import CartButton from "@/app/components/ui/shop/CartButton";

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  function openAboutPreview() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    setAboutOpen(true);
  }

  function scheduleAboutClose() {
    closeTimer.current = setTimeout(() => {
      setAboutOpen(false);
    }, 150);
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <nav
      className="
        fixed
        left-1/2
        top-0
        z-50
        w-full
        -translate-x-1/2
        px-4
        pt-4
        sm:px-6
        lg:px-8
      "
    >
      <div
        className={`
          relative
          mx-auto
          max-w-[1450px]
          transition-all
          duration-500

          ${
            scrolled
              ? "rounded-[1.35rem] border border-white/[0.08] bg-[#07111f]/80 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
              : "border-b border-white/[0.09] bg-[#07111f]/15 backdrop-blur-md"
          }
        `}
      >
        {/* =======================================================
            NAVBAR INNER
        ======================================================== */}

        <div
          className="
            relative
            z-20
            flex
            min-h-[72px]
            items-center
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* =====================================================
              BRAND
          ====================================================== */}

          <div className="flex flex-1 items-center">
            <Link
              href="/"
              aria-label="The Creative Explorer home"
              className="group inline-flex items-center gap-4"
            >
              {/* TCE LOGO */}

              <div className="relative">
                <span
                  className="
                    font-bebit
                    text-[1.9rem]
                    tracking-[0.06em]
                    leading-none
                  "
                >
                  <span className="text-[#EAC435]">
                    T
                  </span>

                  <span className="text-[#03CEA4]">
                    C
                  </span>

                  <span className="text-[#FB4D3D]">
                    E
                  </span>
                </span>

                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-px
                    w-0
                    bg-[#EAC435]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />
              </div>

              {/* DIVIDER */}

              <span className="hidden h-8 w-px bg-white/15 sm:block" />

              {/* BRAND NAME */}

              <div className="hidden sm:block">
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-white/45
                  "
                >
                  The Creative
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-white/70
                  "
                >
                  Explorer
                </span>
              </div>
            </Link>
          </div>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <div className="hidden flex-1 justify-center lg:flex">
            <div
              className="
                flex
                items-center
                gap-10
                rounded-full
                border
                border-white/[0.06]
                bg-black/10
                px-7
                py-2
                backdrop-blur-md
              "
            >
              <NavLink href="/">
                Home
              </NavLink>

              <NavLink href="/shop">
                Shop
              </NavLink>

              <NavLink href="/portfolio">
                Work
              </NavLink>

              {/* ABOUT */}

              <div
                className="relative"
                onMouseEnter={openAboutPreview}
                onMouseLeave={scheduleAboutClose}
              >
                <Link
                  href="/about"
                  onFocus={openAboutPreview}
                  onBlur={scheduleAboutClose}
                  aria-expanded={aboutOpen}
                  className={`
                    group
                    relative
                    block
                    py-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    transition
                    duration-300

                    ${
                      aboutOpen
                        ? "text-white"
                        : "text-white/55 hover:text-white"
                    }
                  `}
                >
                  About

                  <span
                    className={`
                      absolute
                      inset-x-0
                      -bottom-0.5
                      mx-auto
                      h-px
                      bg-[#EAC435]
                      transition-all
                      duration-300

                      ${
                        aboutOpen
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT ACTIONS
          ====================================================== */}

          <div className="flex flex-1 items-center justify-end gap-3">
            <div
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-1
                backdrop-blur-md
              "
            >
              <CartButton />
            </div>

            <Link
              href="/contact"
              className="
                group
                hidden
                min-h-11
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[#EAC435]
                px-5
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-[#07111f]
                shadow-[0_12px_35px_rgba(234,196,53,0.18)]
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:bg-white
                sm:inline-flex
              "
            >
              Start a project

              <ArrowUpRight
                className="
                  size-3.5
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>

            {/* MOBILE BUTTON */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  (current) => !current,
                )
              }
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
              className="
                grid
                size-11
                place-items-center
                rounded-full
                border
                border-white/[0.1]
                bg-black/20
                text-white/80
                backdrop-blur-md
                transition
                hover:border-white/25
                hover:bg-white/[0.07]
                hover:text-white
                lg:hidden
              "
            >
              {mobileOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* =======================================================
            ABOUT PREVIEW
        ======================================================== */}

        <div
          onMouseEnter={openAboutPreview}
          onMouseLeave={scheduleAboutClose}
          className={`
            absolute
            left-1/2
            top-[calc(100%+14px)]
            hidden
            w-[660px]
            -translate-x-1/2
            transition-all
            duration-300
            lg:block

            ${
              aboutOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-3 opacity-0"
            }
          `}
        >
          {/* Invisible hover bridge */}

          <div className="absolute -top-5 left-0 h-6 w-full" />

          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.09]
              bg-[#07111f]/90
              p-3
              shadow-[0_35px_100px_rgba(0,0,0,0.5)]
              backdrop-blur-3xl
            "
          >
            {/* Glow */}

            <div className="pointer-events-none absolute -left-24 top-0 size-60 rounded-full bg-[#03CEA4]/10 blur-[90px]" />

            <div className="pointer-events-none absolute -right-24 bottom-0 size-60 rounded-full bg-[#EAC435]/10 blur-[90px]" />

            <div className="relative grid grid-cols-[0.95fr_1.05fr]">
              {/* VISUAL */}

              <div
                className="
                  relative
                  min-h-[260px]
                  overflow-hidden
                  rounded-[1.6rem]
                  border
                  border-white/[0.07]
                  bg-[#0b1726]
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_30%_25%,rgba(3,206,164,0.22),transparent_38%),radial-gradient(circle_at_75%_70%,rgba(251,77,61,0.15),transparent_40%),radial-gradient(circle_at_45%_100%,rgba(234,196,53,0.17),transparent_42%)]
                  "
                />

                <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_center,white_0.7px,transparent_0.8px)] [background-size:6px_6px]" />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.28em]
                        text-white/35
                      "
                    >
                      About TCE
                    </span>

                    <Sparkles className="size-4 text-[#EAC435]" />
                  </div>

                  <div>
                    <p
                      className="
                        font-abril
                        text-[2.7rem]
                        leading-[0.86]
                        tracking-[-0.045em]
                        text-white
                      "
                    >
                      Ideas

                      <span className="block text-[#EAC435]">
                        worth
                      </span>

                      <span className="block">
                        building.
                      </span>
                    </p>

                    <div className="mt-6 flex gap-2">
                      <PreviewIcon
                        icon={
                          <Brush className="size-3.5" />
                        }
                        color="#EAC435"
                      />

                      <PreviewIcon
                        icon={
                          <Code2 className="size-3.5" />
                        }
                        color="#03CEA4"
                      />

                      <PreviewIcon
                        icon={
                          <Layers3 className="size-3.5" />
                        }
                        color="#FB4D3D"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENT */}

              <div className="flex flex-col px-7 py-6">
                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-[#03CEA4]
                  "
                >
                  Our Story
                </p>

                <h2
                  className="
                    mt-5
                    font-abril
                    text-[2rem]
                    leading-[0.95]
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  Creativity,
                  technology and
                  execution under
                  one direction.
                </h2>

                <p
                  className="
                    mt-5
                    text-sm
                    leading-6
                    text-white/45
                  "
                >
                  TCE is where ideas move
                  beyond imagination into
                  brands, products, systems
                  and experiences.
                </p>

                <div className="mt-auto pt-7">
                  <Link
                    href="/about"
                    onClick={() =>
                      setAboutOpen(false)
                    }
                    className="
                      group
                      inline-flex
                      min-h-11
                      items-center
                      gap-2
                      border-b
                      border-[#EAC435]/40
                      pb-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#EAC435]
                      transition
                      hover:border-[#EAC435]
                      hover:text-white
                    "
                  >
                    Explore our story

                    <ArrowUpRight
                      className="
                        size-3.5
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            MOBILE MENU
        ======================================================== */}

        <div
          className={`
            absolute
            left-0
            right-0
            top-[calc(100%+12px)]
            z-10
            overflow-hidden
            rounded-[1.8rem]
            border
            border-white/[0.09]
            bg-[#07111f]/95
            shadow-[0_30px_90px_rgba(0,0,0,0.5)]
            backdrop-blur-3xl
            transition-all
            duration-300
            lg:hidden

            ${
              mobileOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-3 opacity-0"
            }
          `}
        >
          <div className="space-y-1 p-4">
            <MobileLink
              href="/"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Home
            </MobileLink>

            <MobileLink
              href="/shop"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Shop
            </MobileLink>

            <MobileLink
              href="/portfolio"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Work
            </MobileLink>

            <MobileLink
              href="/about"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              About
            </MobileLink>

            <div className="my-3 h-px bg-white/[0.08]" />

            <Link
              href="/contact"
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                inline-flex
                min-h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#EAC435]
                px-5
                text-xs
                font-black
                uppercase
                tracking-[0.16em]
                text-[#07111f]
              "
            >
              Start a project

              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* =============================================================
   DESKTOP NAV LINK
============================================================= */

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

function NavLink({
  href,
  children,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        py-2
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.2em]
        text-white/55
        transition
        duration-300
        hover:text-white
      "
    >
      {children}

      <span
        className="
          absolute
          inset-x-0
          -bottom-0.5
          mx-auto
          h-px
          w-0
          bg-[#EAC435]
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </Link>
  );
}

/* =============================================================
   MOBILE LINK
============================================================= */

type MobileLinkProps = {
  href: string;
  children: ReactNode;
  onClick: () => void;
};

function MobileLink({
  href,
  children,
  onClick,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        flex
        min-h-12
        items-center
        justify-between
        rounded-xl
        px-4
        text-sm
        font-medium
        text-white/60
        transition
        hover:bg-white/[0.05]
        hover:text-white
      "
    >
      {children}

      <ArrowUpRight
        className="
          size-3.5
          text-white/25
          transition-transform
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
          group-hover:text-[#EAC435]
        "
      />
    </Link>
  );
}

/* =============================================================
   PREVIEW ICON
============================================================= */

type PreviewIconProps = {
  icon: ReactNode;
  color: string;
};

function PreviewIcon({
  icon,
  color,
}: PreviewIconProps) {
  return (
    <span
      className="
        grid
        size-9
        place-items-center
        rounded-full
        border
        backdrop-blur-md
      "
      style={{
        color,
        borderColor: `${color}35`,
        backgroundColor: `${color}12`,
      }}
    >
      {icon}
    </span>
  );
}