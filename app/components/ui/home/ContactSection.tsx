"use client";

import Link from "next/link";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  LoaderCircle,
  Send,
} from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-word]",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: undefined,
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to send your message.",
        );
      }

      setStatus("success");
      setFeedback("Thank you. Your message has been sent.");
      form.reset();
    } catch (error) {
      console.error("CONTACT_FORM_ERROR:", error);

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
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-[#07111F] text-white"
    >

      {/* TOP INTRO */}
      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32 md:px-12 lg:px-16 lg:pb-28 lg:pt-40">

        {/* SMALL LABEL */}
        <div className="flex items-center justify-between border-b border-white/[.08] pb-5">
          <p className="text-[9px] font-bold uppercase tracking-[.25em] text-[#03CEA4] sm:text-[10px]">
            Contact / TCE
          </p>

          <p className="hidden text-[9px] font-medium uppercase tracking-[.2em] text-white/25 sm:block">
            Conversation starts here
          </p>
        </div>


        {/* BIG STATEMENT */}
        <div className="mt-14 sm:mt-16 lg:mt-20">

          <div className="overflow-hidden">
            <h2
              data-contact-word
              className="font-abril text-[clamp(4.7rem,15vw,11rem)] font-black leading-[.72] tracking-[-.065em] text-white"
            >
              SAY
            </h2>
          </div>

          <div className="overflow-hidden pb-4">
            <h2
              data-contact-word
              className="font-abril text-[clamp(4.7rem,15vw,11rem)] font-black leading-[.78] tracking-[-.065em] text-[#EAC435]"
            >
              HELLO.
            </h2>
          </div>

        </div>


        {/* INTRO COPY */}
        <div className="mt-8 max-w-[590px] sm:ml-auto sm:mt-10">

          <p className="text-[15px] font-medium leading-7 text-[#A8B1BD] sm:text-base sm:leading-8">
            A question, collaboration, event, idea — or simply
            something worth sharing. You don&apos;t need a perfect
            reason to start a conversation.
          </p>

          <a
            href="#contact-form"
            className="mt-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-[#03CEA4]"
          >
            Write to us
            <ArrowDown className="size-3.5" />
          </a>

        </div>

      </div>


      {/* COLOR INTERRUPTION */}
      <div className="h-2 w-full sm:h-2.5">
        <div className="flex h-full">
          <span className="h-full flex-1 bg-[#EAC435]" />
          <span className="h-full flex-1 bg-[#03CEA4]" />
          <span className="h-full flex-1 bg-[#FB4D3D]" />
          <span className="h-full flex-1 bg-[#CA1551]" />
        </div>
      </div>


      {/* FORM */}
      <div
        id="contact-form"
        className="scroll-mt-10 bg-[#F2EEE3] text-[#07111F]"
      >
        <div className="mx-auto w-full max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16 lg:py-32">

          {/* FORM HEADING */}
          <div className="mx-auto max-w-[650px] text-center">

            <p className="text-[9px] font-bold uppercase tracking-[.25em] text-[#CA1551] sm:text-[10px]">
              Your turn
            </p>

            <h3 className="mt-4 font-abril text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1] tracking-[-.035em]">
              What&apos;s on your mind?
            </h3>

            <p className="mx-auto mt-5 max-w-[480px] text-[14px] leading-7 text-[#07111F]/55 sm:text-[15px]">
              Leave us a note below. Keep it short, tell the whole
              story, or simply say hello.
            </p>

          </div>


          {/* FORM BODY */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-14 max-w-[760px] sm:mt-16"
          >

            {/* NAME */}
            <ContactField number="01" label="Your name">
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                disabled={status === "loading"}
                placeholder="What should we call you?"
                className="mt-4 w-full bg-transparent pb-3 text-[17px] font-medium text-[#07111F] outline-none placeholder:text-[#07111F]/25 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
              />
            </ContactField>


            {/* EMAIL */}
            <ContactField number="02" label="Your email">
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                disabled={status === "loading"}
                placeholder="you@example.com"
                className="mt-4 w-full bg-transparent pb-3 text-[17px] font-medium text-[#07111F] outline-none placeholder:text-[#07111F]/25 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
              />
            </ContactField>


            {/* SUBJECT */}
            <ContactField number="03" label="What brings you here?">
              <select
                name="subject"
                defaultValue=""
                required
                disabled={status === "loading"}
                className="mt-4 w-full cursor-pointer bg-[#F2EEE3] pb-3 text-[17px] font-medium text-[#07111F] outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
              >
                <option value="" disabled>
                  Choose one
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
            </ContactField>


            {/* MESSAGE */}
            <ContactField number="04" label="Tell us">
              <textarea
                name="message"
                required
                rows={4}
                maxLength={5000}
                disabled={status === "loading"}
                placeholder="Write your message here..."
                className="mt-4 w-full resize-none bg-transparent pb-3 text-[17px] font-medium leading-8 text-[#07111F] outline-none placeholder:text-[#07111F]/25 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
              />
            </ContactField>


            {/* SUBMIT AREA */}
            <div className="mt-10 sm:mt-12">

              <button
                type="submit"
                disabled={status === "loading"}
                className="group flex min-h-16 w-full items-center justify-between rounded-full bg-[#07111F] px-7 text-white transition-all duration-300 hover:bg-[#FB4D3D] disabled:cursor-not-allowed disabled:opacity-60 sm:px-9"
              >
                <span className="text-[10px] font-bold uppercase tracking-[.2em] sm:text-[11px]">
                  {status === "loading"
                    ? "Sending"
                    : status === "success"
                      ? "Message sent"
                      : "Send your message"}
                </span>

                {status === "loading" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : status === "success" ? (
                  <Check className="size-4" />
                ) : (
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>


              {/* STATUS */}
              <div className="min-h-8 pt-4 text-center">

                {status === "idle" && (
                  <p className="text-[10px] leading-5 text-[#07111F]/35">
                    We&apos;ll get back to you as soon as we can.
                  </p>
                )}

                {status === "loading" && (
                  <p className="text-[10px] leading-5 text-[#07111F]/40">
                    Sending your message...
                  </p>
                )}

                {status === "success" && (
                  <p className="text-[10px] font-semibold leading-5 text-[#087A67]">
                    {feedback}
                  </p>
                )}

                {status === "error" && (
                  <p className="text-[10px] font-semibold leading-5 text-[#C7372C]">
                    {feedback}
                  </p>
                )}

              </div>

            </div>

          </form>

        </div>
      </div>


      {/* PROJECT BRIDGE */}
      <div className="relative overflow-hidden bg-[#EAC435] text-[#07111F]">

        {/* ABSTRACT CIRCLE */}
        <div className="pointer-events-none absolute -right-20 -top-28 size-[300px] rounded-full border border-[#07111F]/10 sm:size-[420px]" />

        <div className="pointer-events-none absolute -right-5 top-10 size-[150px] rounded-full border border-[#07111F]/10 sm:size-[220px]" />


        <div className="relative mx-auto w-full max-w-[1500px] px-5 py-20 text-center sm:px-8 sm:py-24 md:px-12 lg:px-16">

          <p className="text-[9px] font-bold uppercase tracking-[.25em] text-[#07111F]/50 sm:text-[10px]">
            Something bigger?
          </p>

          <h3 className="mx-auto mt-5 max-w-[850px] font-abril text-[clamp(2.7rem,6vw,5rem)] font-black leading-[.96] tracking-[-.04em]">
            Have an idea you want
            <span className="block">
              to build?
            </span>
          </h3>

          <p className="mx-auto mt-6 max-w-[520px] text-[14px] font-medium leading-7 text-[#07111F]/60 sm:text-[15px]">
            If you&apos;re thinking about a brand, website, business
            idea or creative project, there&apos;s a better place to
            start.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#07111F] px-8 text-[9px] font-bold uppercase tracking-[.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#FB4D3D]"
          >
            Start a project

            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

        </div>

      </div>

    </section>
  );
}


function ContactField({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block border-t border-[#07111F]/15 py-7 sm:py-8">

      <div className="flex items-center gap-4">

        <span className="text-[9px] font-bold tracking-[.16em] text-[#CA1551]">
          {number}
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[.22em] text-[#07111F]/45">
          {label}
        </span>

      </div>

      {children}

    </label>
  );
}