"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SignInFormProps = {
  callbackUrl?: string;
  registered?: boolean;
};

type SignInFormState = {
  email: string;
  password: string;
};

const initialForm: SignInFormState = {
  email: "",
  password: "",
};

export default function SignInForm({
  callbackUrl = "/account",
  registered = false,
}: SignInFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<SignInFormState>(initialForm);

  const [error, setError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
        redirect: false,
      });

      if (!result || result.error) {
        setError(
          "The email address or password is incorrect.",
        );
        return;
      }

      router.replace(callbackUrl);
      router.refresh();
    } catch (signInError) {
      console.error("SIGN IN ERROR:", signInError);

      setError(
        "Unable to sign you in right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {registered && (
        <div className="rounded-2xl border border-[#03CEA4]/20 bg-[#03CEA4]/10 px-4 py-3 text-sm leading-6 text-[#77f5dc]">
          Your account was created successfully. Sign in to continue.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-200"
        >
          {error}
        </div>
      )}

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-white/70">
          Email address
        </span>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />

          <input
            type="email"
            value={form.email}
            onChange={(event) => {
              setForm((current) => ({
                ...current,
                email: event.target.value,
              }));

              setError(null);
            }}
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="min-h-13 w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#03CEA4]/60"
          />
        </div>
      </label>

      <label className="block">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-white/70">
            Password
          </span>

          <Link
            href="/forgot-password"
            className="text-xs text-white/35 transition hover:text-[#03CEA4]"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />

          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(event) => {
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }));

              setError(null);
            }}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="min-h-13 w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#03CEA4]/60"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((current) => !current)
            }
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f] transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="size-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-white/45">
        New to TCE?{" "}
        <Link
          href={`/sign-up?callbackUrl=${encodeURIComponent(
            callbackUrl,
          )}`}
          className="font-medium text-[#03CEA4] transition hover:text-[#77f5dc]"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}