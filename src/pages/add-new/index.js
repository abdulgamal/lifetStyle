import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AContext } from "../../../context/AuthContext";
import { getDetails, postProducts, updatePage } from "../../../requests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const router = useRouter();
  const [genUrl, setGenUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const { user } = useContext(AContext);
  const [filenames, setFilenames] = useState([]);
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [slug, setSlug] = useState("");
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(6);
  const [price, setPrice] = useState(20);
  const [sale, setSale] = useState(20);
  const [errors, setErrors] = useState(null);

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

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(genUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    let values = {
      name,
      price,
      description,
      "images[]": filenames,
      slug,
      min_purchase: min,
      max_purchase: max,
      sale_price: sale,
    };
    setLoading(true);
    setErrors(null);
    try {
      const result = await postProducts(user?.token, values);
      if (result.status === 200) {
        setLoading(false);
        setName("");
        setDescription("");
        setPrice(0);
        setSale(0);
        setSlug("");
        setFilenames([]);
        notify("Product created successfully");
        setGenUrl(`${host}/product/${result?.data?.slug.split(" ").join("_")}`);
      } else {
        setErrors(result?.errors);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFile = async (e) => {
    setLoadingFile(true);
    const data = new FormData();
    data.append("upload_preset", "dukaapp");
    data.append("cloud_name", "dinfpnmrf");

    let images = e.target.files;
    let newImages = [];
    for (let i = 0; i < images.length; i++) {
      data.append("file", images[i]);
      let { url } = await fetch(
        "https://api.cloudinary.com/v1_1/dinfpnmrf/image/upload",
        {
          method: "POST",
          body: data,
        }
      ).then((response) => response.json());
      newImages.push(url);
    }
    setFilenames((prev) => [...prev, ...newImages]);
    setLoadingFile(false);
  };

  const fetchData = async () => {
    try {
      let { data } = await getDetails(router.query.q.split("_").join(" "));
      let urls = data?.images.map((image) => image.url);
      setDescription(data?.description);
      setName(data?.name);
      setPrice(data?.price);
      setSale(data?.sale_price);
      setFilenames(urls);
      setProduct(data);
      setMin(data?.min_purchase);
      setMax(data?.max_purchase);
      setSlug(data?.slug);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (e, id) => {
    e.preventDefault();
    let values = {
      name,
      price,
      description,
      "images[]": filenames,
      slug,
      min_purchase: min,
      max_purchase: max,
      sale_price: sale,
    };
    setLoading(true);
    setErrors(null);
    try {
      let res = await updatePage(user?.token, id, values);
      if (res.status === 200) {
        setLoading(false);
        setName("");
        setDescription("");
        setPrice(0);
        setSale(0);
        setSlug("");
        setFilenames([]);
        notify("Product updated successfully");
        setGenUrl(`${host}/product/${res?.data?.slug.split(" ").join("_")}`);
      } else {
        setErrors(res?.errors);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    let newArr = filenames.filter((file, i) => i !== id);
    setFilenames(newArr);
  };

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    if (router.query.q) {
      fetchData();
    }
  }, [router.query.q]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.origin;
      setHost(hostname);
    }
  }, []);
  // console.log(product);

  return (
    <>
      <Head>
        <title>Add New Product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ToastContainer />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto md:w-[80%] w-full">
          <h1 className="text-center text-2xl font-bold text-gray-600 sm:text-3xl">
            New Product
          </h1>

          <form className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Product name
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Bag"
                  required
                />
                {errors?.name && (
                  <span className="my-2 text-red-300 text-xs">
                    {errors.name.join("")}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Slug
                </label>
                <input
                  type="text"
                  id="category"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Fashion"
                  required
                />
                {errors?.slug && (
                  <span className="my-2 text-red-300 text-xs">
                    {errors.slug.join("")}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Price (KES)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    $
                  </span>
                  <input
                    type="text"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                    placeholder="20"
                  />
                </div>
                {errors?.price && (
                  <span className="my-2 text-red-300 text-xs">
                    {errors.price.join("")}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Sale Price (KES)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    $
                  </span>
                  <input
                    type="text"
                    id="price"
                    value={sale}
                    onChange={(e) => setSale(e.target.value)}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                    placeholder="20"
                  />
                </div>
                {errors?.sale_price && (
                  <span className="my-2 text-red-300 text-xs">
                    {errors.sale_price.join("")}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="min"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Min. Purchase
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="min"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    className="rounded-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                    placeholder="2"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="max"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Max. Purchase
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="max"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className=" rounded-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                    placeholder="6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Product description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
                {errors?.description && (
                  <span className="my-2 text-red-300 text-xs">
                    {errors.description.join("")}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFile}
                    multiple
                  />
                </label>
              </div>
              <div className="flex gap-2">
                {loadingFile && (
                  <div className="text-white flex flex-col items-center justify-center gap-2 bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
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
                    <p>Uploading Files</p>
                  </div>
                )}
                {filenames?.map((filename, i) => (
                  <div className="relative" key={i}>
                    <img className="w-16 h-16 rounded" src={filename} alt="" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      onClick={() => handleDelete(i)}
                      className="w-6 h-6 absolute -right-2 -top-2 text-red-400 cursor-pointer hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {router.query.q ? (
              <button
                type="submit"
                onClick={(e) => updateProduct(e, product?.id)}
                disabled={loading}
                className="text-white flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                Update URL
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleGenerate}
                disabled={loading}
                className="text-white flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                Generate URL
              </button>
            )}
            <div className="flex sm:w-auto">
              <input
                type="text"
                value={genUrl}
                onChange={(e) => setGenUrl(e.target.value)}
                id="website-admin"
                className="rounded-none rounded-l-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Generated URL"
              />
              {copied ? (
                <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                </span>
              ) : (
                <span
                  title="Copy to clipboard"
                  className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={copyContent}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                    />
                  </svg>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
