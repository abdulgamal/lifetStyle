import React from "react";

function InfluencerCat({ category }) {
  return (
    <div className="rounded-lg p-4 shadow-sm shadow-indigo-100 mb-3 max-w-md flex gap-8 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
        />
      </svg>

      <div>
        <h3 className="mt-3 text-lg font-bold text-gray-600 sm:text-xl">
          {category?.title}
        </h3>
        <ul className="list-disc list-inside">
          {category?.lists.map((item, i) => (
            <li key={i} className="text-sm text-gray-500">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InfluencerCat;
