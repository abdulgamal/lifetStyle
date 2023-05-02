import Link from "next/link";
import React, { useEffect, useState } from "react";
import { deletePage, getPages } from "../../requests";

export default function CardPageVisits({ token }) {
  const [host, setHost] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      let res = await deletePage(token, id);
      if (res.status === 200) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCopy = async (slug) => {
    try {
      let url = `${host}/product/${slug}`;
      await navigator.clipboard.writeText(url);
      alert("Url copied successfully");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const fetchData = async () => {
    setLoad(true);
    let results = await getPages(token);
    let urls = results?.data?.map((res) => ({
      slug: res.slug.split(" ").join("_"),
      id: res.id,
    }));
    setData(urls);
    setLoading(false);
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.origin;
      setHost(hostname);
    }
  }, []);
  return (
    <>
      <div className="w-full lg:w-8/12 ">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          Generated Pages
        </h2>

        {data?.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Generated Url
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((url) => (
                  <tr className="bg-white border-b" key={url.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {`${host}/product/${url.slug}`}
                    </th>
                    <td className="px-6 py-4">
                      <Link
                        href={`/add-new?q=${url.slug}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteHandler(url?.id)}
                        disabled={loading}
                        className="font-medium text-red-600 hover:underline cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-green-600 hover:underline"
                        onClick={() => handleCopy(url?.slug)}
                      >
                        Copy
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/product/${url.slug}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data?.length === 0 && !load && (
          <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 opacity-20">
              You do not have any pages Yet!
            </h5>
            <p className="font-normal text-gray-700 opacity-20">
              You can add products on the add Product toggle on the right
            </p>
          </div>
        )}
        {load && data?.length === 0 && (
          <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 opacity-20">
              Products page Loading
            </h5>
            <p className="font-normal text-gray-700 opacity-20">
              Might take sometime
            </p>
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
