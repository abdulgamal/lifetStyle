import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AContext } from "../../context/AuthContext";
import { withdraw } from "../../requests";

export default function HeaderStats() {
  const { userInfo, user } = useContext(AContext);
  const [loading, setLoading] = useState(false);

  const notify = (message) =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      let res = await withdraw(user?.token);
      if (res?.Code == 200) {
        setLoading(false);
        notify(res?.message);
      } else {
        notify("Something went wrong. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div
            id="stats"
            className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-white p-6 rounded-lg">
              <div className="flex flex-row space-x-4 items-center">
                <div id="stats-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                    Income
                  </p>
                  <p className="font-bold text-2xl inline-flex items-center space-x-2">
                    <span>KES {(+userInfo?.balance).toFixed(2)}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleWithdraw}
              disabled={loading}
              className="text-white inline-flex items-center justify-center disabled:cursor-not-allowed gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              )}
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
