"use client";

import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";

type ProjectFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  referralSource: string;
};

type ProjectFieldErrors = Partial<
  Record<keyof ProjectFormState, string[]>
>;

type ProjectResponse = {
  success: boolean;
  message?: string;
  error?: string;
  fields?: ProjectFieldErrors;
};

const initialForm: ProjectFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
  referralSource: "",
};

export default function StartProjectForm() {
  const [form, setForm] =
    useState<ProjectFormState>(initialForm);

  const [fieldErrors, setFieldErrors] =
    useState<ProjectFieldErrors>({});

  const [formError, setFormError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  function updateField<K extends keyof ProjectFormState>(
    field: K,
    value: ProjectFormState[K],
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
    setSuccessMessage(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          projectType: form.projectType,
          budget: form.budget,
          timeline: form.timeline,
          description: form.description.trim(),
          referralSource: form.referralSource.trim(),
        }),
      });

      const contentType =
        response.headers.get("content-type");

      const result: ProjectResponse =
        contentType?.includes("application/json")
          ? await response.json()
          : {
              success: false,
              error:
                "The project service returned an unexpected response.",
            };

      if (!response.ok || !result.success) {
        setFieldErrors(result.fields ?? {});
        setFormError(
          result.error ??
            "Your project enquiry could not be submitted.",
        );
        return;
      }

      setSuccessMessage(
        result.message ??
          "Your project enquiry has been received.",
      );

      setForm(initialForm);
    } catch (error) {
      console.error("START PROJECT ERROR:", error);

      setFormError(
        "Something went wrong while sending your project enquiry.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {formError && (
        <div
          role="alert"
          className="rounded-2xl border border-[#FB4D3D]/25 bg-[#FB4D3D]/10 px-4 py-3 text-sm leading-6 text-red-200"
        >
          {formError}
        </div>
      )}

      {successMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#03CEA4]/25 bg-[#03CEA4]/10 px-4 py-3 text-sm text-[#8ff8e3]">
          <Check className="mt-0.5 size-4 shrink-0" />
          <p>{successMessage}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="First name"
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
          value={form.email}
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          icon={<Mail className="size-4" />}
          error={firstError(fieldErrors.email)}
          onChange={(value) =>
            updateField("email", value)
          }
        />

        <TextField
          label="Phone number"
          value={form.phone}
          placeholder="+234 800 000 0000"
          type="tel"
          autoComplete="tel"
          icon={<Phone className="size-4" />}
          error={firstError(fieldErrors.phone)}
          onChange={(value) =>
            updateField("phone", value)
          }
        />
      </div>

      <TextField
        label="Company or brand"
        value={form.company}
        placeholder="Optional"
        autoComplete="organization"
        icon={<Building2 className="size-4" />}
        error={firstError(fieldErrors.company)}
        onChange={(value) =>
          updateField("company", value)
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Project type"
          value={form.projectType}
          error={firstError(fieldErrors.projectType)}
          onChange={(value) =>
            updateField("projectType", value)
          }
        >
          <option value="">Select a service</option>
          <option value="BRANDING">
            Branding and identity
          </option>
          <option value="WEBSITE">
            Website design and development
          </option>
          <option value="SOFTWARE">
            Software or digital product
          </option>
          <option value="CREATIVE_PRODUCTION">
            Creative production
          </option>
          <option value="PRINTING">
            Printing and merchandise
          </option>
          <option value="PROJECT_MANAGEMENT">
            Project management
          </option>
          <option value="CONSULTING">
            Business consulting
          </option>
          <option value="MULTIDISCIPLINARY">
            Multiple TCE services
          </option>
          <option value="OTHER">Other</option>
        </SelectField>

        <SelectField
          label="Estimated budget"
          value={form.budget}
          error={firstError(fieldErrors.budget)}
          onChange={(value) =>
            updateField("budget", value)
          }
        >
          <option value="">Select a range</option>
          <option value="UNDER_500K">
            Under ₦500,000
          </option>
          <option value="500K_1M">
            ₦500,000 – ₦1,000,000
          </option>
          <option value="1M_3M">
            ₦1,000,000 – ₦3,000,000
          </option>
          <option value="3M_5M">
            ₦3,000,000 – ₦5,000,000
          </option>
          <option value="ABOVE_5M">
            Above ₦5,000,000
          </option>
          <option value="UNSURE">
            Not sure yet
          </option>
        </SelectField>
      </div>

      <SelectField
        label="Preferred timeline"
        value={form.timeline}
        error={firstError(fieldErrors.timeline)}
        onChange={(value) =>
          updateField("timeline", value)
        }
      >
        <option value="">Choose a timeline</option>
        <option value="ASAP">As soon as possible</option>
        <option value="ONE_MONTH">Within one month</option>
        <option value="ONE_TO_THREE_MONTHS">
          One to three months
        </option>
        <option value="THREE_TO_SIX_MONTHS">
          Three to six months
        </option>
        <option value="FLEXIBLE">Flexible</option>
      </SelectField>

      <TextAreaField
        label="Tell us about the project"
        value={form.description}
        placeholder="What are you building? What problem should it solve? What would a successful outcome look like?"
        error={firstError(fieldErrors.description)}
        onChange={(value) =>
          updateField("description", value)
        }
      />

      <TextField
        label="How did you hear about TCE?"
        value={form.referralSource}
        placeholder="Instagram, referral, Google..."
        error={firstError(fieldErrors.referralSource)}
        onChange={(value) =>
          updateField("referralSource", value)
        }
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f] transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending enquiry
          </>
        ) : (
          <>
            Submit project
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  icon?: React.ReactNode;
  error?: string;
  onChange: (value: string) => void;
};

function TextField({
  label,
  value,
  placeholder,
  type = "text",
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
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={[
            "min-h-12 w-full rounded-2xl border bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25",
            icon ? "pl-11" : "",
            error
              ? "border-[#FB4D3D]/60 focus:border-[#FB4D3D]"
              : "border-white/10 focus:border-[#03CEA4]/60",
          ].join(" ")}
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

type SelectFieldProps = {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

function SelectField({
  label,
  value,
  error,
  onChange,
  children,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/65">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`min-h-12 w-full appearance-none rounded-2xl border bg-[#07111f] px-4 pr-11 text-sm text-white outline-none transition ${
            error
              ? "border-[#FB4D3D]/60"
              : "border-white/10 focus:border-[#03CEA4]/60"
          }`}
        >
          {children}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
      </div>

      {error && (
        <span className="mt-2 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
};

function TextAreaField({
  label,
  value,
  placeholder,
  error,
  onChange,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/65">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={6}
        className={`w-full resize-none rounded-2xl border bg-white/[0.035] px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 ${
          error
            ? "border-[#FB4D3D]/60 focus:border-[#FB4D3D]"
            : "border-white/10 focus:border-[#03CEA4]/60"
        }`}
      />

      <div className="mt-2 flex items-center justify-between gap-4">
        {error ? (
          <span className="text-xs text-red-300">
            {error}
          </span>
        ) : (
          <span className="text-xs text-white/25">
            Include as much relevant context as possible.
          </span>
        )}

        <span className="text-xs text-white/25">
          {value.length} characters
        </span>
      </div>
    </label>
  );
}

function firstError(
  errors: string[] | undefined,
) {
  return errors?.[0];
}