
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="p-5">
        <p className="text-5xl font-bold ">Welcome to our App</p>
      </div>

      <div className=" flex gap-3">
        <Button>
          <Link href={'auth/login'}> Sign In / Sign Up </Link>{" "}
        </Button>
      </div>
    </section>
  );
}
