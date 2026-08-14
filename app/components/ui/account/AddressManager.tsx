"use client";

import {
  Check,
  Edit3,
  Home,
  Loader2,
  MapPin,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AddressForm, {
  type AddressFormValues,
} from "./AddressForm";

export type CustomerAddress = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  country: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  postalCode: string | null;
  isDefault: boolean;
};

type AddressManagerProps = {
  initialAddresses: CustomerAddress[];
};

export default function AddressManager({
  initialAddresses,
}: AddressManagerProps) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(
    initialAddresses.length === 0,
  );

  const [editingAddress, setEditingAddress] =
    useState<CustomerAddress | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [defaultingId, setDefaultingId] =
    useState<string | null>(null);

  const [actionError, setActionError] =
    useState<string | null>(null);

  function openNewAddressForm() {
    setEditingAddress(null);
    setActionError(null);
    setShowForm(true);
  }

  function openEditForm(address: CustomerAddress) {
    setEditingAddress(address);
    setActionError(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function closeForm() {
    setEditingAddress(null);
    setShowForm(false);
  }

  function handleFormSuccess() {
    setEditingAddress(null);
    setShowForm(false);
    router.refresh();
  }

  async function setAsDefault(addressId: string) {
    setActionError(null);
    setDefaultingId(addressId);

    try {
      const response = await fetch(
        `/api/account/addresses/${addressId}/default`,
        {
          method: "PATCH",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setActionError(
          result.error ??
            "Unable to update the default address.",
        );
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("SET DEFAULT ADDRESS ERROR:", error);

      setActionError(
        "Something went wrong while updating the address.",
      );
    } finally {
      setDefaultingId(null);
    }
  }

  async function deleteAddress(addressId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) {
      return;
    }

    setActionError(null);
    setDeletingId(addressId);

    try {
      const response = await fetch(
        `/api/account/addresses/${addressId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setActionError(
          result.error ?? "Unable to delete the address.",
        );
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("DELETE ADDRESS ERROR:", error);

      setActionError(
        "Something went wrong while deleting the address.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
            Saved locations
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Your delivery addresses
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/45">
            Your default address will be selected during
            checkout.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={openNewAddressForm}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#03CEA4] px-5 text-sm font-semibold text-[#07111f] transition hover:brightness-110"
          >
            <Plus className="size-4" />
            Add address
          </button>
        )}
      </div>

      {actionError && (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-[#FB4D3D]/25 bg-[#FB4D3D]/10 px-4 py-3 text-sm text-red-200"
        >
          {actionError}
        </div>
      )}

      {showForm && (
        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#EAC435]">
                {editingAddress
                  ? "Update location"
                  : "New location"}
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {editingAddress
                  ? "Edit your address"
                  : "Add a delivery address"}
              </h2>
            </div>

            {initialAddresses.length > 0 && (
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close address form"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/45 transition hover:border-white/25 hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <AddressForm
            key={editingAddress?.id ?? "new-address"}
            addressId={editingAddress?.id}
            initialValues={
              editingAddress
                ? addressToFormValues(editingAddress)
                : undefined
            }
            onSuccess={handleFormSuccess}
            onCancel={
              initialAddresses.length > 0
                ? closeForm
                : undefined
            }
          />
        </section>
      )}

      {!showForm && initialAddresses.length > 0 && (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {initialAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isDeleting={deletingId === address.id}
              isSettingDefault={
                defaultingId === address.id
              }
              onEdit={() => openEditForm(address)}
              onDelete={() =>
                deleteAddress(address.id)
              }
              onSetDefault={() =>
                setAsDefault(address.id)
              }
            />
          ))}
        </div>
      )}

      {!showForm && initialAddresses.length === 0 && (
        <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] px-6 text-center">
          <div className="grid size-14 place-items-center rounded-full bg-[#03CEA4]/10 text-[#03CEA4]">
            <MapPin className="size-6" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            No saved address
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
            Add a delivery address to make future checkouts
            faster.
          </p>

          <button
            type="button"
            onClick={openNewAddressForm}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#03CEA4] px-5 text-sm font-semibold text-[#07111f]"
          >
            <Plus className="size-4" />
            Add address
          </button>
        </div>
      )}
    </div>
  );
}

type AddressCardProps = {
  address: CustomerAddress;
  isDeleting: boolean;
  isSettingDefault: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
};

function AddressCard({
  address,
  isDeleting,
  isSettingDefault,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <article
      className={`relative rounded-[1.75rem] border p-6 transition ${
        address.isDefault
          ? "border-[#03CEA4]/35 bg-[#03CEA4]/[0.055]"
          : "border-white/10 bg-white/[0.035] hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`grid size-11 place-items-center rounded-full ${
              address.isDefault
                ? "bg-[#03CEA4]/15 text-[#03CEA4]"
                : "bg-white/5 text-white/45"
            }`}
          >
            {address.label.toLowerCase() === "home" ? (
              <Home className="size-5" />
            ) : (
              <MapPin className="size-5" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {address.label}
            </h3>

            {address.isDefault && (
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#03CEA4]">
                <Check className="size-3.5" />
                Default address
              </span>
            )}
          </div>
        </div>

        {!address.isDefault && (
          <button
            type="button"
            onClick={onSetDefault}
            disabled={isSettingDefault}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 text-xs text-white/50 transition hover:border-[#EAC435]/30 hover:text-[#EAC435] disabled:cursor-wait disabled:opacity-50"
          >
            {isSettingDefault ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Star className="size-3.5" />
            )}

            Set default
          </button>
        )}
      </div>

      <div className="mt-6 space-y-1.5 text-sm leading-6 text-white/50">
        <p className="font-medium text-white/75">
          {address.firstName} {address.lastName}
        </p>

        <p>{address.address1}</p>

        {address.address2 && (
          <p>{address.address2}</p>
        )}

        <p>
          {address.city}, {address.state}
          {address.postalCode
            ? ` ${address.postalCode}`
            : ""}
        </p>

        <p>{address.country}</p>

        {address.phone && (
          <p className="pt-2 text-white/40">
            {address.phone}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-medium text-white/60 transition hover:border-[#03CEA4]/30 hover:text-[#03CEA4]"
        >
          <Edit3 className="size-3.5" />
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-medium text-white/45 transition hover:border-[#FB4D3D]/35 hover:text-[#FB4D3D] disabled:cursor-wait disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Trash2 className="size-3.5" />
          )}

          Delete
        </button>
      </div>
    </article>
  );
}

function addressToFormValues(
  address: CustomerAddress,
): AddressFormValues {
  return {
    label: address.label,
    firstName: address.firstName,
    lastName: address.lastName,
    phone: address.phone ?? "",
    country: address.country,
    address1: address.address1,
    address2: address.address2 ?? "",
    city: address.city,
    state: address.state,
    postalCode: address.postalCode ?? "",
    isDefault: address.isDefault,
  };
}