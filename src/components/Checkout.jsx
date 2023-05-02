import React, { useEffect, useState } from "react";
import { checkoutHandle } from "../../requests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function Checkout({ product, isToggle, setToggle }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [shipping, setShipping] = useState("");
  const [instruction, setInstruction] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderID, setOrderID] = useState("");

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

  const handleTransaction = async () => {
    let values = {
      name,
      email,
      mpesa_no: number,
      quantity: qty,
      shipping_address: shipping,
      page_id: product?.id,
      instruction,
    };
    setLoading(true);
    try {
      let res = await checkoutHandle(values);
      if (res?.Code == 200) {
        notify(res?.Description);
        setMerchantId(res?.MerchantRequestID);
        setOrderID(res?.order);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (merchantId) {
      const eventSource = new EventSource(
        `https://app.dukaapp.com/api/v1/mpesa/status/${merchantId}`
      );
      eventSource.onmessage = (e) => {
        if (e.data === "END-OF-STREAM") {
          eventSource.close();
          notify("The payment failed due to an unknown error");
          setMerchantId("");
        }

        if (e.data === "0" && e.data !== "") {
          eventSource.close();
          notify("The payment has been successfully made");
          setMerchantId("");
          router.replace(`/success/${orderID}`);
          // Redirect here
        }

        if (e.data === "1032") {
          eventSource.close();
          notify("You cancelled the payment, please try again");
          setMerchantId("");
        }

        if (e.data === "1037") {
          eventSource.close();
          notify("The payment failed due to payment response timeout");
          setMerchantId("");
        }

        if (e.data === "2001") {
          eventSource.close();
          notify(
            "Something went wrong; you might have entered a wrong PIN, refresh the page to try again"
          );
          setMerchantId("");
        }
        if (e.data === "NULL") {
          eventSource.close();
          notify("The payment failed due to an unknown error");
          setMerchantId("");
        }
      };

      return () => {
        eventSource.close();
      };
    }
  }, [merchantId]);

  return (
    <>
      <ToastContainer />
      <div
        id="small-modal"
        tabIndex="-1"
        className={`${
          !isToggle && "hidden"
        } fixed top-0 left-0 right-0 z-50 w-full  flex flex-col justify-center items-center bg-black/20 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}
      >
        <div className="relative w-full h-[80vh] overflow-scroll scrollbar-hide max-w-md">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="rounded-t-lg min-w-full"
              src={product?.images[0]?.url}
              alt=""
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {product?.name}
              </h5>
              <div className="my-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Shipping Address (Optional)
                </label>
                <textarea
                  type="text"
                  id="address"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Dennis Pritt"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="instruction"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Instructions (Optional)
                </label>
                <textarea
                  type="text"
                  id="instruction"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instruction..."
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  MPESA number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="071-2345-678"
                  required
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="qty"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="qty"
                  className="border border-gray-300 rounded-md p-1"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center mt-2">
                <p className="font-bold text-gray-700">Total</p>
                <p className="font-normal text-gray-700">
                  {product?.sale_price * qty}
                </p>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                data-modal-hide="small-modal"
                type="button"
                onClick={handleTransaction}
                className="text-white flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                Pay
              </button>
              <button
                data-modal-hide="small-modal"
                type="button"
                onClick={() => setToggle(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
