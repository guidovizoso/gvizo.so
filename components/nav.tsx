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
        "w-[8ch] h-8 flex items-center justify-center font-medium text-sm transition-all rounded-lg border",
        {
          "border-border": isActive,
          "border-transparent hover:border-border": !isActive,
        }
      )}
    >
      {children}
    </Link>
  );
};

export function Nav() {
  return (
    <div className="mx-auto max-w-screen-md w-full px-4 md:px-0 mt-4 flex flex-row gap-4 items-center justify-between">
      <div>
        <h2 className="font-medium flex items-center gap-2">
          <span className="text-lg">{config.faviconEmoji}</span>{" "}
          <span className="hidden md:inline">Guido Vizoso</span>
        </h2>
      </div>
      <div className="flex flex-row gap-4">
        <nav className="w-fit flex flex-row gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
        <div className="flex flex-row gap-2 items-center">
          <Link
            href="https://twitter.com/guido_vizoso"
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
            href="https://twitter.com/guido_vizoso"
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
