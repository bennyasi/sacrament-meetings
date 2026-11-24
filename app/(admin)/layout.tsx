
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logout } from "@/lib/auth-actions";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="text-sm text-gray-700">
            Signed in as {session.user.email}
          </p>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {children}
    </>
  );
}
