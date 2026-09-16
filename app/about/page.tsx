import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MoveDown,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Our Story | The Creative Explorer",
  description:
    "The story behind The Creative Explorer — creativity, technology, entrepreneurship and the courage to keep exploring.",
};

const chapters = [
  {
    number: "01",
    eyebrow: "The beginning",
    title: "I never fit one box.",
    paragraphs: [
      `Creativity has never meant just one thing to me.`,
      `It can be a blank canvas waiting for its first stroke. A business idea written down at an unexpected moment. A website taking shape one line at a time. A problem that refuses to leave your mind until you find a way through it.`,
      `I became fascinated not only by creating things, but by turning ideas into experiences people could see, feel and use.`,
      `Art led to design. Design met technology. Technology opened another world of possibilities. Entrepreneurship challenged me to think beyond the idea itself and ask: How do I build something real from this?`,
      `And somewhere between all of those worlds, I found myself.`,
    ],
  },
  {
    number: "02",
    eyebrow: "The process",
    title: "Building while figuring it out.",
    paragraphs: [
      `The journey hasn't been a perfectly drawn line.`,
      `There have been ideas that worked and ideas that didn't. Moments of confidence followed by moments of uncertainty. Things I had to learn because I didn't know how to do them yet.`,
      `And plenty of times when the vision in my head was much further ahead than what I could actually build at that moment.`,
      `But I kept exploring.`,
      `Because I've learned that sometimes clarity doesn't come before you begin. Sometimes you have to create your way into it.`,
      `You make something. You learn. You improve it. You fail at something else. You discover another direction. And slowly, something that once existed only in your imagination begins to become real.`,
    ],
  },
  {
    number: "03",
    eyebrow: "The turning point",
    title: "Then came The Creative Explorer.",
    paragraphs: [
      `TCE grew from that journey.`,
      `The Creative Explorer wasn't created because I wanted everything I do to fit neatly beneath a company name.`,
      `It came from realizing that creativity, technology and entrepreneurship don't have to live in separate worlds. They can strengthen one another.`,
      `An artist can be an entrepreneur. A developer can be a creator. A business can be imaginative. And an idea can begin on a piece of paper and eventually become something much bigger than the person who first imagined it.`,
      `That's the world I want TCE to represent — a place where creativity meets possibility.`,
    ],
  },
  {
    number: "04",
    eyebrow: "The community",
    title: "For people like us.",
    paragraphs: [
      `And perhaps that's why you're here.`,
      `Maybe you're an artist trying to turn what you love into something sustainable. Maybe you're an entrepreneur carrying an idea that nobody else can quite see yet.`,
      `Maybe you're learning a new skill because the thing you want to create requires you to become someone you've never been before.`,
      `Maybe you have several interests and you've spent years wondering which one you're supposed to choose. Or maybe you're simply at the beginning.`,
      `I know that feeling.`,
      `TCE is for people who are willing to remain curious enough to find out what could happen if they keep going.`,
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#07111f] text-white">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col">
        <div className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-[#03CEA4]/10 blur-[170px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 size-[520px] rounded-full bg-[#FB4D3D]/10 blur-[180px]" />

        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>

          <Link
            href="/"
            className="font-bebit text-3xl leading-none"
          >
            <span className="text-[#EAC435]">T</span>
            <span className="text-[#03CEA4]">C</span>
            <span className="text-[#FB4D3D]">E</span>
          </Link>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-20 sm:px-10">
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#03CEA4]">
              <Sparkles className="size-4" />
              The story behind TCE
            </div>

            <h1 className="font-abril text-[clamp(4rem,10vw,9rem)] leading-[0.82] tracking-[-0.055em]">
              This isn't really
              <span className="block text-[#EAC435]">
                a company story.
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-xl leading-9 text-white/50 sm:text-2xl">
              It's a story about creating your way forward.
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center gap-3 px-6 pb-10 text-xs uppercase tracking-[0.25em] text-white/25 sm:px-10">
          <MoveDown className="size-4" />
          Read the story
        </div>
      </section>

      {/* INTRO */}
      <section className="border-y border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-28 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:py-40">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FB4D3D]">
            Before TCE
          </p>

          <div className="max-w-4xl">
            <p className="font-abril text-4xl leading-[1.12] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
              I've never been very good at fitting into
              <span className="text-[#03CEA4]"> one box.</span>
            </p>

            <div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-white/50 sm:text-lg">
              <p>
                I create. I build. I experiment. I learn. I change
                direction. Then sometimes, I start all over again.
              </p>

              <p>
                For a long time, I thought those different parts of me
                needed separate places.
              </p>

              <p>
                Eventually, I realized they were all connected by one
                thing:{" "}
                <strong className="font-medium text-white">
                  the desire to explore what an idea could become.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section>
        {chapters.map((chapter) => (
          <article
            key={chapter.number}
            className="border-b border-white/[0.07]"
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:py-40">
              <div>
                <span className="font-abril text-7xl text-white/[0.07]">
                  {chapter.number}
                </span>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#03CEA4]">
                  {chapter.eyebrow}
                </p>
              </div>

              <div className="max-w-3xl">
                <h2 className="font-abril text-4xl leading-tight tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                  {chapter.title}
                </h2>

                <div className="mt-10 space-y-6 text-base leading-8 text-white/50 sm:text-lg">
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* STILL EXPLORING */}
      <section className="relative">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EAC435]/5 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-36 text-center sm:px-10 lg:py-52">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#EAC435]">
            05 — We're still exploring
          </p>

          <h2 className="mt-8 font-abril text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Whatever you're building,
            <span className="block text-[#03CEA4]">
              keep exploring.
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-white/45">
            TCE is growing. And so am I. There are still ideas to
            build, mistakes to make, things to learn and places this
            journey hasn't taken us yet.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/45">
            The Creative Explorer isn't about arriving at a final
            destination. It's about having the courage to explore
            what comes next.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#03CEA4] px-7 text-sm font-semibold text-[#07111f] transition hover:scale-[1.02]"
            >
              Explore TCE
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/10 px-7 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Start a project
            </Link>
          </div>

          <div className="mt-24">
            <div className="font-bebit text-5xl">
              <span className="text-[#EAC435]">T</span>
              <span className="text-[#03CEA4]">C</span>
              <span className="text-[#FB4D3D]">E</span>
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/25">
              Explore Creativity. Build Innovation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}