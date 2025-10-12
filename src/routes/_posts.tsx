import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const Route = createFileRoute("/_posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative z-0 h-dvh overflow-y-scroll">
      <Header />
      <div className="relative z-0 w-full bg-background">
        <div className="relative z-10 w-full bg-background">
          <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-screen-2xl grid-cols-6 gap-5 bg-background px-7 pt-20 pb-32 sm:px-8 md:grid-cols-12 md:px-10 md:pt-52 lg:px-20">
            <div className="col-start-1 col-end-7 md:col-start-4 md:col-end-12 lg:col-end-10">
              <Outlet />
            </div>
          </div>
          <div className="absolute bottom-0 h-7 w-full translate-y-[50%] rounded-b-xl bg-background" />
        </div>
        <Footer />
      </div>
    </div>
  );
}
