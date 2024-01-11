import Link from "next/link";
import { EXPERIENCE } from "./data";
import { ResumeDownloadButton } from "./resume-download";

export const metadata = {
  title: "About",
};

export default async function Home() {
  return (
    <main className="mx-auto max-w-screen-md w-full px-4 md:px-0 pb-32">
      <div className="flex flex-row gap-8 items-center justify-between mt-16">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">About</h1>
        <ResumeDownloadButton />
      </div>
      <ul className="mt-16 mx-0">
        {EXPERIENCE.map((exp) => {
          return (
            <li
              key={exp.at}
              className="[&:not(:first-child)]:mt-16 list-none border-b border-border pb-4"
            >
              <time className="font-medium text-foreground/60">{exp.date}</time>
              <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
                {exp.title}{" "}
                <span className="text-foreground/60 font-light">—</span>{" "}
                <Link href={exp.atUrl} target="_blank">
                  {exp.at}
                </Link>
              </h2>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: exp.desc }}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
