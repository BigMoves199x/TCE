"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  useMemo,
  useState,
} from "react";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Loader2,
  Package,
  Search,
  Trash2,
} from "lucide-react";

type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

type Product = {
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
  createdAt: string;
  updatedAt: string;
};

type ProductsTableProps = {
  initialProducts: Product[];
};

const PRODUCTS_PER_PAGE = 8;

export default function ProductsTable({
  initialProducts,
}: ProductsTableProps) {
  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | ProductStatus>("ALL");

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const [processingId, setProcessingId] =
    useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category)),
    ).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.slug.toLowerCase().includes(normalizedQuery) ||
        product.category
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "ALL" ||
        product.status === statusFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        product.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    products,
    searchQuery,
    statusFilter,
    categoryFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE,
    );
  }, [filteredProducts, safeCurrentPage]);

  function resetMessages() {
    setError(null);
    setNotice(null);
  }

  function handleSearch(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }

  function handleStatusFilter(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    setStatusFilter(
      event.target.value as "ALL" | ProductStatus,
    );

    setCurrentPage(1);
  }

  function handleCategoryFilter(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    setCategoryFilter(event.target.value);
    setCurrentPage(1);
  }

  async function updateProductStatus(
    product: Product,
    status: ProductStatus,
  ) {
    resetMessages();
    setProcessingId(product.id);

    try {
      const response = await fetch(
        `/api/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to update the product.",
        );
      }

      setProducts((currentProducts) =>
        currentProducts.map((currentProduct) =>
          currentProduct.id === product.id
            ? result.product
            : currentProduct,
        ),
      );

      setNotice(
        `${product.name} is now ${status.toLowerCase()}.`,
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to update the product.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function deleteProduct(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"? Products linked to orders will be archived instead.`,
    );

    if (!confirmed) {
      return;
    }

    resetMessages();
    setProcessingId(product.id);

    try {
      const response = await fetch(
        `/api/products/${product.id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to delete the product.",
        );
      }

      if (result.archived && result.product) {
        setProducts((currentProducts) =>
          currentProducts.map((currentProduct) =>
            currentProduct.id === product.id
              ? result.product
              : currentProduct,
          ),
        );

        setNotice(result.message);
        return;
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (currentProduct) =>
            currentProduct.id !== product.id,
        ),
      );

      setNotice(result.message || "Product deleted.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to delete the product.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      <div className="border-b border-white/10 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products, slugs or categories"
              className="min-h-11 w-full rounded-xl border border-white/10 bg-[#07111f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#03CEA4]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="min-h-11 rounded-xl border border-white/10 bg-[#07111f] px-4 text-sm text-white outline-none focus:border-[#03CEA4]"
          >
            <option value="ALL">All statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <select
            value={categoryFilter}
            onChange={handleCategoryFilter}
            className="min-h-11 rounded-xl border border-white/10 bg-[#07111f] px-4 text-sm text-white outline-none focus:border-[#03CEA4]"
          >
            <option value="ALL">All categories</option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mt-4 rounded-xl border border-[#03CEA4]/20 bg-[#03CEA4]/10 px-4 py-3 text-sm text-[#77f5dc]"
          >
            {notice}
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyProducts />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-white/45">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Product
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Price
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Stock
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Created
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {paginatedProducts.map((product) => {
                  const isProcessing =
                    processingId === product.id;

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[230px] truncate text-sm font-semibold text-white">
                              {product.name}
                            </p>

                            <p className="mt-1 max-w-[230px] truncate text-xs text-white/40">
                              /{product.slug}
                            </p>

                            {product.featured && (
                              <span className="mt-2 inline-flex rounded-full bg-[#EAC435]/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#EAC435]">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-white/65">
                        {product.category}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {formatPrice(product.price)}
                      </td>

                      <td className="px-5 py-4">
                        <StockBadge stock={product.stock} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusSelect
                          product={product}
                          disabled={isProcessing}
                          onChange={(status) =>
                            updateProductStatus(
                              product,
                              status,
                            )
                          }
                        />
                      </td>

                      <td className="px-5 py-4 text-sm text-white/55">
                        {formatDate(product.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {isProcessing ? (
                            <div className="flex size-9 items-center justify-center">
                              <Loader2 className="size-4 animate-spin text-[#03CEA4]" />
                            </div>
                          ) : (
                            <>
                              <Link
                                href={`/shop/${product.slug}`}
                                target="_blank"
                                aria-label={`View ${product.name}`}
                                title="View product"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-[#03CEA4]/40 hover:text-[#03CEA4]"
                              >
                                <Eye className="size-4" />
                              </Link>

                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                aria-label={`Edit ${product.name}`}
                                title="Edit product"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-[#EAC435]/40 hover:text-[#EAC435]"
                              >
                                <Edit3 className="size-4" />
                              </Link>

                              {product.status !== "ARCHIVED" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateProductStatus(
                                      product,
                                      "ARCHIVED",
                                    )
                                  }
                                  aria-label={`Archive ${product.name}`}
                                  title="Archive product"
                                  className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-orange-300/40 hover:text-orange-300"
                                >
                                  <Archive className="size-4" />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  deleteProduct(product)
                                }
                                aria-label={`Delete ${product.name}`}
                                title="Delete product"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-red-400/40 hover:text-red-300"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/45">
              Showing{" "}
              <span className="text-white/75">
                {(safeCurrentPage - 1) *
                  PRODUCTS_PER_PAGE +
                  1}
              </span>{" "}
              to{" "}
              <span className="text-white/75">
                {Math.min(
                  safeCurrentPage *
                    PRODUCTS_PER_PAGE,
                  filteredProducts.length,
                )}
              </span>{" "}
              of{" "}
              <span className="text-white/75">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1),
                  )
                }
                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>

              <span className="min-w-20 text-center text-sm text-white/55">
                {safeCurrentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  safeCurrentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1),
                  )
                }
                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

type StatusSelectProps = {
  product: Product;
  disabled: boolean;
  onChange: (status: ProductStatus) => void;
};

function StatusSelect({
  product,
  disabled,
  onChange,
}: StatusSelectProps) {
  return (
    <select
      value={product.status}
      disabled={disabled}
      onChange={(event) =>
        onChange(event.target.value as ProductStatus)
      }
      aria-label={`Change status for ${product.name}`}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-50 ${getStatusClasses(
        product.status,
      )}`}
    >
      <option value="DRAFT">Draft</option>
      <option value="PUBLISHED">Published</option>
      <option value="ARCHIVED">Archived</option>
    </select>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex rounded-full bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-300">
        Out of stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex rounded-full bg-[#EAC435]/10 px-2.5 py-1 text-xs font-medium text-[#EAC435]">
        {stock} remaining
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-[#03CEA4]/10 px-2.5 py-1 text-xs font-medium text-[#77f5dc]">
      {stock} in stock
    </span>
  );
}

function EmptyProducts() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5">
        <Package className="size-6 text-white/40" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        No products found
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-white/50">
        There are no products matching the current search and
        filter options.
      </p>
    </div>
  );
}

function formatPrice(priceInKobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(priceInKobo / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusClasses(status: ProductStatus) {
  switch (status) {
    case "PUBLISHED":
      return "border-[#03CEA4]/20 bg-[#03CEA4]/10 text-[#77f5dc]";

    case "ARCHIVED":
      return "border-white/10 bg-white/5 text-white/45";

    default:
      return "border-[#EAC435]/20 bg-[#EAC435]/10 text-[#EAC435]";
  }
}