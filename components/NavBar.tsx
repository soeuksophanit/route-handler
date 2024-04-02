"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname();

  return (
    <header className=" py-2 px-4 flex justify-center sticky top-0 z-10">
      <nav className="flex items-center justify-center gap-6 border p-1 rounded-[32px] backdrop-blur-md bg-white/5">
        <Link
          href={"/"}
          className={` hover:border border border-transparent rounded-[32px] py-2 px-4 ${
            path === "/" ? "bg-[#393939] text-white" : ""
          }`}
        >
          Table Order
        </Link>
        <Link
          href={"/product"}
          className={` hover:border border border-transparent rounded-[32px] py-2 px-4 ${
            path === "/product" ? "bg-[#393939] text-white" : ""
          }`}
        >
          Table Product
        </Link>
        <Link
          href={"/category"}
          className={` hover:border border border-transparent rounded-[32px] py-2 px-4 ${
            path === "/category" ? "bg-[#393939] text-white" : ""
          }`}
        >
          Table Category
        </Link>
        <Link
          href={"/customer"}
          className={` hover:border border border-transparent rounded-[32px] py-2 px-4 ${
            path === "/customer" ? "bg-[#393939] text-white" : ""
          }`}
        >
          Table Customer
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
