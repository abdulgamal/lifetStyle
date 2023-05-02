import Carousel from "@/components/Carousel";
import Checkout from "@/components/Checkout";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getDetails } from "../../../requests";

function Home() {
  const [last, setLast] = useState(5);
  const [isToggle, setIsToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();
  let { id } = query;

  const fetchData = async (id) => {
    setLoading(true);
    try {
      let { data } = await getDetails(id.split("_").join(" "));
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleOpen = () => {
    setLast(slides.length);
    setOpen(true);
  };
  const handleClose = () => {
    setLast(5);
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <Checkout product={product} isToggle={isToggle} setToggle={setIsToggle} />
      {product && (
        <div className="overflow-hidden bg-white md:hidden rounded-b-lg">
          <div className="md:flex-1 h-96 md:h-auto">
            <Carousel>
              {product?.images.map((image, i) => (
                <img
                  src={image?.url}
                  key={i}
                  className="object-cover h-96 min-w-full"
                />
              ))}
            </Carousel>
          </div>

          <div className="p-6 md:flex-1 md:flex md:flex-col justify-center">
            <div>
              <span className="text-xs font-medium text-blue-600 uppercase">
                Product
              </span>
              <h2 className="text-xl font-bold mb-1 text-gray-500 tracking-widest border-b-2 border-gray-200">
                {product?.name}
              </h2>
              <p className="leading-relaxed">{product?.description}</p>
            </div>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    product?.owner?.image ||
                    "https://img.freepik.com/free-icon/user_318-159711.jpg?size=338&ext=jpg&ga=GA1.2.1579534943.1675896791&semt=ais"
                  }
                  alt=""
                />
                <div className="font-medium ">
                  <div>{product?.owner?.name}</div>
                  <div className="text-sm text-gray-500 ">
                    Owner of the Product
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <p className="font-medium text-md mr-2 text-gray-400">Price:</p>
              {product?.price > product?.sale_price ? (
                <>
                  <span className="title-font line-through font-medium mr-2 text-sm md:text-2xl text-gray-400">
                    {product?.price}
                  </span>
                  <span className="title-font font-medium text-sm md:text-2xl text-gray-600">
                    {product?.sale_price}
                  </span>
                </>
              ) : (
                <span className="title-font font-medium text-sm md:text-2xl text-gray-600">
                  {product?.price}
                </span>
              )}
              <button
                onClick={() => setIsToggle(true)}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
      {product && (
        <section className="text-gray-600 hidden md:block">
          <div className="container px-5 py-6 mx-auto flex flex-wrap">
            <div className="flex w-full mb-6 flex-wrap justify-between">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-600 lg:w-1/3 lg:mb-0 mb-4">
                {product?.name}
              </h1>
              <button className="rounded-full w-10 h-10 bg-gray-300/40 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className={`relative grid grid-cols-4 gap-4 rounded-lg`}>
              {product?.images.length >= 5 &&
                product?.images.slice(0, last).map((image, index) => (
                  <div
                    className={`${index === 0 && "col-span-2 row-span-2"}`}
                    key={index}
                  >
                    <img
                      alt="gallery"
                      className="w-full h-full object-cover object-center block"
                      src={image?.url}
                    />
                  </div>
                ))}
              {product?.images.length == 4 &&
                product?.images.slice(0, last).map((image, index) => (
                  <div
                    className={`${
                      index === 0
                        ? "col-span-2 row-span-2"
                        : index === 3
                        ? "col-span-2"
                        : ""
                    }`}
                    key={index}
                  >
                    <img
                      alt="gallery"
                      className="w-full h-full object-cover object-center block"
                      src={image?.url}
                    />
                  </div>
                ))}
              {product?.images.length < 4 &&
                product?.images.map((image, index) => (
                  <div key={index}>
                    <img
                      alt="gallery"
                      className="w-full h-full object-cover object-center block"
                      src={image?.url}
                    />
                  </div>
                ))}
              {product?.images.length > 5 &&
                (!open ? (
                  <button
                    onClick={handleOpen}
                    className="absolute bottom-3 right-2 rounded-lg bg-white px-3 py-2 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                    Show all photos
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    className="absolute bottom-3 right-2 rounded-lg bg-white px-3 py-2 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                    Collapse photos
                  </button>
                ))}
            </div>
            <div className="my-4 w-1/2">
              <p className="leading-relaxed">{product?.description}</p>
            </div>
            <div className="my-4 w-full flex justify-between border-t-2 border-gray-100 pt-3">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    product?.owner?.image ||
                    "https://img.freepik.com/free-icon/user_318-159711.jpg?size=338&ext=jpg&ga=GA1.2.1579534943.1675896791&semt=ais"
                  }
                  alt=""
                />
                <div className="font-medium ">
                  <div>{product?.owner?.name}</div>
                  <div className="text-sm text-gray-500 ">
                    Owner of the Product
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 items-center">
                <p className="font-medium text-xs md:text-xl text-gray-400">
                  Price:
                </p>
                {product?.price > product?.sale_price ? (
                  <>
                    <span className="title-font line-through font-medium text-xs md:text-xl text-gray-400">
                      {product?.price}
                    </span>
                    <span className="title-font font-medium text-sm md:text-2xl text-gray-600">
                      {product?.sale_price}
                    </span>
                  </>
                ) : (
                  <span className="title-font font-medium text-sm md:text-2xl text-gray-600">
                    {product?.price}
                  </span>
                )}
                <button
                  onClick={() => setIsToggle(true)}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {!product && !loading && (
        <div className="grid h-screen px-4 bg-white place-content-center">
          <div className="text-center">
            <h1 className="font-black text-gray-200 text-9xl">404</h1>
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Uh-oh!
            </p>
            <p className="mt-4 text-gray-500">
              Sorry, the page you are looking for could not be found or has been
              removed.
            </p>
          </div>
        </div>
      )}
      {loading && (
        <div className="grid h-screen px-4 bg-white place-content-center">
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
        </div>
      )}
    </>
  );
}

export default Home;
