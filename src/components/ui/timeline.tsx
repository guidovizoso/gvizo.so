const experience = [
  {
    date: "2025 — Today",
    title: "Founding Product Engineer",
    at: "Sandbar",
    atUrl: "https://sandbar.ai",
    desc: "Building the next generation of anti-money laundering screening solutions. Stack: Python, FastAPI, Typescript, React, PostgreSQL, Docker, AWS.",
  },
  {
    date: "2022 — 2025",
    title: "Lead Frontend Engineer",
    at: "Antartida",
    atUrl: "https://antartida.ai",
    desc: "Lead the software factory's frontend team. Stack: TypeScript, React, react-query, Tailwind. Responsible for code reviews, mentoring, defining standards, and contributing to the product roadmap alongside product and design teams.",
  },
  {
    date: "2021 — 2022",
    title: "Software Engineer",
    at: "Kittl",
    atUrl: "https://kittl.com",
    desc: "Built a web-based graphic design tool and social features using Next.js, React, TypeScript, Express, Prisma, and PostgreSQL. Worked across the stack in a small, fast-moving team.",
  },
  {
    date: "2021",
    title: "Sr. Frontend Developer",
    at: "Arzion",
    atUrl: "https://www.arzmallorca.com",
    desc: "Developed a React + Redux widget library enabling marketers to build dynamic travel and hospitality landing pages with minimal effort.",
  },
  {
    date: "2020 — 2021",
    title: "Sr. Frontend Developer",
    at: "JP Morgan Chase & Co",
    atUrl: "https://www.jpmorganchase.com",
    desc: "Helped build a new internal platform using React and Redux. Defined tooling and libraries, and mentored junior developers, several of whom I continue to advise.",
  },
  {
    date: "2018 — 2020",
    title: "Sr. Frontend Developer",
    at: "Supervielle Bank",
    atUrl: "https://www.supervielle.com.ar",
    desc: "Worked on the public website using Next.js, Express, and PostCSS. Partnered with the innovation team on prototypes and advised UX teams for mobile and home banking products.",
  },
  {
    date: "2016 — 2018",
    title: "Web/Frontend Developer",
    at: "Uasabi Digital Agency",
    atUrl: "http://uasabi.la",
    desc: "Started as an intern building newsletters for major retailers, later designing and developing websites and campaigns for large regional clients.",
  },
];

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
