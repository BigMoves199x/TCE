"use client";

import {
  Building2,
  Check,
  Home,
  Loader2,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";

export type AddressFormValues = {
  label: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
};

type AddressFieldErrors = Partial<
  Record<keyof AddressFormValues, string[]>
>;

type AddressResponse = {
  success: boolean;
  message?: string;
  error?: string;
  fields?: AddressFieldErrors;
  address?: {
    id: string;
  };
};

type AddressFormProps = {
  initialValues?: Partial<AddressFormValues>;
  addressId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const defaultValues: AddressFormValues = {
  label: "Home",
  firstName: "",
  lastName: "",
  phone: "",
  country: "Nigeria",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  isDefault: false,
};

export default function AddressForm({
  initialValues,
  addressId,
  onSuccess,
  onCancel,
}: AddressFormProps) {
  const [form, setForm] =
    useState<AddressFormValues>({
      ...defaultValues,
      ...initialValues,
    });

  const [fieldErrors, setFieldErrors] =
    useState<AddressFieldErrors>({});

  const [formError, setFormError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const isEditing = Boolean(addressId);

  function updateField<K extends keyof AddressFormValues>(
    field: K,
    value: AddressFormValues[K],
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
      const endpoint = isEditing
        ? `/api/account/addresses/${addressId}`
        : "/api/account/addresses";

      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: form.label.trim(),
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          country: form.country.trim(),
          address1: form.address1.trim(),
          address2: form.address2.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          postalCode: form.postalCode.trim(),
          isDefault: form.isDefault,
        }),
      });

      const result =
        (await response.json()) as AddressResponse;

      if (!response.ok || !result.success) {
        setFieldErrors(result.fields ?? {});
        setFormError(
          result.error ??
            "Unable to save this address.",
        );
        return;
      }

      setSuccessMessage(
        result.message ??
          (isEditing
            ? "Address updated successfully."
            : "Address saved successfully."),
      );

      if (!isEditing) {
        setForm(defaultValues);
      }

      onSuccess?.();
    } catch (error) {
      console.error("SAVE ADDRESS ERROR:", error);

      setFormError(
        "Something went wrong while saving your address.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-7"
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

      <section>
        <SectionHeading
          eyebrow="Address type"
          title="How should we identify this address?"
        />

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <AddressLabelButton
            label="Home"
            icon={<Home className="size-4" />}
            selected={form.label === "Home"}
            onClick={() =>
              updateField("label", "Home")
            }
          />

          <AddressLabelButton
            label="Office"
            icon={<Building2 className="size-4" />}
            selected={form.label === "Office"}
            onClick={() =>
              updateField("label", "Office")
            }
          />

          <AddressLabelButton
            label="Other"
            icon={<MapPin className="size-4" />}
            selected={
              form.label !== "Home" &&
              form.label !== "Office"
            }
            onClick={() =>
              updateField("label", "Other")
            }
          />
        </div>

        {form.label !== "Home" &&
          form.label !== "Office" && (
            <div className="mt-4">
              <TextField
                label="Custom label"
                value={form.label}
                placeholder="Mother's house"
                error={firstError(
                  fieldErrors.label,
                )}
                onChange={(value) =>
                  updateField("label", value)
                }
              />
            </div>
          )}
      </section>

      <div className="h-px bg-white/[0.08]" />

      <section>
        <SectionHeading
          eyebrow="Recipient"
          title="Who is receiving this delivery?"
        />

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextField
            label="First name"
            value={form.firstName}
            placeholder="First name"
            autoComplete="given-name"
            icon={<UserRound className="size-4" />}
            error={firstError(
              fieldErrors.firstName,
            )}
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
            error={firstError(
              fieldErrors.lastName,
            )}
            onChange={(value) =>
              updateField("lastName", value)
            }
          />
        </div>

        <div className="mt-5">
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
      </section>

      <div className="h-px bg-white/[0.08]" />

      <section>
        <SectionHeading
          eyebrow="Delivery location"
          title="Where should we send the order?"
        />

        <div className="mt-5">
          <SelectField
            label="Country"
            value={form.country}
            error={firstError(
              fieldErrors.country,
            )}
            onChange={(value) =>
              updateField("country", value)
            }
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="United States">
              United States
            </option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">
              United Kingdom
            </option>
          </SelectField>
        </div>

        <div className="mt-5">
          <TextField
            label="Street address"
            value={form.address1}
            placeholder="House number and street name"
            autoComplete="address-line1"
            icon={<MapPin className="size-4" />}
            error={firstError(
              fieldErrors.address1,
            )}
            onChange={(value) =>
              updateField("address1", value)
            }
          />
        </div>

        <div className="mt-5">
          <TextField
            label="Apartment, suite or landmark"
            value={form.address2}
            placeholder="Optional"
            autoComplete="address-line2"
            error={firstError(
              fieldErrors.address2,
            )}
            onChange={(value) =>
              updateField("address2", value)
            }
          />
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextField
            label="City"
            value={form.city}
            placeholder="Lagos"
            autoComplete="address-level2"
            error={firstError(fieldErrors.city)}
            onChange={(value) =>
              updateField("city", value)
            }
          />

          <TextField
            label="State"
            value={form.state}
            placeholder="Lagos"
            autoComplete="address-level1"
            error={firstError(fieldErrors.state)}
            onChange={(value) =>
              updateField("state", value)
            }
          />
        </div>

        <div className="mt-5">
          <TextField
            label="Postal code"
            value={form.postalCode}
            placeholder="Optional"
            autoComplete="postal-code"
            error={firstError(
              fieldErrors.postalCode,
            )}
            onChange={(value) =>
              updateField("postalCode", value)
            }
          />
        </div>
      </section>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#03CEA4]/25">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(event) =>
            updateField(
              "isDefault",
              event.target.checked,
            )
          }
          className="mt-1 size-4 accent-[#03CEA4]"
        />

        <span>
          <span className="block text-sm font-medium text-white/80">
            Make this my default address
          </span>

          <span className="mt-1 block text-xs leading-5 text-white/40">
            We will automatically select it during
            checkout.
          </span>
        </span>
      </label>

      <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="min-h-12 rounded-full border border-white/10 px-6 text-sm font-medium text-white/65 transition hover:border-white/25 hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-7 text-sm font-semibold text-[#07111f] transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving address
            </>
          ) : (
            <>
              <MapPin className="size-4" />
              {isEditing
                ? "Update address"
                : "Save address"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

function SectionHeading({
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-lg font-semibold text-white">
        {title}
      </h2>
    </div>
  );
}

type AddressLabelButtonProps = {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

function AddressLabelButton({
  label,
  icon,
  selected,
  onClick,
}: AddressLabelButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-medium transition ${
        selected
          ? "border-[#03CEA4]/45 bg-[#03CEA4]/10 text-[#8ff8e3]"
          : "border-white/10 bg-white/[0.025] text-white/50 hover:border-white/20 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
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

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`min-h-12 w-full rounded-2xl border bg-[#07111f] px-4 text-sm text-white outline-none transition ${
          error
            ? "border-[#FB4D3D]/60"
            : "border-white/10 focus:border-[#03CEA4]/60"
        }`}
      >
        {children}
      </select>

      {error && (
        <span className="mt-2 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

function firstError(
  errors: string[] | undefined,
) {
  return errors?.[0];
}