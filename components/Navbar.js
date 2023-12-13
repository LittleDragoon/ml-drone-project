import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AuthUserContext } from "@/context/AuthUserContext";
import { useContext } from "react";
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
  const { user, logOut } = useContext(AuthUserContext);
  return (
    <div className="border border-stone-800/90 rounded-sm mb-12 sticky py-5 z-[100] bg-gradient-to-b from-green-600 to-green-800 shadow-sm min-w-full">
      <nav className="flex gap-2 relative justify-center items-center w-full z-[100] rounded-lg">
        {navItems.map((item) => {
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

        <Dropdown>
          <DropdownTrigger className="ml-6">
            <Avatar
              isBordered
              as="button"
              color="secondary"
              name={user?.displayName?.[0]}
              size="md"
              className="text-lg"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            disabledKeys={["profile"]}
          >
            <DropdownItem
              key="profile"
              className="h-14 gap-2 opacity-100"
              isReadOnly
            >
              <p className="font-semibold">{user?.displayName}</p>
              <p className="font-medium">{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              className="text-danger"
              onClick={logOut}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
    </div>
  );
}
