"use client";

import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle, Send,} from "lucide-react";
import {FormEvent,useState,} from "react";

type FormStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export default function ContactSection() {
  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [feedback, setFeedback] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setFeedback("");

    const payload = {
      formType: "general",

      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to send your message.",
        );
      }

      setStatus("success");

      setFeedback(
        "Thank you. Your message has been sent.",
      );

      form.reset();
    } catch (error) {
      console.error(
        "CONTACT_FORM_ERROR:",
        error,
      );

      setStatus("error");

      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#07111f]"
    >
      {/* Ambient background */}

      <div className="pointer-events-none absolute -left-40 top-20 size-[30rem] rounded-full bg-[#03CEA4]/10 blur-[160px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-[#FB4D3D]/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* LEFT */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#03CEA4]">
              Contact
            </p>

            <h2 className="mt-6 max-w-2xl font-abril text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.05em] text-white">
              Something on

              <span className="block text-[#EAC435]">
                your mind?
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/45 sm:text-lg">
              Have a question, want to
              collaborate, curious about TCE,
              interested in an event, or just want
              to say hello? Start the conversation
              here.
            </p>

            <div className="mt-12 border-t border-white/[0.08] pt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                Have something bigger in mind?
              </p>

              <p className="mt-4 max-w-md text-xl leading-8 text-white/70">
                Working on a brand, website,
                business idea or creative project?
              </p>

              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#03CEA4]"
              >
                Start a project

                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Name + Email */}

              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                    Your name
                  </span>

                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    disabled={
                      status === "loading"
                    }
                    placeholder="Your name"
                    className="mt-4 w-full border-b border-white/10 bg-transparent py-4 text-base text-white outline-none transition placeholder:text-white/20 focus:border-[#03CEA4] disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                    Email
                  </span>

                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    disabled={
                      status === "loading"
                    }
                    placeholder="you@example.com"
                    className="mt-4 w-full border-b border-white/10 bg-transparent py-4 text-base text-white outline-none transition placeholder:text-white/20 focus:border-[#03CEA4] disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </label>
              </div>

              {/* Subject */}

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  I&apos;m reaching out about
                </span>

                <select
                  name="subject"
                  defaultValue=""
                  required
                  disabled={
                    status === "loading"
                  }
                  className="mt-4 w-full border-b border-white/10 bg-[#07111f] py-4 text-base text-white outline-none transition focus:border-[#03CEA4] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="General enquiry">
                    General enquiry
                  </option>

                  <option value="Collaboration">
                    Collaboration
                  </option>

                  <option value="TCE Shop">
                    TCE Shop
                  </option>

                  <option value="Events / Sip & Paint">
                    Events / Sip & Paint
                  </option>

                  <option value="Something else">
                    Something else
                  </option>
                </select>
              </label>

              {/* Message */}

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  Message
                </span>

                <textarea
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  disabled={
                    status === "loading"
                  }
                  placeholder="Tell me what you'd like to talk about..."
                  className="mt-4 w-full resize-none border-b border-white/10 bg-transparent py-4 text-base text-white outline-none transition placeholder:text-white/20 focus:border-[#03CEA4] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>

              {/* Footer */}

              <div className="flex flex-col gap-5 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-h-6">
                  {status === "idle" && (
                    <p className="max-w-sm text-xs leading-6 text-white/25">
                      Send your message and
                      I&apos;ll get back to you as
                      soon as possible.
                    </p>
                  )}

                  {status === "loading" && (
                    <p className="max-w-sm text-xs leading-6 text-white/35">
                      Sending your message...
                    </p>
                  )}

                  {status === "success" && (
                    <div className="flex max-w-sm items-center gap-2 text-xs leading-6 text-[#03CEA4]">
                      <Check className="size-4 shrink-0" />

                      <span>
                        {feedback}
                      </span>
                    </div>
                  )}

                  {status === "error" && (
                    <p className="max-w-sm text-xs leading-6 text-[#FB4D3D]">
                      {feedback}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    status === "loading"
                  }
                  className="group inline-flex min-h-14 min-w-[165px] items-center justify-center gap-3 rounded-full bg-[#03CEA4] px-8 text-sm font-semibold text-[#07111f] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {status === "loading" ? (
                    <>
                      Sending

                      <LoaderCircle className="size-4 animate-spin" />
                    </>
                  ) : status ===
                    "success" ? (
                    <>
                      Message sent

                      <Check className="size-4" />
                    </>
                  ) : (
                    <>
                      Send message

                      <Send className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}