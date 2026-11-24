
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/login-form";

export const metadata = {
  title: "Bishopric Login",
  description: "Sign in to manage sacrament meeting programs.",
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/meetings/new");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-3 text-3xl font-bold">
          Bishopric Sign In
        </h1>

        <p className="mb-8 text-gray-600">
          Sign in to create and manage sacrament meeting programs.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
