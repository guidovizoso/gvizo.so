import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { EXPERIENCE } from "./data";

export const metadata = {
  title: "About",
  description: "Product Engineer and Frontend Team Lead",
};

export default async function Home() {
  return (
    <main className="mx-auto max-w-screen-md w-full px-4 md:px-0 pb-32">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mt-16">
        About
      </h1>
      <div className="mt-16">
        {EXPERIENCE.map((exp) => {
          return (
            <div key={exp.at} className="[&:not(:first-child)]:mt-16">
              <h2 className="font-medium text-foreground/60">{exp.at}</h2>
              <Link href={exp.atUrl} target="_blank">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
                  {exp.title}
                </h3>
              </Link>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: exp.desc }}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
