import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Brush,
  Code2,
  Layers3,
  Lightbulb,
  MoveRight,
  Sparkles,
} from "lucide-react";

import Navbar from "@/app/components/ui/layout/Navbar";

export const metadata = {
  title: "About | The Creative Explorer",
  description:
    "Discover the story, philosophy and creative divisions behind The Creative Explorer.",
};

const principles = [
  {
    number: "01",
    title: "Curiosity",
    description:
      "We begin by asking better questions, exploring possibilities and looking beyond the obvious.",
  },
  {
    number: "02",
    title: "Precision",
    description:
      "Every detail matters. We combine imagination with thoughtful execution and reliable systems.",
  },
  {
    number: "03",
    title: "Originality",
    description:
      "We do not create simply to follow trends. We build work with identity, meaning and staying power.",
  },
];

const journey = [
  {
    number: "01",
    title: "An idea",
    description:
      "Every meaningful project begins with a possibility worth exploring.",
  },
  {
    number: "02",
    title: "A direction",
    description:
      "Research, strategy and creative thinking give the idea clarity.",
  },
  {
    number: "03",
    title: "A creation",
    description:
      "Design and technology transform the direction into something tangible.",
  },
  {
    number: "04",
    title: "An experience",
    description:
      "The final work connects with people, communicates value and creates momentum.",
  },
];

const divisions = [
  {
    name: "Creative",
    eyebrow: "Brand and expression",
    description:
      "Brand identities, visual direction, printing, artwork and creative production shaped with intention.",
    icon: Brush,
    href: "/portfolio",
    accent: "#EAC435",
  },
  {
    name: "Technology",
    eyebrow: "Digital and intelligent",
    description:
      "Websites, applications, cloud solutions and technical systems designed to perform beautifully.",
    icon: Code2,
    href: "/contact",
    accent: "#03CEA4",
  },
  {
    name: "Projects",
    eyebrow: "Strategy and execution",
    description:
      "Project management, consulting and business solutions that turn ambitious ideas into structured outcomes.",
    icon: Layers3,
    href: "/contact",
    accent: "#FB4D3D",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#07111f] text-white">
      <Navbar />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-52 top-1/4 size-[34rem] rounded-full bg-[#03CEA4]/10 blur-[170px]" />

          <div className="absolute -right-52 top-1/3 size-[34rem] rounded-full bg-[#FB4D3D]/10 blur-[170px]" />

          <div className="absolute -bottom-64 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[#EAC435]/10 blur-[190px]" />

          <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(circle_at_center,white_0.7px,transparent_0.8px)] [background-size:6px_6px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#03CEA4]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#03CEA4] sm:text-xs">
                About The Creative Explorer
              </p>

              <span className="h-px w-10 bg-[#03CEA4]" />
            </div>

            <h1 className="mt-8 font-abril text-[clamp(4.4rem,11vw,10rem)] leading-[0.82] tracking-[-0.06em]">
              We build
              <span className="block text-[#EAC435]">
                what ideas
              </span>
              <span className="block">
                can become.
              </span>
            </h1>

            <p className="mt-10 max-w-3xl text-base leading-8 text-white/50 sm:text-lg">
              The Creative Explorer is a multidisciplinary company where
              creativity, technology and structured execution meet. We help
              ideas move from imagination into meaningful brands, products and
              experiences.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f] transition hover:scale-[1.02] hover:brightness-110"
              >
                Explore our work
                <ArrowUpRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-6 text-sm font-medium text-white/65 transition hover:border-white/25 hover:text-white"
              >
                Start a project
                <MoveRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 hidden text-[9px] uppercase tracking-[0.35em] text-white/20 lg:block">
          Creativity · Technology · Projects
        </div>

        <div className="absolute bottom-8 right-8 hidden text-[9px] uppercase tracking-[0.35em] text-white/20 lg:block">
          Ideas worth building
        </div>
      </section>

      <section className="border-y border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-white/[0.07] px-5 py-16 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#03CEA4]">
              Our story
            </p>

            <h2 className="mt-6 font-abril text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              Every remarkable creation begins with curiosity.
            </h2>
          </div>

          <div className="flex items-center px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
            <div className="max-w-2xl space-y-6 text-base leading-8 text-white/50">
              <p>
                The Creative Explorer was created from the belief that strong
                ideas should not be limited by disciplines. A brand may need
                thoughtful design, dependable technology, strategic planning
                and physical production working together.
              </p>

              <p>
                Rather than separating those capabilities, TCE brings them
                together under one creative direction. This allows us to think
                beyond isolated deliverables and build complete experiences
                with consistency from concept to execution.
              </p>

              <p className="font-medium text-white/75">
                We explore widely, think deliberately and create with purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#03CEA4]/5 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#EAC435]">
                Our philosophy
              </p>

              <h2 className="mt-5 font-abril text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                Creativity is not decoration.
              </h2>
            </div>

            <blockquote className="border-l border-[#EAC435]/35 pl-6 font-abril text-3xl leading-tight text-white/80 sm:pl-10 sm:text-4xl lg:text-5xl">
              It is the ability to see possibility, create direction and make
              something valuable exist.
            </blockquote>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="group rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#03CEA4]/25 hover:bg-[#03CEA4]/[0.035] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-white/25">
                    {principle.number}
                  </span>

                  <Lightbulb className="size-5 text-[#03CEA4]/60 transition group-hover:text-[#03CEA4]" />
                </div>

                <h3 className="mt-10 text-2xl font-semibold">
                  {principle.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/45">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FB4D3D]">
              How ideas move
            </p>

            <h2 className="mt-5 font-abril text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              From possibility to experience.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/45">
              Our process gives ideas enough freedom to develop and enough
              structure to become real.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute bottom-0 left-[23px] top-0 hidden w-px bg-white/10 md:block" />

            <div className="space-y-5">
              {journey.map((item) => (
                <article
                  key={item.number}
                  className="relative grid gap-5 rounded-[1.75rem] border border-white/[0.08] bg-[#07111f]/70 p-6 backdrop-blur-xl md:grid-cols-[48px_0.7fr_1.3fr] md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0"
                >
                  <div className="relative z-10 grid size-12 place-items-center rounded-full border border-white/10 bg-[#07111f] text-xs font-semibold text-[#03CEA4]">
                    {item.number}
                  </div>

                  <h3 className="text-2xl font-semibold md:py-8">
                    {item.title}
                  </h3>

                  <p className="max-w-xl text-sm leading-7 text-white/45 md:py-8">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#03CEA4]">
                One company, three divisions
              </p>

              <h2 className="mt-5 font-abril text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                Different capabilities. One creative direction.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/40">
              Each division can work independently or combine with the others
              to deliver a complete solution.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {divisions.map((division) => {
              const Icon = division.icon;

              return (
                <Link
                  key={division.name}
                  href={division.href}
                  className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-2 hover:border-white/20 sm:p-8"
                >
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full opacity-10 blur-[90px] transition duration-500 group-hover:scale-125 group-hover:opacity-20"
                    style={{
                      backgroundColor: division.accent,
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div
                      className="grid size-12 place-items-center rounded-full border"
                      style={{
                        borderColor: `${division.accent}40`,
                        backgroundColor: `${division.accent}15`,
                        color: division.accent,
                      }}
                    >
                      <Icon className="size-5" />
                    </div>

                    <div className="mt-auto pt-20">
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                        style={{
                          color: division.accent,
                        }}
                      >
                        {division.eyebrow}
                      </p>

                      <h3 className="mt-4 font-abril text-5xl tracking-[-0.04em]">
                        {division.name}
                      </h3>

                      <p className="mt-5 text-sm leading-7 text-white/45">
                        {division.description}
                      </p>

                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition group-hover:text-white">
                        Discover more
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.07] px-5 py-24 text-center sm:px-8 lg:px-10 lg:py-36">
        <div className="pointer-events-none absolute bottom-[-16rem] left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[#EAC435]/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl">
          <Sparkles className="mx-auto size-7 text-[#EAC435]" />

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-white/35">
            The next idea could be yours
          </p>

          <h2 className="mt-7 font-abril text-[clamp(4rem,9vw,8rem)] leading-[0.86] tracking-[-0.055em]">
            Let&apos;s build
            <span className="block text-[#EAC435]">
              something worth
            </span>
            <span className="block">
              remembering.
            </span>
          </h2>

          <Link
            href="/contact"
            className="mt-12 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#03CEA4] px-8 text-sm font-semibold text-[#07111f] transition hover:scale-[1.02] hover:brightness-110"
          >
            Start your project
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}