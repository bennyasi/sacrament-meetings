
"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/auth-actions";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="mx-auto w-full max-w-md space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-medium"
        >
          Bishopric email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-medium"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
