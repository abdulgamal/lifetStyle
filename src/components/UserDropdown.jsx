import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AContext } from "../../context/AuthContext";

const UserDropdown = () => {
  const [toggle, setToggle] = useState(false);
  const { logOut, userInfo: data } = useContext(AContext);

  return (
    <>
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={() => setToggle(!toggle)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={
            data?.image ||
            "https://img.freepik.com/free-icon/user_318-159711.jpg?size=338&ext=jpg&ga=GA1.2.1579534943.1675896791&semt=ais"
          }
          alt="user photo"
        />
      </button>
      <div
        className={`${
          !toggle && "hidden"
        } z-50 absolute top-14 right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm font-medium text-gray-500 truncate">
            {data?.email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <Link
              href="/admin/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/admin/order"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/add-new"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Add Product
            </Link>
          </li>
          <li
            onClick={logOut}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Sign out
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;
