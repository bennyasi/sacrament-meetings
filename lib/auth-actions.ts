
"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function authenticate(
  _previousState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return "Enter your email and password.";
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/meetings/new",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password.";
    }

    throw error;
  }

  return undefined;
}

export async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}
