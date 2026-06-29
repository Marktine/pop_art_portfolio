"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface RouteItem {
  label: string;
  link: string;
}

interface NavbarProps {
  routes: RouteItem[];
}

export default function Navbar({ routes }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 grid grid-cols-2 md:grid-cols-5 font-mono text-center text-sm font-bold">
      {routes.map((route, idx) => {
        const isActive = pathname === route.link;
        return (
          <Link
            key={route.link}
            href={route.link}
            className={`p-6 flex items-center justify-center label-caps transition-colors
              ${idx < 4 ? "border-b-4 border-r-4 md:border-b-0 border-on-surface" : ""}
              ${isActive ? "bg-primary text-white" : "hover:bg-surface-container text-on-surface"}
            `}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
