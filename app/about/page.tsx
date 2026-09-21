import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About | The Creative Explorer",
  description:
    "The Creative Explorer is a creative company connecting creativity, technology and enterprise to explore and build meaningful ideas.",
};

export default function AboutPage() {
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

        <Link href="/" aria-label="The Creative Explorer" className="font-bebit text-[28px] leading-none">
          <span className="text-[#EAC435]">T</span>
          <span className="text-[#03CEA4]">C</span>
          <span className="text-[#FB4D3D]">E</span>
        </Link>
      </header>


      {/* INTRO */}
      <section className="mx-auto flex min-h-[72svh] w-full max-w-[1380px] items-center justify-center px-5 py-20 text-center sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[850px]">

          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.24em] text-[#EAC435] sm:text-[11px]">
            About The Creative Explorer
          </p>

          <h1 className="font-abril text-[clamp(2.8rem,6vw,5rem)] leading-[1] tracking-[-.035em]">
            Some paths are discovered
            <span className="block text-[#03CEA4]">
              by taking them.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-[650px] text-[15px] leading-7 text-[#AAB3BE] sm:text-base sm:leading-8">
            The Creative Explorer was shaped by a journey through creativity,
            entrepreneurship and technology — trying ideas, learning from them
            and discovering what could come next.
          </p>

        </div>
      </section>


      {/* BRAND STRIP */}
      <section className="border-y border-white/[.08]">
        <div className="mx-auto flex w-full max-w-[1380px] flex-wrap items-center justify-center gap-x-5 gap-y-3 px-5 py-5 text-center sm:px-8">

          <span className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#66717F]">
            Our way of thinking
          </span>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#EAC435]">
            Explore
          </span>

          <span className="size-[3px] rounded-full bg-white/20" />

          <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#03CEA4]">
            Create
          </span>

          <span className="size-[3px] rounded-full bg-white/20" />

          <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#FB4D3D]">
            Build
          </span>

        </div>
      </section>


      {/* WHO WE ARE */}
      <section className="mx-auto w-full max-w-[1380px] px-5 py-24 text-center sm:px-8 sm:py-28 md:px-12 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[800px]">

          <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#FB4D3D]">
            Who we are
          </p>

          <h2 className="mt-5 font-abril text-[2.25rem] leading-[1.1] tracking-[-.025em] sm:text-[2.8rem] lg:text-[3.2rem]">
            Creativity is where we start.
            <span className="block text-[#EAC435]">
              Exploration is how we move.
            </span>
          </h2>

          <div className="mx-auto mt-7 h-px w-12 bg-[#EAC435]/60" />

          <p className="mx-auto mt-7 max-w-[650px] text-[15px] leading-7 text-[#AAB3BE] sm:text-base sm:leading-8">
            TCE is a creative company exploring the space between ideas,
            design, technology and enterprise — turning possibilities into
            things people can see, use and experience.
          </p>

        </div>
      </section>


      {/* PHILOSOPHY */}
      <section className="bg-[#0A1625]">
        <div className="mx-auto w-full max-w-[1380px] px-5 py-24 text-center sm:px-8 sm:py-28 md:px-12 lg:px-16 lg:py-32">

          <div className="mx-auto max-w-[800px]">

            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#03CEA4]">
              The idea behind TCE
            </p>

            <h2 className="mt-5 font-abril text-[2.25rem] leading-[1.1] tracking-[-.025em] sm:text-[2.8rem] lg:text-[3.2rem]">
              You don't need the whole map
              <span className="block">
                to begin.
              </span>
            </h2>

            <div className="mx-auto mt-7 h-px w-12 bg-[#03CEA4]/60" />

            <p className="mx-auto mt-7 max-w-[640px] text-[15px] leading-7 text-[#AAB3BE] sm:text-base sm:leading-8">
              Sometimes you begin with curiosity. You try, learn, adjust and
              build again. TCE grew from that way of thinking.
            </p>

            <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-7 text-[#7F8996] sm:text-base sm:leading-8">
              We believe ideas should have room to evolve, cross disciplines
              and become more than their first form.
            </p>

          </div>
        </div>
      </section>


      {/* DIRECTION */}
      <section className="mx-auto w-full max-w-[1380px] px-5 py-24 text-center sm:px-8 sm:py-28 md:px-12 lg:px-16 lg:py-32">

        <div className="mx-auto max-w-[800px]">

          <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#CA1551]">
            Where we're going
          </p>

          <h2 className="mt-5 font-abril text-[2.25rem] leading-[1.1] tracking-[-.025em] sm:text-[2.8rem] lg:text-[3.2rem]">
            We're still
            <span className="text-[#FB4D3D]"> exploring.</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-12 bg-[#FB4D3D]/60" />

          <p className="mx-auto mt-7 max-w-[650px] text-[15px] leading-7 text-[#AAB3BE] sm:text-base sm:leading-8">
            We're building toward a space where creatives and entrepreneurs
            can discover opportunities, develop ideas and create work with
            real value.
          </p>

          <p className="mx-auto mt-4 max-w-[650px] text-[15px] leading-7 text-[#7F8996] sm:text-base sm:leading-8">
            TCE is still at the beginning — and there is more to create,
            learn and discover.
          </p>

        </div>
      </section>


      {/* INVITATION */}
      <section className="border-t border-white/[.08] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16">

        <div className="mx-auto max-w-[1050px] rounded-[2rem] bg-[#F1EEE5] px-6 py-12 text-center text-[#07111F] sm:px-10 sm:py-14 lg:px-16 lg:py-16">

          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9A7D10]">
            Start somewhere
          </p>

          <h2 className="mx-auto mt-4 max-w-[650px] font-abril text-[2.25rem] leading-[1.08] tracking-[-.025em] sm:text-[2.8rem] lg:text-[3.2rem]">
            Have an idea worth exploring?
          </h2>

          <p className="mx-auto mt-5 max-w-[540px] text-[14px] leading-7 text-[#46505C] sm:text-[15px]">
            It doesn't need to be perfectly figured out. Bring us what you
            have, and let's discover what it could become.
          </p>

          <Link
            href="/contact"
            className="group mx-auto mt-8 inline-flex items-center gap-3 rounded-full bg-[#07111F] px-6 py-3.5 text-[12px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0D1D30]"
          >
            Start a conversation
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>


        {/* BOTTOM IDENTITY */}
        <div className="mx-auto mt-12 flex max-w-[1050px] flex-col items-center justify-center gap-4 text-center">

          <Link href="/" className="font-bebit text-3xl leading-none">
            <span className="text-[#EAC435]">T</span>
            <span className="text-[#03CEA4]">C</span>
            <span className="text-[#FB4D3D]">E</span>
          </Link>

          <p className="text-[9px] uppercase tracking-[.22em] text-[#66717F]">
            Explore Creativity. Build Innovation.
          </p>

        </div>

      </section>

    </main>
  );
}