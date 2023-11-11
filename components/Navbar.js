"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/training-setup",
    name: "Training Setup",
  },
  {
    path: "/training-history",
    name: "Training History",
  },
];

export default function NavBar() {
  let pathname = usePathname() || "/";

  return (
    <div className="border border-stone-800/90 rounded-sm mb-12 sticky py-5 z-[100] bg-gradient-to-b from-green-600 to-green-800 shadow-sm">
      <nav className="flex gap-2 relative justify-center w-full z-[100] rounded-lg">
        {navItems.map((item, index) => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-md text-sm lg:text-2xl font-medium relative duration-300 ease-in ${
                isActive ? "text-white" : "text-zinc-800"
              }`}
              href={item.path}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
