import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MenuIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <>
      <header className="pointer-events-none fixed top-52 right-0 left-0 z-50 hidden w-full bg-transparent md:block">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-6 gap-5 px-7 sm:px-8 md:grid-cols-12 md:px-10 lg:px-7">
          <div className="pointer-events-auto col-start-1 col-end-7 flex flex-col md:col-end-3 lg:col-end-4 xl:col-start-2">
            <p className="font-bold font-serif text-2xl">G</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <Link
                  activeProps={{ className: "!text-foreground font-semibold" }}
                  className="font-normal text-muted-foreground hover:text-foreground"
                  to="/"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  activeProps={{ className: "!text-foreground font-semibold" }}
                  className="font-normal text-muted-foreground hover:text-foreground"
                  to="/posts"
                >
                  Articles
                </Link>
              </li>
            </ul>
            <Separator className="!w-1/2 my-3" />
            <ul className="flex flex-col gap-1.5">
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="https://www.linkedin.com/in/guidovizoso/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="https://github.com/guidovizoso"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="sticky top-0 right-0 left-0 z-50 flex h-12 flex-row items-center justify-between border-border border-b bg-background p-4 md:hidden">
        <div className="font-bold font-serif text-xl">G</div>
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <ul className="mt-40 flex flex-col gap-6 p-4">
              <li>
                <Link
                  activeProps={{ className: "font-semibold" }}
                  className="w-full"
                  to="/"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  activeProps={{ className: "!text-foreground font-semibold" }}
                  className="w-full"
                  to="/posts"
                >
                  Articles
                </Link>
              </li>
              <li>
                <a
                  className="w-full"
                  href="https://www.linkedin.com/in/guidovizoso/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn <ArrowUpRight className="inline-block size-4" />
                </a>
              </li>
              <li>
                <a
                  className="w-full"
                  href="https://github.com/guidovizoso"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github <ArrowUpRight className="inline-block size-4" />
                </a>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
