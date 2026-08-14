import Link from "next/link";
import {
  ArrowLeft,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SignUpForm from "@/app/components/ui/auth/SignUpForm";

type SignUpPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export const metadata = {
  title: "Create Account | The Creative Explorer",
  description:
    "Create your TCE account to manage orders, saved addresses and checkout.",
};

export default async function SignUpPage({
  searchParams,
}: SignUpPageProps) {
  const params = await searchParams;

  const callbackUrl =
    typeof params?.callbackUrl === "string"
      ? params.callbackUrl
      : "/account";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] px-5 py-6 text-white sm:px-8 lg:px-10">
      {/* Keep your full sign-up page UI here */}

      <SignUpForm callbackUrl={callbackUrl} />
    </main>
  );
}