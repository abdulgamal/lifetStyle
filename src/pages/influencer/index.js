import CartSection from "@/components/CartSection";
import InfluencerCard from "@/components/InfluencerCard";
import Navbar from "@/components/Navbar";
import SocialsCard from "@/components/SocialsCard";
import React, { useState } from "react";
import { products } from "./[slug]";

const cats = [
  {
    id: 1,
    title: "How am dressed",
    bgImg:
      "https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    slug: "dress",
  },
  {
    id: 2,
    title: "What am eating",
    bgImg:
      "https://images.unsplash.com/photo-1682655012898-28f5c96a4c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    slug: "eat",
  },
  {
    id: 3,
    title: "What am drinking",
    bgImg:
      "https://plus.unsplash.com/premium_photo-1679397827203-b80924fb2351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    slug: "drink",
  },
  {
    id: 4,
    title: "Where am hanging out",
    bgImg:
      "https://images.unsplash.com/photo-1682957376808-dcb27d61f95e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8TThqVmJMYlRSd3N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    slug: "hang",
  },
  {
    id: 5,
    title: "My hair style",
    bgImg:
      "https://images.unsplash.com/photo-1682439263455-ad62d50ec0e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    slug: "hair",
  },
  {
    id: 6,
    title: "Where am vacationing",
    bgImg:
      "https://images.unsplash.com/photo-1682700371999-01262207ee4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ1fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    slug: "vacation",
  },
  {
    id: 7,
    title: "Where am partying at",
    bgImg:
      "https://images.unsplash.com/photo-1682946618072-fb615b0d0961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    slug: "party",
  },
];

function Influencer() {
  const [active, setActive] = useState("publish");
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 my-4 flex flex-col justify-center items-center">
        <img
          className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src="julie.jpeg"
          alt="Bordered avatar"
        />
        <div className="flex flex-col justify-center items-center my-1">
          <p className="text-xs font-semibold">Tracy Muriti</p>
          <p className="text-xs tracking-wider">Model | Writer</p>
        </div>

        <div className="border-b border-gray-200">
          <ul className="flex justify-between items-center -mb-px text-sm font-medium text-center text-gray-500">
            <li
              className={`${
                active === "publish" &&
                "text-blue-600 border-b-2 border-blue-600"
              } inline-flex gap-2 p-4 rounded-t-lg cursor-pointer`}
              onClick={() => setActive("publish")}
            >
              <span>{products.length}</span>
              Published
            </li>
            <li
              className={`${
                active === "categories" &&
                "text-blue-600 border-b-2 border-blue-600"
              } inline-flex gap-2 p-4 rounded-t-lg cursor-pointer`}
              onClick={() => setActive("categories")}
            >
              <span>{cats.length}</span>
              Categories
            </li>
            <li
              className={`${
                active == "socials" &&
                "text-blue-600 border-b-2 border-blue-600"
              } inline-flex gap-2 p-4 rounded-t-lg cursor-pointer`}
              onClick={() => setActive("socials")}
            >
              <span>3</span>
              Socials
            </li>
          </ul>
        </div>
        <div className="my-3">
          {active === "publish" ? (
            products.map((product) => (
              <InfluencerCard product={product} key={product.id} />
            ))
          ) : active === "categories" ? (
            <div className="grid grid-cols-2 gap-2">
              {cats.map((cat) => (
                <CartSection category={cat} key={cat.id} />
              ))}
            </div>
          ) : (
            <div className="my-3">
              <SocialsCard account={"Instagram"} />
              <SocialsCard account={"Twitter"} />
              <SocialsCard account={"Facebook"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Influencer;
