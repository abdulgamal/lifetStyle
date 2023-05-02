import React, { useContext, useState } from "react";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { AContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AContext);
  return (
    <header>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
        <div className="container flex items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <img
              src="https://paysoko.com/asset/brands/brand_1676528257.png"
              className="h-6 mr-3 sm:h-9"
              alt="Logo"
            />
          </Link>
          {user ? (
            <div className="flex items-center md:order-2">
              <UserDropdown />
            </div>
          ) : (
            <div className="flex -ml-1 space-x-4 md:w-max lg:border-l">
              <Link
                href="/sign-up"
                className="relative flex h-9 md:ml-auto items-center justify-center sm:px-6"
              >
                <span className="relative text-sm font-semibold">Sign Up</span>
              </Link>
              <Link
                href="/login"
                className="relative flex h-9 md:ml-auto items-center justify-center sm:px-6"
              >
                <span className="relative text-sm font-semibold text-gray-900">
                  Login
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
