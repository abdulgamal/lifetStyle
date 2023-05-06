import Link from "next/link";
import React from "react";

function CartSection({ category }) {
  return (
    <div
      className="relative w-full md:w-auto block overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${category?.bgImg})` }}
    >
      <div className="absolute inset-0 bg-black/25"></div>

      <div className="relative flex items-start justify-end p-4 sm:p-6 lg:p-8">
        <Link
          href={`/influencer/${category.slug}`}
          className="inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white"
        >
          Peep
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </Link>
      </div>
      <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
        <div className="sm:pt-18 pt-12 text-white lg:pt-24">
          <p className="text-sm font-bold">{category.title}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSection;
