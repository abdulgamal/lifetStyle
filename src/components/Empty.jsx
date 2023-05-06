import React from "react";

function Empty() {
  return (
    <div className="relative block rounded-sm border-t-4 border-pink-600 p-4 shadow-md sm:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-pink-600 sm:h-8 sm:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>

        <h3 className="text-3xl font-bold sm:text-4xl">Oops!!!</h3>
      </div>

      <p className="mt-4 font-medium text-gray-500">
        No products available at this time
      </p>
    </div>
  );
}

export default Empty;
