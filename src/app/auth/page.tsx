"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function AuthPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      {session ? (
        <>
          <div className="mb-4">Signed in as {session.user?.email}</div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
      )}
    </div>
  );
}
