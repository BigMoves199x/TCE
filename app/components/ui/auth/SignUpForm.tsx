"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SignUpFormProps = {
  callbackUrl?: string;
};

type SignUpFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type FieldErrors = Partial<
  Record<keyof SignUpFormState, string[]>
>;

type RegisterResponse = {
  success: boolean;
  error?: string;
  message?: string;
  fields?: FieldErrors;
};

const initialForm: SignUpFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm({
  callbackUrl = "/account",
}: SignUpFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<SignUpFormState>(initialForm);

  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors>({});

  const [formError, setFormError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  function updateField(
    field: keyof SignUpFormState,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setFormError(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setFormError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const result =
        (await response.json()) as RegisterResponse;

      if (!response.ok || !result.success) {
        setFieldErrors(result.fields ?? {});
        setFormError(
          result.error ??
            "Your account could not be created.",
        );

        return;
      }

      const signInResult = await signIn("credentials", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
        redirect: false,
      });

      if (!signInResult || signInResult.error) {
        router.replace(
          `/sign-in?registered=true&callbackUrl=${encodeURIComponent(
            callbackUrl,
          )}`,
        );

        return;
      }

      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("SIGN UP ERROR:", error);

      setFormError(
        "Something went wrong while creating your account.",
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
      {formError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-200"
        >
          {formError}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="First name"
          type="text"
          value={form.firstName}
          placeholder="First name"
          autoComplete="given-name"
          icon={<UserRound className="size-4" />}
          error={firstError(fieldErrors.firstName)}
          onChange={(value) =>
            updateField("firstName", value)
          }
        />

        <TextField
          label="Last name"
          type="text"
          value={form.lastName}
          placeholder="Last name"
          autoComplete="family-name"
          icon={<UserRound className="size-4" />}
          error={firstError(fieldErrors.lastName)}
          onChange={(value) =>
            updateField("lastName", value)
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Email address"
          type="email"
          value={form.email}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail className="size-4" />}
          error={firstError(fieldErrors.email)}
          onChange={(value) =>
            updateField("email", value)
          }
        />

        <TextField
          label="Phone number"
          type="tel"
          value={form.phone}
          placeholder="+234 800 000 0000"
          autoComplete="tel"
          icon={<Phone className="size-4" />}
          error={firstError(fieldErrors.phone)}
          onChange={(value) =>
            updateField("phone", value)
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <PasswordField
          label="Password"
          value={form.password}
          placeholder="Create password"
          visible={showPassword}
          error={firstError(fieldErrors.password)}
          onToggle={() =>
            setShowPassword((current) => !current)
          }
          onChange={(value) =>
            updateField("password", value)
          }
        />

        <PasswordField
          label="Confirm password"
          value={form.confirmPassword}
          placeholder="Repeat password"
          visible={showConfirmPassword}
          error={firstError(
            fieldErrors.confirmPassword,
          )}
          onToggle={() =>
            setShowConfirmPassword(
              (current) => !current,
            )
          }
          onChange={(value) =>
            updateField("confirmPassword", value)
          }
        />
      </div>

      <p className="text-xs leading-6 text-white/35">
        By creating an account, you agree to TCE&apos;s
        terms of service and privacy policy.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f] transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating account
          </>
        ) : (
          <>
            Create account
            <ArrowRight className="size-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-white/45">
        Already have an account?{" "}
        <Link
          href={`/sign-in?callbackUrl=${encodeURIComponent(
            callbackUrl,
          )}`}
          className="font-medium text-[#03CEA4] transition hover:text-[#77f5dc]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

type TextFieldProps = {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  icon: React.ReactNode;
  error?: string;
  onChange: (value: string) => void;
};

function TextField({
  label,
  type,
  value,
  placeholder,
  autoComplete,
  icon,
  error,
  onChange,
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/65">
        {label}
      </span>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClasses(Boolean(error))}
        />
      </div>

      {error && (
        <span className="mt-2 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

type PasswordFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  visible: boolean;
  error?: string;
  onToggle: () => void;
  onChange: (value: string) => void;
};

function PasswordField({
  label,
  value,
  placeholder,
  visible,
  error,
  onToggle,
  onChange,
}: PasswordFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/65">
        {label}
      </span>

      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          autoComplete="new-password"
          className={`${inputClasses(
            Boolean(error),
          )} pr-12`}
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
        >
          {visible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>

      {error && (
        <span className="mt-2 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

function inputClasses(hasError: boolean) {
  return [
    "min-h-13 w-full rounded-2xl border bg-white/[0.035] py-3 pl-11 pr-4 text-sm text-white outline-none transition",
    "placeholder:text-white/25",
    hasError
      ? "border-red-400/60 focus:border-red-400"
      : "border-white/10 focus:border-[#03CEA4]/60",
  ].join(" ");
}

function firstError(
  errors: string[] | undefined,
) {
  return errors?.[0];
}