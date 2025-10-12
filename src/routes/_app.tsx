import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/header";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative z-0 h-dvh overflow-y-scroll">
      <Header />
      <Outlet />
    </div>
  );
}
