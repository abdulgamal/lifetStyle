import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { paySuccess } from "../../../requests";

function Index() {
  const { query } = useRouter();
  let { id } = query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSuccess = async (id) => {
    setLoading(true);
    try {
      let res = await paySuccess(id);
      if (res?.code === 200) {
        setData(res?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      handleSuccess(id);
    }
  }, [id]);
  return (
    <section className="h-screen py-7">
      {data && (
        <>
          <h2 className="text-xl text-center md:text-3xl my-4">
            Payment Success For:
            <br /> {data?.name}
          </h2>
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-50 py-12 md:py-24">
              <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
                <div className="flex items-center gap-4">
                  <img
                    src="https://paysoko.com/asset/brands/brand_1676528257.png"
                    className="h-6 mr-3 sm:h-9"
                    alt="Logo"
                  />
                </div>

                <div>
                  <p className="text-2xl font-medium tracking-tight text-gray-900">
                    Order Details
                  </p>
                </div>
                <div>
                  <div className="flow-root">
                    <p className="flex items-start -mx-2">
                      <span className="mx-2 text-gray-700">Payment Type:</span>
                      <span className="mx-2 text-gray-400">
                        Digital Payment
                      </span>
                    </p>
                    <p className="flex items-start -mx-2">
                      <span className="mx-2 text-gray-700">
                        Payment Gateway:
                      </span>
                      <span className="mx-2 text-gray-400">Paysoko</span>
                    </p>
                    <p className="flex items-start -mx-2">
                      <span className="mx-2 text-gray-700">
                        Payment Status:
                      </span>
                      <span className="mx-2 text-gray-400">
                        {data?.payment_status}
                      </span>
                    </p>
                    <p className="flex items-start -mx-2">
                      <span className="mx-2 text-gray-700">Order Status:</span>
                      <span className="mx-2 text-gray-400">Pending</span>
                    </p>
                    <p className="flex items-start -mx-2">
                      <span className="mx-2 text-gray-700">Owner Number:</span>
                      <span className="mx-2 text-gray-400">
                        {data?.owner?.phone}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-medium tracking-tight text-gray-900">
                    Billing Details
                  </p>
                </div>
                <div>
                  <div className="flow-root">
                    <p className="flex items-start -mx-2">
                      <span className="mx-2 text-gray-700">Name:</span>
                      <span className="mx-2 text-gray-400">{data?.name}</span>
                    </p>
                    <p className="flex items-start -mx-2">
                      <span className="mx-2 text-gray-700">Email:</span>
                      <span className="mx-2 text-gray-400">{data?.email}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                    <thead>
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                          Quantity
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                          Price
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          X{data?.quantity}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          KES {data?.total}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          Tax
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          %
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          Shipping
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          Kes 0
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          Subtotal
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          Kes {data?.total}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          Total
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          Kes {data?.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Link
                  href="/"
                  className="block w-full rounded-md bg-blue-500 text-center p-2.5 my-3 text-sm text-white transition hover:shadow-lg"
                >
                  Back To Home
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {loading && (
        <div className="h-full flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    </section>
  );
}

export default Index;
