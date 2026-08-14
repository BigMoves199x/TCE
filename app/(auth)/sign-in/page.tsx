import Link from "next/link";
import {
  ArrowLeft,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SignInForm from "@/app/components/ui/auth/SignInForm";

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
    registered?: string;
  }>;
};

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const params = await searchParams;

  const callbackUrl =
    typeof params.callbackUrl === "string"
      ? params.callbackUrl
      : "/account";

  const registered = params.registered === "true";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-[#03CEA4]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 size-[420px] rounded-full bg-[#FB4D3D]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>

          <div className="flex items-center gap-2 text-xs text-white/35">
            <LockKeyhole className="size-3.5 text-[#03CEA4]" />
            Secure sign in
          </div>
        </div>

        <div className="grid min-h-[calc(100vh-96px)] items-center gap-12 py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(460px,0.72fr)] lg:gap-20">
          <section className="hidden lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#03CEA4]">
              Welcome back
            </p>

            <h1 className="mt-6 max-w-2xl font-abril text-6xl leading-[0.96] tracking-[-0.04em]">
              Continue your
              <span className="block text-[#EAC435]">
                creative journey.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/50">
              Access your orders, saved addresses and personalized TCE
              experience.
            </p>

            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
              <Feature
                icon={<PackageCheck className="size-5" />}
                title="Your orders"
                description="Track every purchase."
              />

              <Feature
                icon={<ShieldCheck className="size-5" />}
                title="Secure access"
                description="Protected account data."
              />

              <Feature
                icon={<Sparkles className="size-5" />}
                title="TCE account"
                description="One place for everything."
              />
            </div>
          </section>

          <section className="mx-auto w-full max-w-xl">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-2xl sm:p-8">
              <div className="mb-8">
                <div className="font-bebit text-4xl leading-none">
                  <span className="text-[#EAC435]">T</span>
                  <span className="text-[#03CEA4]">C</span>
                  <span className="text-[#FB4D3D]">E</span>
                </div>

                <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                  Sign in
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  Enter your account details to continue.
                </p>
              </div>

              <SignInForm
                callbackUrl={callbackUrl}
                registered={registered}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function Feature({
  icon,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <span className="text-[#03CEA4]">{icon}</span>

      <h2 className="mt-4 text-sm font-semibold">{title}</h2>

      <p className="mt-1 text-xs leading-5 text-white/35">
        {description}
      </p>
    </div>
  );
}