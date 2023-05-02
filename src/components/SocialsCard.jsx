import React from "react";

function SocialsCard({ account }) {
  return (
    <div className="flex items-center space-x-4 mb-3">
      <img className="w-10 h-10 rounded-full" src="julie.jpeg" alt="" />
      <div className="font-medium text-gray-500">
        <div className="hover:underline cursor-pointer">@tracy_muriti</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {account}
        </div>
      </div>
    </div>
  );
}

export default SocialsCard;
