import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUsers, updateUser } from "../../requests";
import CardProfile from "./CardProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CardSettings({ user, token }) {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let values = {
      first_name: name,
      last_name: last,
      email,
      phone: number,
      password,
      password_confirmation: confirm,
      image: profileUrl,
    };
    setLoad(true);
    setErrors(null);
    try {
      const result = await updateUser(token, values);
      if (!result.success) {
        setErrors(result.errors);
      } else {
        notify("User Details updated successfully");
      }
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

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

  const handleFile = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "dukaapp");
    data.append("cloud_name", "dinfpnmrf");
    setLoading(true);
    try {
      let { url } = await fetch(
        "https://api.cloudinary.com/v1_1/dinfpnmrf/image/upload",
        {
          method: "POST",
          body: data,
        }
      ).then((response) => response.json());
      setProfileUrl(url);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    let results = await getUsers(token);
    setEmail(results?.email);
    setNumber(results?.phone);
    setName(results?.name?.split(" ")[0]);
    setLast(results?.name?.split(" ")[1]);
    setUserName(results?.name?.split(" ").join("."));
    setProfileUrl(results?.image);
  };

  useEffect(() => {
    if (!name) {
      fetchData();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="w-full lg:w-8/12 ">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-700 text-xl font-bold">My account</h6>
              <button
                className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Settings
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  {errors?.email && (
                    <span className="my-2 text-red-300 text-xs">
                      {errors.email.join("")}
                    </span>
                  )}
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  {errors?.first_name && (
                    <span className="my-2 text-red-300 text-xs">
                      {errors.first_name.join("")}
                    </span>
                  )}
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={last}
                      onChange={(e) => setLast(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  {errors?.last_name && (
                    <span className="my-2 text-red-300 text-xs">
                      {errors.last_name.join("")}
                    </span>
                  )}
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {errors?.password && (
                      <span className="my-2 text-red-300 text-xs">
                        {errors.password.join("")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-gray-300" />

              <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-600"
                      htmlFor="file_input"
                    >
                      Change Profile
                    </label>
                    <input
                      className="block w-full px-3 py-3 text-sm text-gray-600 rounded cursor-pointer bg-white shadow focus:outline-none"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                      onChange={handleFile}
                    />
                    <p
                      className="mt-1 text-sm text-gray-500"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-gray-300" />
              <div className=" my-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || load}
                  className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mr-3 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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
                  Update Details
                </button>
                <p className="text-xs text-gray-600">
                  Created on: {moment(user?.created_at).format("MMMM Do YYYY")}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <CardProfile user={profileUrl} name={name} email={email} />
      </div>
    </>
  );
}
