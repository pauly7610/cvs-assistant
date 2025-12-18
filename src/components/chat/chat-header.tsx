"use client";

import { Heart } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export function ChatHeader() {
  const { user, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cvs-red">
            <Heart className="h-5 w-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="font-semibold text-cvs-text-primary">CVS Care Companion</h1>
            <p className="text-xs text-gray-500">
              {isLoaded && user ? `Hello, ${user.firstName || "there"}` : "Your healthcare support assistant"}
            </p>
          </div>
        </div>
        <UserButton 
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "w-9 h-9",
            },
          }}
        />
      </div>
    </header>
  );
}
