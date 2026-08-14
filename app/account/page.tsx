import {
  MapPin,
  Package,
  Settings,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03CEA4]">
          Customer account
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Welcome,{" "}
          {session.user.name || session.user.email}
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
          Manage your orders, delivery addresses and account details.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AccountCard
            href="/account/orders"
            icon={<Package className="size-5" />}
            title="Orders"
            description="Track and review purchases."
          />

          <AccountCard
            href="/account/addresses"
            icon={<MapPin className="size-5" />}
            title="Addresses"
            description="Manage delivery locations."
          />

          <AccountCard
            href="/account/profile"
            icon={<UserRound className="size-5" />}
            title="Profile"
            description="Update personal information."
          />

          <AccountCard
            href="/account/settings"
            icon={<Settings className="size-5" />}
            title="Settings"
            description="Manage account preferences."
          />
        </div>
      </div>
    </main>
  );
}

type AccountCardProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

function AccountCard({
  href,
  icon,
  title,
  description,
}: AccountCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-[#03CEA4]/30 hover:bg-[#03CEA4]/[0.05]"
    >
      <div className="grid size-11 place-items-center rounded-full bg-[#03CEA4]/10 text-[#03CEA4]">
        {icon}
      </div>

      <h2 className="mt-5 text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/45">
        {description}
      </p>
    </Link>
  );
}