import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import StartProjectForm from "@/app/components/ui/project/StartProjectForm";

export const metadata = {
  title: "Start a Project | The Creative Explorer",
  description:
    "Tell The Creative Explorer about your branding, technology or business project.",
};

const projectSteps = [
  {
    icon: Lightbulb,
    title: "Tell us the idea",
    description:
      "Share what you are building, what you need and where you want the project to go.",
  },
  {
    icon: BriefcaseBusiness,
    title: "We shape the direction",
    description:
      "We review the brief, clarify priorities and recommend the right TCE division or combination.",
  },
  {
    icon: Sparkles,
    title: "We build with intention",
    description:
      "Once the scope is approved, we move from strategy into design, development and delivery.",
  },
];

export default function StartProjectPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] px-5 py-8 text-white sm:px-8 lg:px-10">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-40 top-24 size-[34rem] rounded-full bg-[#03CEA4]/10 blur-[170px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 size-[34rem] rounded-full bg-[#FB4D3D]/10 blur-[170px]" />

      <div className="pointer-events-none absolute -bottom-60 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-[#EAC435]/8 blur-[180px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(circle_at_center,white_0.7px,transparent_0.8px)] [background-size:6px_6px]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="flex items-center justify-between gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>

          <div className="flex items-center gap-2 text-xs text-white/35">
            <ShieldCheck className="size-3.5 text-[#03CEA4]" />
            Private project enquiry
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-72px)] items-start gap-12 py-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(560px,0.9fr)] lg:items-center lg:gap-16">
          {/* Left content */}
          <section>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#03CEA4]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#03CEA4] sm:text-xs">
                Start a project
              </p>
            </div>

            <h1 className="mt-7 max-w-3xl font-abril text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.055em]">
              Let&apos;s build
              <span className="block text-[#EAC435]">
                something worth
              </span>
              <span className="block">
                remembering.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/50 sm:text-lg">
              Tell us about the idea, challenge or opportunity. We will review
              your brief and recommend the best creative, technical or project
              direction.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {projectSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5"
                  >
                    <div className="grid size-10 place-items-center rounded-full bg-[#03CEA4]/10 text-[#03CEA4]">
                      <Icon className="size-4.5" />
                    </div>

                    <h2 className="mt-4 text-sm font-semibold">
                      {step.title}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-white/40">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/40">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5">
                <Clock3 className="size-3.5 text-[#EAC435]" />
                Response within 1–2 business days
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5">
                <CheckCircle2 className="size-3.5 text-[#03CEA4]" />
                No commitment required
              </span>
            </div>
          </section>

          {/* Form card */}
          <section className="mx-auto w-full max-w-2xl">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-3xl sm:p-8">
              <div className="mb-7">
                <Link
                  href="/"
                  aria-label="TCE home"
                  className="inline-flex font-bebit text-4xl leading-none"
                >
                  <span className="text-[#EAC435]">T</span>
                  <span className="text-[#03CEA4]">C</span>
                  <span className="text-[#FB4D3D]">E</span>
                </Link>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                  Tell us about your project
                </h2>

                <p className="mt-2 text-sm leading-7 text-white/45">
                  The more context you provide, the better we can prepare for
                  the first conversation.
                </p>
              </div>

              <div className="mb-7 h-px bg-white/[0.08]" />

              <StartProjectForm />
            </div>

            <p className="mt-5 text-center text-xs leading-6 text-white/25">
              Your project information is treated as private and used only to
              evaluate your enquiry.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}