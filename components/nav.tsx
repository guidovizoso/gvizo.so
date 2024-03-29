"use client";

import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center font-medium text-sm transition-all rounded-lg",
        {
          "text-foreground": isActive,
          "text-foreground/60 hover:text-foreground": !isActive,
        }
      )}
    >
      {children}
    </Link>
  );
};

export function Nav() {
  return (
    <div className="mx-auto max-w-screen-md w-full px-4 md:px-0 pt-3 flex flex-row gap-4 items-center justify-between">
      <div>
        <h2 className="font-medium flex items-center gap-2">
          <span className="text-lg">{config.faviconEmoji}</span>{" "}
          <span className="hidden md:inline">{config.name}</span>
        </h2>
      </div>
      <div className="flex flex-row gap-6">
        <nav className="w-fit flex flex-row gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
        <div className="flex flex-row gap-2 items-center">
          <Link
            href={config.twitterUrl}
            target="_blank"
            className="h-8 px-2 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </Link>
          <Link
            href={config.githubUrl}
            target="_blank"
            className="h-8 px-2 flex items-center justify-center"
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
