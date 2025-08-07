"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { FaSpotify } from "react-icons/fa"; // Import the Spotify icon

export function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null; // Don't show anything while checking the session
  }

  if (session) {
    // This is the view for when the user is signed in
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <p className="text-sm text-neutral-400">
          Signed in as{" "}
          <span className="font-medium text-primary">
            {session.user?.name}
          </span>
        </p>
        <Button
          onClick={() => signOut()}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium text-sm cursor-pointer transition-all duration-300 flex items-center justify-center"
        >
          Sign out
        </Button>
      </div>
    );
  }

  // This is the button for signing in
  return (
    <Button
      onClick={() => signIn("spotify")}
      className="w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-medium text-sm cursor-pointer transition-all duration-300 flex items-center justify-center"
    >
      <FaSpotify size={16} className="mr-2" />
      <span>Sign in with Spotify</span>
    </Button>
  );
}