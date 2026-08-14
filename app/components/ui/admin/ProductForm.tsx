"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductImageUpload from "../products/ProductImageUpload";
import {
  ArrowLeft,
  Loader2,
  PackagePlus,
  Save,
} from "lucide-react";

export type ProductStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export type ProductFormProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  images: string[];
  stock: number;
  featured: boolean;
  status: ProductStatus;
};

type ProductFormProps = {
  product?: ProductFormProduct;
};

type ProductFormState = {
  name: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  featured: boolean;
  status: ProductStatus;
  images: string[];
};

type FieldErrors = Record<string, string[] | undefined>;

const PRODUCT_CATEGORIES = [
  "Artwork",
  "Art Supplies",
  "Customized Jackets",
  "Game Cards",
  "Merchandise",
  "Limited Drops",
];

export default function ProductForm({
  product,
}: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(product);

  const [form, setForm] = useState<ProductFormState>({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product
      ? (product.price / 100).toString()
      : "",
    category: product?.category ?? "",
    stock: product?.stock.toString() ?? "0",
    featured: product?.featured ?? false,
    status: product?.status ?? "DRAFT",
    images: product?.images ?? [],
  });

  const [slugWasEdited, setSlugWasEdited] = useState(
    Boolean(product?.slug),
  );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null,
  );

  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors>({});

  const mainImage = form.images[0] ?? "";

  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditing
        ? "Saving changes..."
        : "Creating product...";
    }

    return isEditing
      ? "Save changes"
      : "Create product";
  }, [isEditing, isSubmitting]);

  function updateField<K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: slugWasEdited
        ? current.slug
        : createSlug(value),
    }));

    setFieldErrors((current) => ({
      ...current,
      name: undefined,
      slug: undefined,
    }));
  }

  function handleSlugChange(value: string) {
    setSlugWasEdited(true);
    updateField("slug", createSlug(value));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setFieldErrors({});

    const priceInNaira = Number(form.price);
    const stock = Number(form.stock);

    if (
      !Number.isFinite(priceInNaira) ||
      priceInNaira <= 0
    ) {
      setFieldErrors({
        price: ["Enter a valid price greater than zero."],
      });

      return;
    }

    if (
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setFieldErrors({
        stock: [
          "Stock must be a whole number and cannot be negative.",
        ],
      });

      return;
    }

    if (form.images.length === 0) {
      setFieldErrors({
        images: ["Upload at least one product image."],
      });

      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),

      // The form accepts naira, while the API stores kobo.
      price: Math.round(priceInNaira * 100),

      category: form.category.trim(),
      imageUrl: mainImage,
      images: form.images,
      stock,
      featured: form.featured,
      status: form.status,
    };

    setIsSubmitting(true);

    try {
      const endpoint = isEditing
        ? `/api/products/${product?.id}`
        : "/api/products";

      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setFieldErrors(result.fields ?? {});

        throw new Error(
          result.error ||
            "The product could not be saved.",
        );
      }

      router.push("/admin/products");
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The product could not be saved.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-200"
        >
          {error}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <FormSection
            title="Product information"
            description="Enter the main details customers will see in the store."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label="Product name"
                error={firstError(fieldErrors.name)}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleNameChange(event.target.value)
                  }
                  placeholder="Original abstract canvas"
                  className={inputClasses(
                    Boolean(fieldErrors.name),
                  )}
                />
              </FormField>

              <FormField
                label="Slug"
                hint="Used in the product page URL."
                error={firstError(fieldErrors.slug)}
              >
                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) =>
                    handleSlugChange(event.target.value)
                  }
                  placeholder="original-abstract-canvas"
                  className={inputClasses(
                    Boolean(fieldErrors.slug),
                  )}
                />
              </FormField>
            </div>

            <FormField
              label="Description"
              error={firstError(fieldErrors.description)}
            >
              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                rows={7}
                placeholder="Describe the product, materials, size, style and important details."
                className={`${inputClasses(
                  Boolean(fieldErrors.description),
                )} resize-y`}
              />
            </FormField>
          </FormSection>

          <FormSection
            title="Pricing and inventory"
            description="Control the product price, category and available quantity."
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <FormField
                label="Price"
                hint="Enter the amount in naira."
                error={firstError(fieldErrors.price)}
              >
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/45">
                    ₦
                  </span>

                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={(event) =>
                      updateField(
                        "price",
                        event.target.value,
                      )
                    }
                    placeholder="25000"
                    className={`${inputClasses(
                      Boolean(fieldErrors.price),
                    )} pl-9`}
                  />
                </div>
              </FormField>

              <FormField
                label="Stock"
                error={firstError(fieldErrors.stock)}
              >
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(event) =>
                    updateField(
                      "stock",
                      event.target.value,
                    )
                  }
                  className={inputClasses(
                    Boolean(fieldErrors.stock),
                  )}
                />
              </FormField>

              <FormField
                label="Category"
                error={firstError(fieldErrors.category)}
              >
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateField(
                      "category",
                      event.target.value,
                    )
                  }
                  className={inputClasses(
                    Boolean(fieldErrors.category),
                  )}
                >
                  <option value="">
                    Select category
                  </option>

                  {PRODUCT_CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </FormSection>

          <FormSection
            title="Product images"
            description="The first image will be used as the main product image."
          >
            <ProductImageUpload
              images={form.images}
              onChange={(images) =>
                updateField("images", images)
              }
              maxImages={5}
            />

            {fieldErrors.images && (
              <p className="mt-3 text-sm text-red-300">
                {firstError(fieldErrors.images)}
              </p>
            )}
          </FormSection>
        </div>

        <aside className="space-y-6">
          <FormSection
            title="Publishing"
            description="Choose the product’s visibility in your store."
          >
            <FormField
              label="Status"
              error={firstError(fieldErrors.status)}
            >
              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target
                      .value as ProductStatus,
                  )
                }
                className={inputClasses(
                  Boolean(fieldErrors.status),
                )}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">
                  Published
                </option>
                <option value="ARCHIVED">
                  Archived
                </option>
              </select>
            </FormField>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField(
                    "featured",
                    event.target.checked,
                  )
                }
                className="mt-0.5 size-4 accent-[#03CEA4]"
              />

              <span>
                <span className="block text-sm font-medium">
                  Featured product
                </span>

                <span className="mt-1 block text-xs leading-5 text-white/45">
                  Display this product in featured areas
                  of the storefront.
                </span>
              </span>
            </label>
          </FormSection>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <h2 className="text-base font-semibold">
              Save product
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Review the product details before saving.
              Published products can appear in the public
              store.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#03CEA4] px-5 py-3 text-sm font-semibold text-[#07111f] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isEditing ? (
                <Save className="size-4" />
              ) : (
                <PackagePlus className="size-4" />
              )}

              {submitLabel}
            </button>

            <Link
              href="/admin/products"
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/65 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Cancel
            </Link>
          </div>
        </aside>
      </section>
    </form>
  );
}

type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm leading-6 text-white/50">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-5">{children}</div>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

function FormField({
  label,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </span>

      {children}

      {error ? (
        <span className="mt-2 block text-sm text-red-300">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-2 block text-xs leading-5 text-white/40">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

function inputClasses(hasError: boolean) {
  return [
    "min-h-11 w-full rounded-xl border bg-[#07111f] px-4 py-3 text-sm text-white outline-none transition",
    "placeholder:text-white/30 focus:border-[#03CEA4]",
    hasError
      ? "border-red-400/60"
      : "border-white/10",
  ].join(" ");
}

function firstError(
  errors: string[] | undefined,
) {
  return errors?.[0];
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}