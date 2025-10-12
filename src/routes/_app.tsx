import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative z-0 h-dvh overflow-y-scroll">
      <header className="pointer-events-none sticky top-0 right-0 left-0 z-50 w-full bg-card md:fixed md:top-52 md:bg-transparent">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-6 gap-5 px-7 sm:px-8 md:grid-cols-12 md:px-10 lg:px-7">
          <div className="col-start-1 col-end-7 flex flex-col md:col-end-3 lg:col-end-4 xl:col-start-2">
            <p className="font-bold text-xl">G</p>
            <ul className="mt-2">
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
