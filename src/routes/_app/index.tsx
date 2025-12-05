import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "@/components/ui/timeline";

export const Route = createFileRoute("/_app/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="relative z-0 w-full bg-background">
      <div className="relative z-10 w-full bg-background">
        <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-screen-2xl grid-cols-6 gap-5 bg-background px-7 pt-20 pb-32 sm:px-8 md:grid-cols-12 md:px-10 md:pt-52 lg:px-20">
          <div className="col-start-1 col-end-7 md:col-start-4 md:col-end-12 lg:col-end-10">
            <h1 className="-mt-2 font-serif text-4xl leading-snug">
              Building systems
              <br className="hidden md:block" />
              <span className="block md:hidden"> </span>
              that make products shine.
            </h1>
            <div className="mt-16">
              <p className="text-pretty text-muted-foreground">
                I&apos;m a product engineer with ~10 years of experience.
                Currently making the world a safer place by preventing money
                laundering at{" "}
                <a
                  className="underline"
                  href="https://sandbar.ai"
                  rel="noopener"
                  target="_blank"
                >
                  Sandbar
                </a>
                .
              </p>
              <p className="mt-6 text-pretty text-muted-foreground">
                I like software that feels considered instead of just
                constructed and will turn every stone to get the user the
                experience they deserve.
              </p>
              <Separator className="my-32" />
              <h2 className="text-xl">Experience</h2>
              <div className="mt-10">
                <Timeline />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-7 w-full translate-y-[50%] rounded-b-xl bg-background" />
      </div>
      <Footer />
    </div>
  );
}
