import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div>
        <p>Welcome to our App</p>
      </div>

      <div className=" flex gap-3">
        <div>Sign In</div>
        <div>Sign up</div>
      </div>
    </section>
  );
}
