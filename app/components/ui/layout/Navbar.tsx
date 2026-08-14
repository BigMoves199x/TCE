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
    }, 140);
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[94%] max-w-6xl -translate-x-1/2">
      <div className="relative">
        {/* Navbar shell */}
        <div className="relative z-20 flex min-h-14 items-center rounded-full border border-white/[0.07] bg-[#07111f]/55 px-4 shadow-[0_14px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:px-5">
          {/* Brand */}
          <div className="flex flex-1 items-center">
            <Link
              href="/"
              aria-label="The Creative Explorer home"
              className="group inline-flex items-center gap-3"
            >
              <div className="font-bebit leading-none">
                <span className="text-[1.75rem] tracking-wide">
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
              </div>

              <span className="hidden whitespace-nowrap text-xs font-medium tracking-wide text-white/50 transition duration-300 group-hover:text-white/80 sm:block">
                The Creative Explorer
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="flex items-center gap-8">
              <NavLink href="/">
                Home
              </NavLink>

              <NavLink href="/shop">
                Shop
              </NavLink>

              <NavLink href="/portfolio">
                Work
              </NavLink>

              {/* About trigger */}
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
                  className={`group relative block py-2 text-xs font-medium tracking-wide transition duration-300 ${
                    aboutOpen
                      ? "text-white"
                      : "text-white/45 hover:text-white/85"
                  }`}
                >
                  About

                  <span
                    className={`absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-[#03CEA4] transition-all duration-300 ${
                      aboutOpen
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <CartButton />

            <Link
              href="/contact"
              className="hidden min-h-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.045] px-4 text-xs font-medium text-white/70 transition duration-300 hover:border-[#03CEA4]/30 hover:bg-[#03CEA4]/10 hover:text-[#8ff8e3] sm:inline-flex"
            >
              Start a project
            </Link>

            <button
              type="button"
              onClick={() =>
                setMobileOpen((current) => !current)
              }
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
              className="grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.035] text-white/65 transition hover:border-white/20 hover:text-white lg:hidden"
            >
              {mobileOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* About hover preview */}
        <div
          onMouseEnter={openAboutPreview}
          onMouseLeave={scheduleAboutClose}
          className={`absolute left-1/2 top-[calc(100%+12px)] hidden w-[620px] -translate-x-1/2 transition duration-300 lg:block ${
            aboutOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          {/* Invisible bridge prevents hover flicker */}
          <div className="absolute -top-4 left-0 h-5 w-full" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07111f]/95 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.48)] backdrop-blur-3xl">
            {/* Ambient color */}
            <div className="pointer-events-none absolute -left-20 top-0 size-52 rounded-full bg-[#03CEA4]/10 blur-[80px]" />

            <div className="pointer-events-none absolute -right-20 bottom-0 size-52 rounded-full bg-[#FB4D3D]/10 blur-[80px]" />

            <div className="relative grid grid-cols-[0.9fr_1.1fr] gap-5">
              {/* Visual preview */}
              <div className="relative min-h-[245px] overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(3,206,164,0.22),transparent_38%),radial-gradient(circle_at_75%_70%,rgba(251,77,61,0.18),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(234,196,53,0.18),transparent_42%)]" />

                <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_center,white_0.7px,transparent_0.8px)] [background-size:6px_6px]" />

                <div className="relative flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
                      About TCE
                    </span>

                    <Sparkles className="size-4 text-[#EAC435]" />
                  </div>

                  <div>
                    <p className="font-abril text-[2.35rem] leading-[0.88] tracking-[-0.04em] text-white">
                      Ideas
                      <span className="block text-[#EAC435]">
                        worth
                      </span>
                      <span className="block">
                        building.
                      </span>
                    </p>

                    <div className="mt-5 flex gap-2">
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

              {/* Preview content */}
              <div className="flex flex-col px-2 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#03CEA4]">
                  Our story
                </p>

                <h2 className="mt-4 font-abril text-3xl leading-[0.95] tracking-[-0.035em]">
                  Creativity, technology and execution under one direction.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/45">
                  Every remarkable brand begins with an
                  idea. Ours became The Creative Explorer—a
                  place where imagination moves into real
                  products, systems and experiences.
                </p>

                <div className="mt-auto pt-6">
                  <Link
                    href="/about"
                    onClick={() =>
                      setAboutOpen(false)
                    }
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#03CEA4] px-5 text-xs font-semibold text-[#07111f] transition hover:brightness-110"
                  >
                    Explore the story

                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`absolute left-0 right-0 top-[calc(100%+10px)] z-10 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#07111f]/95 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-3xl transition duration-300 lg:hidden ${
            mobileOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="space-y-1 p-4">
            <MobileLink
              href="/"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </MobileLink>

            <MobileLink
              href="/shop"
              onClick={() => setMobileOpen(false)}
            >
              Shop
            </MobileLink>

            <MobileLink
              href="/portfolio"
              onClick={() => setMobileOpen(false)}
            >
              Work
            </MobileLink>

            <MobileLink
              href="/about"
              onClick={() => setMobileOpen(false)}
            >
              About
            </MobileLink>

            <div className="my-3 h-px bg-white/[0.08]" />

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-5 text-sm font-semibold text-[#07111f]"
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
      className="group relative py-2 text-xs font-medium tracking-wide text-white/45 transition duration-300 hover:text-white/85"
    >
      {children}

      <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-[#03CEA4] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

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
      className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-medium text-white/55 transition hover:bg-white/[0.05] hover:text-white"
    >
      {children}

      <ArrowUpRight className="size-3.5 text-white/25" />
    </Link>
  );
}

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
      className="grid size-8 place-items-center rounded-full border"
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