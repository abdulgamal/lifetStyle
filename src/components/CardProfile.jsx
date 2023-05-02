import React from "react";

export default function CardProfile({ user, name, email }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className=" h-[200px] w-[200px] -mt-10">
                <img
                  alt="..."
                  src={
                    user ||
                    "https://img.freepik.com/free-icon/user_318-159711.jpg?size=338&ext=jpg&ga=GA1.2.1579534943.1675896791&semt=ais"
                  }
                  className="shadow-xl rounded-full h-full w-full align-middle border-none"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
              {name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
              {email}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
