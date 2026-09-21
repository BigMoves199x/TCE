"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, ChevronDown, Loader2, Mail, Phone, UserRound } from "lucide-react";

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

type FieldErrors = Partial<Record<keyof ProjectFormState, string[]>>;
type ApiResponse = { success: boolean; message?: string; error?: string; fields?: FieldErrors };
type SelectOption = { value: string; label: string };

const INITIAL_FORM: ProjectFormState = {
  firstName: "", lastName: "", email: "", phone: "", company: "",
  projectType: "", budget: "", timeline: "", description: "", referralSource: "",
};

const PROJECT_TYPES: SelectOption[] = [
  { value: "BRANDING", label: "Branding & identity" },
  { value: "WEBSITE", label: "Website design & development" },
  { value: "SOFTWARE", label: "Software or digital product" },
  { value: "CREATIVE_PRODUCTION", label: "Creative production" },
  { value: "PRINTING", label: "Printing & merchandise" },
  { value: "PROJECT_MANAGEMENT", label: "Project management" },
  { value: "CONSULTING", label: "Business consulting" },
  { value: "MULTIDISCIPLINARY", label: "Multiple TCE services" },
  { value: "OTHER", label: "Something else" },
];

const BUDGET_OPTIONS: SelectOption[] = [
  { value: "UNDER_500K", label: "Under ₦500,000" },
  { value: "500K_1M", label: "₦500,000 – ₦1,000,000" },
  { value: "1M_3M", label: "₦1,000,000 – ₦3,000,000" },
  { value: "3M_5M", label: "₦3,000,000 – ₦5,000,000" },
  { value: "ABOVE_5M", label: "Above ₦5,000,000" },
  { value: "UNSURE", label: "Not sure yet" },
];

const TIMELINE_OPTIONS: SelectOption[] = [
  { value: "ASAP", label: "As soon as possible" },
  { value: "ONE_MONTH", label: "Within one month" },
  { value: "ONE_TO_THREE_MONTHS", label: "1 – 3 months" },
  { value: "THREE_TO_SIX_MONTHS", label: "3 – 6 months" },
  { value: "FLEXIBLE", label: "I'm flexible" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INPUT = "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-200 placeholder:text-white/35 hover:border-white/25 focus:border-[#03CEA4] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#03CEA4]/10 disabled:cursor-not-allowed disabled:opacity-50";
const ERROR_INPUT = "border-[#FB4D3D]/70 focus:border-[#FB4D3D] focus:ring-[#FB4D3D]/10";

function validateProjectForm(form: ProjectFormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.firstName.trim()) errors.firstName = ["Please enter your first name."];
  if (!form.lastName.trim()) errors.lastName = ["Please enter your last name."];

  const email = form.email.trim();
  if (!email) errors.email = ["Please enter your email address."];
  else if (!EMAIL_PATTERN.test(email)) errors.email = ["Please enter a valid email address."];

  if (!form.phone.trim()) errors.phone = ["Please enter your phone number."];
  if (!form.projectType) errors.projectType = ["Please select a project type."];
  if (!form.budget) errors.budget = ["Please select an estimated budget."];
  if (!form.timeline) errors.timeline = ["Please select a preferred timeline."];

  const description = form.description.trim();
  if (!description) errors.description = ["Please tell us about your project."];
  else if (description.length > 10000) errors.description = ["Your project description is too long."];

  return errors;
}

export default function StartProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ProjectFormState>(field: K, value: ProjectFormState[K]) {
    setForm(current => ({ ...current, [field]: value }));
    setFieldErrors(current => ({ ...current, [field]: undefined }));
    setFormError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const errors = validateProjectForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setIsSubmitting(true);

    try {
      const payload = {
        formType: "project" as const,
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        message: form.description.trim(),
        projectType: form.projectType,
        budget: form.budget,
        timeline: form.timeline,
        referralSource: form.referralSource.trim(),
        website: "",
        goals: "",
        services: form.projectType ? [form.projectType] : [],
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await readApiResponse(response);

      if (!response.ok || !result.success) {
        setFieldErrors(result.fields ?? {});
        setFormError(result.message ?? result.error ?? "Your project enquiry could not be submitted. Please try again.");
        return;
      }

      router.replace("/contact/success");
    } catch {
      setFormError("We couldn't send your project enquiry. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const error = (field: keyof ProjectFormState) => fieldErrors[field]?.[0];

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      {formError && <FormAlert>{formError}</FormAlert>}

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
        <TextField label="First name" required value={form.firstName} placeholder="Your first name" autoComplete="given-name" icon={<UserRound />} error={error("firstName")} disabled={isSubmitting} onChange={v => updateField("firstName", v)} />
        <TextField label="Last name" required value={form.lastName} placeholder="Your last name" autoComplete="family-name" icon={<UserRound />} error={error("lastName")} disabled={isSubmitting} onChange={v => updateField("lastName", v)} />

        <TextField label="Email address" required type="email" value={form.email} placeholder="you@example.com" autoComplete="email" icon={<Mail />} error={error("email")} disabled={isSubmitting} onChange={v => updateField("email", v)} />
        <TextField label="Phone number" required type="tel" value={form.phone} placeholder="+234 800 000 0000" autoComplete="tel" icon={<Phone />} error={error("phone")} disabled={isSubmitting} onChange={v => updateField("phone", v)} />

        <div className="sm:col-span-2">
          <TextField label="Company or brand" optional value={form.company} placeholder="Your company or brand name" autoComplete="organization" icon={<Building2 />} error={error("company")} disabled={isSubmitting} onChange={v => updateField("company", v)} />
        </div>

        <SelectField label="What are we building?" required value={form.projectType} placeholder="Choose a project type" options={PROJECT_TYPES} error={error("projectType")} disabled={isSubmitting} onChange={v => updateField("projectType", v)} />
        <SelectField label="Estimated budget" required value={form.budget} placeholder="Choose a budget range" options={BUDGET_OPTIONS} error={error("budget")} disabled={isSubmitting} onChange={v => updateField("budget", v)} />

        <SelectField label="Preferred timeline" required value={form.timeline} placeholder="When would you like to start?" options={TIMELINE_OPTIONS} error={error("timeline")} disabled={isSubmitting} onChange={v => updateField("timeline", v)} />

        <TextField label="How did you find TCE?" optional value={form.referralSource} placeholder="Instagram, Google, referral..." error={error("referralSource")} disabled={isSubmitting} onChange={v => updateField("referralSource", v)} />

        <div className="sm:col-span-2">
          <TextAreaField label="Tell us about your idea" required value={form.description} placeholder="What are you hoping to create? Tell us about the idea, the problem you're solving, and what a successful outcome looks like." error={error("description")} disabled={isSubmitting} onChange={v => updateField("description", v)} />
        </div>
      </div>

      <div className="mt-7 border-t border-white/10 pt-6 sm:mt-8">
        <p className="mb-5 max-w-xl text-xs leading-5 text-white/45">Your idea doesn't need to be perfectly figured out. Give us what you have, and we'll explore the possibilities with you.</p>

        <button type="submit" disabled={isSubmitting} className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#03CEA4] px-7 text-sm font-bold text-[#07111F] transition-all duration-300 hover:bg-[#18ddb6] focus:outline-none focus:ring-4 focus:ring-[#03CEA4]/25 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-[220px]">
          {isSubmitting ? <><Loader2 className="size-4 animate-spin" />Sending enquiry...</> : <>Start the conversation<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" /></>}
        </button>
      </div>
    </form>
  );
}

async function readApiResponse(response: Response): Promise<ApiResponse> {
  if (!response.headers.get("content-type")?.includes("application/json")) return { success: false, error: "The server returned an unexpected response." };
  try { return (await response.json()) as ApiResponse; }
  catch { return { success: false, error: "The server returned an invalid response." }; }
}

function FormAlert({ children }: { children: ReactNode }) {
  return <div role="alert" className="mb-6 rounded-xl border border-[#FB4D3D]/35 bg-[#FB4D3D]/10 px-4 py-3 text-sm leading-6 text-red-100">{children}</div>;
}

type BaseFieldProps = { label: string; required?: boolean; optional?: boolean; error?: string; disabled?: boolean };
type TextFieldProps = BaseFieldProps & { value: string; placeholder: string; type?: string; autoComplete?: string; icon?: ReactNode; onChange: (value: string) => void };

function TextField({ label, required, optional, value, placeholder, type = "text", autoComplete, icon, error, disabled, onChange }: TextFieldProps) {
  return (
    <Field label={label} required={required} optional={optional} error={error}>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45 [&>svg]:size-4">{icon}</span>}
        <input type={type} value={value} placeholder={placeholder} autoComplete={autoComplete} disabled={disabled} aria-invalid={!!error} onChange={e => onChange(e.target.value)} className={`${INPUT} ${icon ? "pl-11" : ""} ${error ? ERROR_INPUT : ""}`} />
      </div>
    </Field>
  );
}

type SelectFieldProps = BaseFieldProps & { value: string; placeholder: string; options: SelectOption[]; onChange: (value: string) => void };

function SelectField({ label, required, optional, value, placeholder, options, error, disabled, onChange }: SelectFieldProps) {
  return (
    <Field label={label} required={required} optional={optional} error={error}>
      <div className="relative">
        <select value={value} disabled={disabled} aria-invalid={!!error} onChange={e => onChange(e.target.value)} className={`${INPUT} appearance-none bg-[#0C1725] pr-11 ${!value ? "text-white/40" : ""} ${error ? ERROR_INPUT : ""}`}>
          <option value="">{placeholder}</option>
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/50" />
      </div>
    </Field>
  );
}

type TextAreaProps = BaseFieldProps & { value: string; placeholder: string; onChange: (value: string) => void };

function TextAreaField({ label, required, value, placeholder, error, disabled, onChange }: TextAreaProps) {
  return (
    <Field label={label} required={required}>
      <textarea value={value} placeholder={placeholder} disabled={disabled} rows={6} maxLength={10000} aria-invalid={!!error} onChange={e => onChange(e.target.value)} className={`${INPUT} min-h-[160px] resize-y leading-7 ${error ? ERROR_INPUT : ""}`} />
      <div className="mt-2 flex items-start justify-between gap-4">
        <span className={`text-xs leading-5 ${error ? "text-red-300" : "text-white/35"}`}>{error ?? "A rough idea is completely fine — we'll help you shape the next step."}</span>
        <span className="shrink-0 text-xs tabular-nums text-white/30">{value.length.toLocaleString()} / 10,000</span>
      </div>
    </Field>
  );
}

function Field({ label, required, optional, error, children }: BaseFieldProps & { children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-[#03CEA4]" aria-hidden="true">*</span>}
        {optional && <span className="text-[11px] font-normal text-white/35">Optional</span>}
      </span>
      {children}
      {error && <span className="mt-2 block text-xs leading-5 text-red-300">{error}</span>}
    </label>
  );
}