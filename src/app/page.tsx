"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p>Loading profile...</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      {session == null ? (
        <>
          <div className="p-5">
            <p className="text-5xl font-bold ">welcome to our app</p>
          </div>
          <div className=" flex gap-3">
            <Button>
              <Link href={"auth/login"}> Sign In / Sign Up </Link>{" "}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="p-5">
            <p className="text-5xl font-bold ">
              Welcome to our App {session.user.name}
            </p>
          </div>
          <div className=" flex gap-3">
            {/* <Button>
              <Link href={"auth/login"}> Sign In / Sign Up </Link>{" "}
            </Button> */}

            <Button
              variant={"destructive"}
              onClick={() => authClient.signOut()}
            >
              Sign Out
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
