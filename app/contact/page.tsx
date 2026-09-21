import Link from "next/link";
import { ArrowLeft, ArrowDown } from "lucide-react";
import StartProjectForm from "@/app/components/ui/project/StartProjectForm";

export const metadata = {
  title: "Start a Project | The Creative Explorer",
  description:
    "Bring your idea to The Creative Explorer. Let's explore what it could become.",
};

export default function StartProjectPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111F] text-[#F4F1EA]">

      {/* NAV */}
      <header className="mx-auto flex w-full max-w-[1380px] items-center justify-between px-5 py-6 sm:px-8 md:px-12 lg:px-16">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.2em] text-[#8994A2] transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>

        <Link
          href="/"
          aria-label="The Creative Explorer"
          className="font-bebit text-[28px] leading-none"
        >
          <span className="text-[#EAC435]">T</span>
          <span className="text-[#03CEA4]">C</span>
          <span className="text-[#FB4D3D]">E</span>
        </Link>
      </header>


      {/* INTRO */}
      <section className="mx-auto w-full max-w-[1380px] px-5 pb-20 pt-20 text-center sm:px-8 sm:pb-24 sm:pt-24 md:px-12 lg:px-16 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-[780px]">

          <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#EAC435] sm:text-[11px]">
            Start a project
          </p>

          <h1 className="mt-5 font-abril text-[clamp(2.8rem,6vw,5rem)] leading-[1] tracking-[-.035em]">
            Bring us the idea.
            <span className="block text-[#03CEA4]">
              Let&apos;s explore it.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-[590px] text-[15px] leading-7 text-[#AAB3BE] sm:text-base sm:leading-8">
            You don&apos;t need to have everything figured out. Tell us what
            you&apos;re thinking, what you&apos;re trying to create, or where
            you need help moving forward.
          </p>

          <a
            href="#project-form"
            aria-label="Continue to project form"
            className="group mx-auto mt-10 inline-flex size-11 items-center justify-center rounded-full border border-white/[.12] text-[#AAB3BE] transition-all duration-300 hover:border-[#03CEA4]/50 hover:text-[#03CEA4]"
          >
            <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>

        </div>
      </section>


      {/* QUIET TRANSITION */}
      <section className="border-y border-white/[.08]">
        <div className="mx-auto max-w-[900px] px-5 py-6 text-center sm:px-8">

          <p className="text-[9px] font-medium uppercase tracking-[.2em] text-[#697583] sm:text-[10px]">
            An idea can start anywhere
            <span className="mx-3 text-white/15">•</span>
            <span className="text-[#EAC435]">Explore</span>
            <span className="mx-3 text-white/15">•</span>
            <span className="text-[#03CEA4]">Create</span>
            <span className="mx-3 text-white/15">•</span>
            <span className="text-[#FB4D3D]">Build</span>
          </p>

        </div>
      </section>


      {/* WELCOME */}
      <section className="mx-auto w-full max-w-[1380px] px-5 py-20 text-center sm:px-8 sm:py-24 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[680px]">

          <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#FB4D3D]">
            Your starting point
          </p>

          <h2 className="mt-5 font-abril text-[2.1rem] leading-[1.12] tracking-[-.025em] sm:text-[2.6rem] lg:text-[3rem]">
            Start with what you know.
          </h2>

          <div className="mx-auto mt-6 h-px w-12 bg-[#FB4D3D]/60" />

          <p className="mx-auto mt-6 max-w-[590px] text-[15px] leading-7 text-[#AAB3BE] sm:text-base sm:leading-8">
            A name. A sketch. A business challenge. A product idea. A project
            already in motion. Wherever you are in the process, give us enough
            context to understand what you&apos;re exploring.
          </p>

        </div>
      </section>


      {/* FORM AREA */}
      <section
        id="project-form"
        className="scroll-mt-8 border-t border-white/[.08] bg-[#0A1625]"
      >
        <div className="mx-auto w-full max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16 lg:py-28">

          <div className="mx-auto max-w-[760px]">

            {/* FORM HEADING */}
            <div className="text-center">

              <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#03CEA4]">
                Tell us about it
              </p>

              <h2 className="mt-4 font-abril text-[2.15rem] leading-[1.1] tracking-[-.025em] sm:text-[2.7rem]">
                What are you exploring?
              </h2>

              <p className="mx-auto mt-5 max-w-[520px] text-[14px] leading-7 text-[#8E99A6] sm:text-[15px]">
                There&apos;s no need for a perfect brief. Share what you have,
                and we&apos;ll use it as the starting point for the
                conversation.
              </p>

            </div>


            {/* FORM */}
            <div className="mt-12 rounded-[1.75rem] border border-white/[.08] bg-[#07111F] p-5 sm:p-8 lg:p-10">
              <StartProjectForm />
            </div>


            {/* PRIVACY */}
            <p className="mx-auto mt-5 max-w-[520px] text-center text-[10px] leading-5 text-[#65717F]">
              The information you share is used only to understand your
              enquiry and prepare for our conversation.
            </p>

          </div>

        </div>
      </section>


      {/* WHAT HAPPENS NEXT */}
      <section className="mx-auto w-full max-w-[1380px] px-5 py-20 text-center sm:px-8 sm:py-24 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[680px]">

          <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#EAC435]">
            What happens next
          </p>

          <h2 className="mt-5 font-abril text-[2.1rem] leading-[1.12] tracking-[-.025em] sm:text-[2.6rem] lg:text-[3rem]">
            We&apos;ll take it from there.
          </h2>

          <div className="mx-auto mt-6 h-px w-12 bg-[#EAC435]/60" />

          <p className="mx-auto mt-6 max-w-[580px] text-[15px] leading-7 text-[#AAB3BE] sm:text-base sm:leading-8">
            We&apos;ll review what you&apos;ve shared, understand where TCE can
            add value, and reach out to continue the conversation.
          </p>

          <p className="mt-5 text-[11px] uppercase tracking-[.16em] text-[#687482]">
            Usually within 1–2 business days
          </p>

        </div>
      </section>


      {/* CLOSING */}
      <footer className="border-t border-white/[.08]">
        <div className="mx-auto flex w-full max-w-[1380px] flex-col items-center px-5 py-10 text-center sm:px-8 md:px-12 lg:px-16">

          <Link
            href="/"
            aria-label="The Creative Explorer"
            className="font-bebit text-3xl leading-none"
          >
            <span className="text-[#EAC435]">T</span>
            <span className="text-[#03CEA4]">C</span>
            <span className="text-[#FB4D3D]">E</span>
          </Link>

          <p className="mt-4 text-[9px] uppercase tracking-[.22em] text-[#66717F]">
            Explore Creativity. Build Innovation.
          </p>

        </div>
      </footer>

    </main>
  );
}