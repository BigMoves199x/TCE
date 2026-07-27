"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

type EditableProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  images: string[];
  featured: boolean;
  status: ProductStatus;
};

type EditProductFormProps = {
  product: EditableProduct;
};

type UpdateResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export default function EditProductForm({
  product,
}: EditProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category,
    price: String(product.price / 100),
    stock: String(product.stock),
    imageUrl: product.imageUrl,
    images: product.images,
    featured: product.featured,
    status: product.status,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string | boolean | string[],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const priceInNaira = Number(form.price);

      if (!Number.isFinite(priceInNaira) || priceInNaira <= 0) {
        throw new Error("Enter a valid product price.");
      }

      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          description: form.description,
          category: form.category,
          price: Math.round(priceInNaira * 100),
          stock: Number(form.stock),
          imageUrl: form.imageUrl,
          images:
            form.images.length > 0
              ? form.images
              : [form.imageUrl],
          featured: form.featured,
          status: form.status,
        }),
      });

      const data = (await response.json()) as UpdateResponse;

      if (!response.ok) {
        const firstFieldError = data.fieldErrors
          ? Object.values(data.fieldErrors)
              .flat()
              .find(Boolean)
          : undefined;

        throw new Error(
          firstFieldError ??
            data.error ??
            "Unable to update product.",
        );
      }

      setSuccessMessage("Product updated successfully.");

      router.refresh();

      window.setTimeout(() => {
        router.push("/admin/products");
      }, 700);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-5 py-10 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-[#03CEA4]"
        >
          <ArrowLeft size={17} />
          Back to products
        </Link>

        <div className="mt-8">
          <p className="font-semibold text-[#03CEA4]">
            TCE Admin
          </p>

          <h1 className="mt-2 text-4xl font-black md:text-5xl">
            Edit Product
          </h1>

          <p className="mt-3 text-white/55">
            Update the product details, inventory and publishing
            status.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          {error && (
            <div
              role="alert"
              className="rounded-2xl border border-[#FB4D3D]/30 bg-[#FB4D3D]/10 px-5 py-4 text-sm text-[#FB4D3D]"
            >
              {error}
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="rounded-2xl border border-[#03CEA4]/30 bg-[#03CEA4]/10 px-5 py-4 text-sm text-[#03CEA4]"
            >
              {successMessage}
            </div>
          )}

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-xl font-bold">
              Product information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <FormField label="Product name">
                <input
                  required
                  value={form.name}
                  onChange={(event) => {
                    const name = event.target.value;

                    setForm((current) => ({
                      ...current,
                      name,
                      slug: generateSlug(name),
                    }));
                  }}
                  className={inputClassName}
                />
              </FormField>

              <FormField label="Slug">
                <input
                  required
                  value={form.slug}
                  onChange={(event) =>
                    updateField("slug", event.target.value)
                  }
                  className={inputClassName}
                />
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Description">
                  <textarea
                    required
                    rows={6}
                    value={form.description}
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value,
                      )
                    }
                    className={`${inputClassName} min-h-36 resize-y py-3`}
                  />
                </FormField>
              </div>

              <FormField label="Category">
                <select
                  required
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className={inputClassName}
                >
                  <option value="">Select category</option>
                  <option value="Artwork">Artwork</option>
                  <option value="Art Supplies">
                    Art Supplies
                  </option>
                  <option value="Customized Jackets">
                    Customized Jackets
                  </option>
                  <option value="Game Cards">Game Cards</option>
                  <option value="Merchandise">
                    Merchandise
                  </option>
                  <option value="Limited Drops">
                    Limited Drops
                  </option>
                </select>
              </FormField>

              <FormField label="Status">
                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as ProductStatus,
                    )
                  }
                  className={inputClassName}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </FormField>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-xl font-bold">
              Pricing and inventory
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <FormField label="Price in naira">
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) =>
                    updateField("price", event.target.value)
                  }
                  className={inputClassName}
                />
              </FormField>

              <FormField label="Stock quantity">
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(event) =>
                    updateField("stock", event.target.value)
                  }
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-xl font-bold">
              Product image
            </h2>

            <p className="mt-2 text-sm text-white/45">
              We will replace this URL field with the Cloudinary
              uploader after the admin product flow is complete.
            </p>

            <div className="mt-6">
              <FormField label="Main image URL">
                <input
                  required
                  type="url"
                  value={form.imageUrl}
                  onChange={(event) => {
                    const imageUrl = event.target.value;

                    setForm((current) => ({
                      ...current,
                      imageUrl,
                      images: imageUrl ? [imageUrl] : [],
                    }));
                  }}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField("featured", event.target.checked)
                }
                className="h-5 w-5 accent-[#03CEA4]"
              />

              <span>
                <span className="block font-bold">
                  Featured product
                </span>

                <span className="mt-1 block text-sm text-white/45">
                  Show this product in featured areas of the shop.
                </span>
              </span>
            </label>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/products"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 font-bold transition hover:border-white/35"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FB4D3D] px-7 font-bold transition hover:bg-[#ff6759] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={18} />

              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const inputClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-[#0d1a2b] px-4 text-white outline-none placeholder:text-white/30 focus:border-[#03CEA4]";

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/70">
        {label}
      </span>

      {children}
    </label>
  );
}