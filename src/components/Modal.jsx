import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AContext } from "../../context/AuthContext";
import { resetPassword, verifyPassword } from "../../requests";

function Modal({ isToggle, setToggle }) {
  const router = useRouter();
  const [active, setActive] = useState("Reset");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const { handleAuth } = useContext(AContext);
  const [errMessage, setErrMessage] = useState(null);
  const [errors, setErrors] = useState("");

  const resetPass = async (e) => {
    e.preventDefault();
    let values = {
      email,
    };
    setLoading(true);
    try {
      let res = await resetPassword(values);
      setLoading(false);
      if (res.status === 200) {
        setActive("Verify");
      } else {
        setErrors(res.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const verifyPass = async (e) => {
    e.preventDefault();
    let values = {
      email,
      password,
      password_confirmation: confirm,
      token: otp,
    };
    setLoad(true);
    setErrMessage(null);
    try {
      let res = await verifyPassword(values);
      if (!res.success) {
        setErrMessage(res.errors);
        setLoad(false);
      } else {
        handleAuth(res.token, email);
        setLoad(false);
        router.replace("/add-new");
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !isToggle && "hidden"
      } fixed top-0 left-0 right-0 z-50 w-full flex flex-col justify-center items-center bg-black/20 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            onClick={() => setToggle(false)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
            <ul className="flex flex-wrap justify-center items-center -mb-px">
              <li className="mr-2">
                <span
                  onClick={() => setActive("Reset")}
                  className={`inline-block p-4 border-b-2 ${
                    active === "Reset"
                      ? "border-blue-600"
                      : "border-transparent"
                  } rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer`}
                >
                  Reset
                </span>
              </li>
              <li className="mr-2">
                <span
                  // onClick={() => setActive("Verify")}
                  className={`inline-block p-4 border-b-2 ${
                    active === "Verify"
                      ? "border-blue-600"
                      : "border-transparent"
                  } rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer`}
                  aria-current="page"
                >
                  Verify
                </span>
              </li>
            </ul>
          </div>
          {active === "Reset" ? (
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900">
                Recover Your Password
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                  {errors && (
                    <span className="my-2 text-red-300 text-xs">{errors}</span>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={resetPass}
                  className="w-full flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                  Receive email with OTP
                </button>
                <div className="text-sm font-medium text-gray-500">
                  Not registered?{" "}
                  <Link
                    href="/sign-up"
                    className="text-blue-700 hover:underline"
                  >
                    Create account
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className="px-6 py-6 lg:px-8">
              <h4 className="mb-4 text-xl font-medium text-gray-900">
                An OTP has been sent to your email
              </h4>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="**************"
                    required
                  />
                  {errMessage?.password && (
                    <span className="my-2 text-red-300 text-xs">
                      {errMessage.password.join("")}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="**************"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123"
                    required
                  />
                </div>
                {errMessage && (
                  <span className="my-2 text-red-300 text-xs">
                    {errMessage}
                  </span>
                )}
                <button
                  type="submit"
                  onClick={verifyPass}
                  className="w-full flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {load && (
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
                  Reset Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
