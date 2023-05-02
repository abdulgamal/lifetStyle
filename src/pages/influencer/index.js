import InfluencerCard from "@/components/InfluencerCard";
import InfluencerCat from "@/components/InfluencerCat";
import Navbar from "@/components/Navbar";
import SocialsCard from "@/components/SocialsCard";
import React, { useState } from "react";

const products = [
  {
    id: 1,
    title: "Dope Red Jordans 3",
    img: "jordans.jpeg",
    code: "Dope Nikes",
  },
  {
    id: 2,
    title: "Borderless Barber Shop",
    img: "borderless.jpeg",
    code: "Borderless",
  },
  {
    id: 3,
    title: "Dope Red Jordans 3",
    img: "jordans.jpeg",
    code: "Dope Nikes",
  },
  {
    id: 4,
    title: "Borderless Barber Shop",
    img: "borderless.jpeg",
    code: "Borderless",
  },
];

const cats = [
  {
    id: 1,
    title: "How I am dressed",
    lists: ["Dope Nikey", "Mavado Watch", "Red Shirt"],
  },
  {
    id: 2,
    title: "What I am drinking",
    lists: ["Old Fashion", "Smoothie", "Tequila Shot"],
  },
  {
    id: 3,
    title: "How I am dressed",
    lists: ["Dope Nikey", "Mavado Watch", "Red Shirt"],
  },
  {
    id: 4,
    title: "What I am drinking",
    lists: ["Old Fashion", "Smoothie", "Tequila Shot"],
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
              } inline-flex gap-2 p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer`}
              onClick={() => setActive("publish")}
            >
              <span>4</span>
              Published
            </li>
            <li
              className={`${
                active === "categories" &&
                "text-blue-600 border-b-2 border-blue-600"
              } inline-flex gap-2 p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer`}
              onClick={() => setActive("categories")}
            >
              <span>4</span>
              Categories
            </li>
            <li
              className={`${
                active == "socials" &&
                "text-blue-600 border-b-2 border-blue-600"
              } inline-flex gap-2 p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer`}
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
            cats.map((cat) => <InfluencerCat category={cat} key={cat.id} />)
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
