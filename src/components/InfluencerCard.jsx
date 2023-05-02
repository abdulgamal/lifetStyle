import React from "react";

function InfluencerCard({ product }) {
  return (
    <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100 mb-3">
      <img
        alt="Home"
        className="h-56 w-full rounded-md object-cover"
        src={product?.img}
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Address</dt>

            <dd className="font-medium">{product?.title}</dd>
          </div>
          <div>
            <dt className="sr-only">Price</dt>

            <dd className="text-xs text-gray-500">
              Access Code: {product?.code}
            </dd>
          </div>
        </dl>

        <div className="mt-3 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <a
                href="#"
                className="text-white bg-blue-600 py-1 px-4 rounded-xl"
              >
                Go To Link
              </a>
            </div>
          </div>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0 flex items-center gap-2">
              <p className="text-gray-500">Interested?</p>
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerCard;
