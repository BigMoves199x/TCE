"use client";

import type {
  FormEvent,
  ReactNode,
} from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Building2,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

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

type FieldErrors = Partial<
  Record<keyof ProjectFormState, string[]>
>;

type ApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
  fields?: FieldErrors;
};

type SelectOption = {
  value: string;
  label: string;
};

/* =========================================================
   CONSTANTS
========================================================= */

const INITIAL_FORM: ProjectFormState = {
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

const PROJECT_TYPES: SelectOption[] = [
  {
    value: "BRANDING",
    label: "Branding and identity",
  },
  {
    value: "WEBSITE",
    label: "Website design and development",
  },
  {
    value: "SOFTWARE",
    label: "Software or digital product",
  },
  {
    value: "CREATIVE_PRODUCTION",
    label: "Creative production",
  },
  {
    value: "PRINTING",
    label: "Printing and merchandise",
  },
  {
    value: "PROJECT_MANAGEMENT",
    label: "Project management",
  },
  {
    value: "CONSULTING",
    label: "Business consulting",
  },
  {
    value: "MULTIDISCIPLINARY",
    label: "Multiple TCE services",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const BUDGET_OPTIONS: SelectOption[] = [
  {
    value: "UNDER_500K",
    label: "Under ₦500,000",
  },
  {
    value: "500K_1M",
    label: "₦500,000 – ₦1,000,000",
  },
  {
    value: "1M_3M",
    label: "₦1,000,000 – ₦3,000,000",
  },
  {
    value: "3M_5M",
    label: "₦3,000,000 – ₦5,000,000",
  },
  {
    value: "ABOVE_5M",
    label: "Above ₦5,000,000",
  },
  {
    value: "UNSURE",
    label: "Not sure yet",
  },
];

const TIMELINE_OPTIONS: SelectOption[] = [
  {
    value: "ASAP",
    label: "As soon as possible",
  },
  {
    value: "ONE_MONTH",
    label: "Within one month",
  },
  {
    value: "ONE_TO_THREE_MONTHS",
    label: "One to three months",
  },
  {
    value: "THREE_TO_SIX_MONTHS",
    label: "Three to six months",
  },
  {
    value: "FLEXIBLE",
    label: "Flexible",
  },
];

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_BASE =
  "min-h-12 w-full rounded-2xl border bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 disabled:cursor-not-allowed disabled:opacity-50";

const INPUT_NORMAL =
  "border-white/10 focus:border-[#03CEA4]/60";

const INPUT_ERROR =
  "border-[#FB4D3D]/60 focus:border-[#FB4D3D]";

/* =========================================================
   VALIDATION
========================================================= */

function validateProjectForm(
  form: ProjectFormState,
): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = [
      "Please enter your first name.",
    ];
  }

  if (!form.lastName.trim()) {
    errors.lastName = [
      "Please enter your last name.",
    ];
  }

  const email = form.email.trim();

  if (!email) {
    errors.email = [
      "Please enter your email address.",
    ];
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = [
      "Please enter a valid email address.",
    ];
  }

  if (!form.phone.trim()) {
    errors.phone = [
      "Please enter your phone number.",
    ];
  }

  if (!form.projectType) {
    errors.projectType = [
      "Please select a project type.",
    ];
  }

  if (!form.budget) {
    errors.budget = [
      "Please select an estimated budget.",
    ];
  }

  if (!form.timeline) {
    errors.timeline = [
      "Please select a preferred timeline.",
    ];
  }

  const description =
    form.description.trim();

  if (!description) {
    errors.description = [
      "Please tell us about your project.",
    ];
  } else if (description.length > 10000) {
    errors.description = [
      "Your project description is too long.",
    ];
  }

  return errors;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StartProjectForm() {
  const router = useRouter();

  const [form, setForm] =
    useState<ProjectFormState>(
      INITIAL_FORM,
    );

  const [
    fieldErrors,
    setFieldErrors,
  ] = useState<FieldErrors>({});

  const [
    formError,
    setFormError,
  ] = useState<string | null>(null);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  function updateField<
    K extends keyof ProjectFormState,
  >(
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
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setFormError(null);

    const errors =
      validateProjectForm(form);

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const fullName = [
        form.firstName.trim(),
        form.lastName.trim(),
      ]
        .filter(Boolean)
        .join(" ");

      const payload = {
        formType: "project" as const,
        name: fullName,
        email: form.email
          .trim()
          .toLowerCase(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        message:
          form.description.trim(),
        projectType:
          form.projectType,
        budget: form.budget,
        timeline: form.timeline,
        referralSource:
          form.referralSource.trim(),

        // Kept for compatibility with /api/contact.
        website: "",
        goals: "",
        services: form.projectType
          ? [form.projectType]
          : [],
      };

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

      const result =
        await readApiResponse(response);

      if (
        !response.ok ||
        !result.success
      ) {
        setFieldErrors(
          result.fields ?? {},
        );

        setFormError(
          result.message ??
            result.error ??
            "Your project enquiry could not be submitted. Please try again.",
        );

        return;
      }

      /*
       * The API has confirmed that the enquiry
       * was successfully sent.
       *
       * replace() prevents the browser Back button
       * from returning to a completed form state.
       */

      router.replace(
        "/contact/success",
      );
    } catch {
      setFormError(
        "We couldn't send your project enquiry. Please check your connection and try again.",
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
        <FormAlert>
          {formError}
        </FormAlert>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="First name"
          value={form.firstName}
          placeholder="First name"
          autoComplete="given-name"
          icon={
            <UserRound className="size-4" />
          }
          error={firstError(
            fieldErrors.firstName,
          )}
          disabled={isSubmitting}
          onChange={(value) =>
            updateField(
              "firstName",
              value,
            )
          }
        />

        <TextField
          label="Last name"
          value={form.lastName}
          placeholder="Last name"
          autoComplete="family-name"
          icon={
            <UserRound className="size-4" />
          }
          error={firstError(
            fieldErrors.lastName,
          )}
          disabled={isSubmitting}
          onChange={(value) =>
            updateField(
              "lastName",
              value,
            )
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
          icon={
            <Mail className="size-4" />
          }
          error={firstError(
            fieldErrors.email,
          )}
          disabled={isSubmitting}
          onChange={(value) =>
            updateField(
              "email",
              value,
            )
          }
        />

        <TextField
          label="Phone number"
          value={form.phone}
          placeholder="+234 800 000 0000"
          type="tel"
          autoComplete="tel"
          icon={
            <Phone className="size-4" />
          }
          error={firstError(
            fieldErrors.phone,
          )}
          disabled={isSubmitting}
          onChange={(value) =>
            updateField(
              "phone",
              value,
            )
          }
        />
      </div>

      <TextField
        label="Company or brand"
        value={form.company}
        placeholder="Optional"
        autoComplete="organization"
        icon={
          <Building2 className="size-4" />
        }
        error={firstError(
          fieldErrors.company,
        )}
        disabled={isSubmitting}
        onChange={(value) =>
          updateField(
            "company",
            value,
          )
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Project type"
          value={form.projectType}
          placeholder="Select a service"
          options={PROJECT_TYPES}
          error={firstError(
            fieldErrors.projectType,
          )}
          disabled={isSubmitting}
          onChange={(value) =>
            updateField(
              "projectType",
              value,
            )
          }
        />

        <SelectField
          label="Estimated budget"
          value={form.budget}
          placeholder="Select a range"
          options={BUDGET_OPTIONS}
          error={firstError(
            fieldErrors.budget,
          )}
          disabled={isSubmitting}
          onChange={(value) =>
            updateField(
              "budget",
              value,
            )
          }
        />
      </div>

      <SelectField
        label="Preferred timeline"
        value={form.timeline}
        placeholder="Choose a timeline"
        options={TIMELINE_OPTIONS}
        error={firstError(
          fieldErrors.timeline,
        )}
        disabled={isSubmitting}
        onChange={(value) =>
          updateField(
            "timeline",
            value,
          )
        }
      />

      <TextAreaField
        label="Tell us about the project"
        value={form.description}
        placeholder="What are you building? What problem should it solve? What would a successful outcome look like?"
        error={firstError(
          fieldErrors.description,
        )}
        disabled={isSubmitting}
        onChange={(value) =>
          updateField(
            "description",
            value,
          )
        }
      />

      <TextField
        label="How did you hear about TCE?"
        value={form.referralSource}
        placeholder="Instagram, referral, Google..."
        error={firstError(
          fieldErrors.referralSource,
        )}
        disabled={isSubmitting}
        onChange={(value) =>
          updateField(
            "referralSource",
            value,
          )
        }
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-6 text-sm font-semibold text-[#07111f] transition duration-300 hover:scale-[1.01] hover:brightness-110 disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending enquiry
          </>
        ) : (
          <>
            Submit project

            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}

/* =========================================================
   API RESPONSE
========================================================= */

async function readApiResponse(
  response: Response,
): Promise<ApiResponse> {
  const contentType =
    response.headers.get(
      "content-type",
    );

  if (
    !contentType?.includes(
      "application/json",
    )
  ) {
    return {
      success: false,
      error:
        "The server returned an unexpected response.",
    };
  }

  try {
    return (await response.json()) as ApiResponse;
  } catch {
    return {
      success: false,
      error:
        "The server returned an invalid response.",
    };
  }
}

/* =========================================================
   FORM ALERT
========================================================= */

function FormAlert({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-[#FB4D3D]/25 bg-[#FB4D3D]/10 px-4 py-3 text-sm leading-6 text-red-200"
    >
      {children}
    </div>
  );
}

/* =========================================================
   TEXT FIELD
========================================================= */

type TextFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  icon?: ReactNode;
  error?: string;
  disabled?: boolean;
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
  disabled = false,
  onChange,
}: TextFieldProps) {
  return (
    <FieldShell
      label={label}
      error={error}
    >
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={
            Boolean(error)
          }
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className={[
            INPUT_BASE,
            icon ? "pl-11" : "",
            error
              ? INPUT_ERROR
              : INPUT_NORMAL,
          ].join(" ")}
        />
      </div>
    </FieldShell>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

type SelectFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function SelectField({
  label,
  value,
  placeholder,
  options,
  error,
  disabled = false,
  onChange,
}: SelectFieldProps) {
  return (
    <FieldShell
      label={label}
      error={error}
    >
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          aria-invalid={
            Boolean(error)
          }
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className={[
            INPUT_BASE,
            "appearance-none bg-[#07111f] pr-11",
            error
              ? INPUT_ERROR
              : INPUT_NORMAL,
          ].join(" ")}
        >
          <option value="">
            {placeholder}
          </option>

          {options.map(
            ({
              value: optionValue,
              label: optionLabel,
            }) => (
              <option
                key={optionValue}
                value={optionValue}
              >
                {optionLabel}
              </option>
            ),
          )}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
      </div>
    </FieldShell>
  );
}

/* =========================================================
   TEXTAREA FIELD
========================================================= */

type TextAreaFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function TextAreaField({
  label,
  value,
  placeholder,
  error,
  disabled = false,
  onChange,
}: TextAreaFieldProps) {
  return (
    <FieldShell
      label={label}
      error={error}
      hideDefaultError
    >
      <textarea
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={6}
        maxLength={10000}
        aria-invalid={
          Boolean(error)
        }
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className={[
          INPUT_BASE,
          "resize-none leading-7",
          error
            ? INPUT_ERROR
            : INPUT_NORMAL,
        ].join(" ")}
      />

      <div className="mt-2 flex items-center justify-between gap-4">
        <span
          className={
            error
              ? "text-xs text-red-300"
              : "text-xs text-white/25"
          }
        >
          {error ??
            "Include as much relevant context as possible."}
        </span>

        <span className="shrink-0 text-xs text-white/25">
          {value.length.toLocaleString()} / 10,000
        </span>
      </div>
    </FieldShell>
  );
}

/* =========================================================
   FIELD SHELL
========================================================= */

type FieldShellProps = {
  label: string;
  error?: string;
  hideDefaultError?: boolean;
  children: ReactNode;
};

function FieldShell({
  label,
  error,
  hideDefaultError = false,
  children,
}: FieldShellProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/65">
        {label}
      </span>

      {children}

      {error &&
        !hideDefaultError && (
          <span className="mt-2 block text-xs text-red-300">
            {error}
          </span>
        )}
    </label>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function firstError(
  errors?: string[],
) {
  return errors?.[0];
}