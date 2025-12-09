import { experience } from "@/lib/data";

export function Timeline() {
  return (
    <div className="relative">
      {experience.map(({ title, desc, at, atUrl, date }) => (
        <div className="group relative" key={title}>
          {/* Content */}
          <div className="flex items-start">
            <div className="relative space-y-2 border-l-2 pb-10 pl-4 group-last:pb-4 sm:pl-8">
              {/* Timeline Dot */}
              <div className="-translate-x-1/2 -left-px absolute top-1.5 h-3 w-3 rounded-full border-2 border-background bg-border" />
              <time className="mt-2 text-muted-foreground text-sm">{date}</time>
              <h3 className="">
                {title} at{" "}
                <a
                  className="underline"
                  href={atUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {at}
                </a>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
