import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const metadata = {
  title: "About",
  description: "Product Engineer and Frontend Team Lead",
};

export default async function Home() {
  return (
    <main className="mx-auto max-w-screen-md w-full px-4 md:px-0">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mt-16">
        About
      </h1>
      <p className="mt-4">Coming soon...</p>
    </main>
  );
}
