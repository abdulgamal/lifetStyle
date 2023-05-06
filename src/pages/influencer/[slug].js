import Empty from "@/components/Empty";
import InfluencerCard from "@/components/InfluencerCard";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const products = [
  {
    id: 1,
    title: "Dope Mocassins",
    img: "https://images.unsplash.com/photo-1678784973551-f38208de2529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDgwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    code: "Dope Mocassin",
    cat: "dress",
  },
  {
    id: 2,
    title: "Borderless Barber Shop",
    img: "https://images.unsplash.com/photo-1682957376808-dcb27d61f95e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8TThqVmJMYlRSd3N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    code: "Borderless",
    cat: "hang",
  },
  {
    id: 3,
    title: "Dope Jordans 3",
    img: "https://images.unsplash.com/photo-1679872995990-a9811773f3d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    code: "Dope Nikes",
    cat: "dress",
  },
  {
    id: 4,
    title: "Kanisa",
    img: "https://images.unsplash.com/photo-1682789196658-ef1c03fd2110?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fE04alZiTGJUUndzfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    code: "Kanisa",
    cat: "party",
  },
  {
    id: 5,
    title: "Nuria Library",
    img: "https://images.unsplash.com/photo-1682445392345-e764214b10e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fE04alZiTGJUUndzfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    code: "Nuria",
    cat: "hang",
  },
  {
    id: 6,
    title: "Burj Khalifa",
    img: "https://images.unsplash.com/photo-1682414593590-767a4016be89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfE04alZiTGJUUndzfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    code: "Dubai",
    cat: "vacation",
  },
  {
    id: 7,
    title: "Watamu",
    img: "https://images.unsplash.com/photo-1682687982141-0143020ed57a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    code: "Watamu",
    cat: "vacation",
  },
  {
    id: 8,
    title: "Santorini",
    img: "https://images.unsplash.com/photo-1682700370797-f9905bf866b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    code: "Santorini",
    cat: "Vacation",
  },
  {
    id: 9,
    title: "Nodo Eggs",
    img: "https://images.unsplash.com/photo-1636522637419-50322e27b0a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    code: "Poached Eggs",
    cat: "eat",
  },
  {
    id: 10,
    title: "Pink mushroom choyala",
    img: "https://images.unsplash.com/photo-1682423199837-e1f233a13de0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    code: "Bitten Rice",
    cat: "eat",
  },
  {
    id: 11,
    title: "Sharubati",
    img: "https://images.unsplash.com/photo-1681821671107-751c9f0ce619?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    code: "Cocktail",
    cat: "drink",
  },
  {
    id: 12,
    title: "Kahawa Tungu",
    img: "https://images.unsplash.com/photo-1681477578092-979cc57ba5f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    code: "Kahwa Tungu",
    cat: "drink",
  },
];

function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  const [prods, setProds] = useState([]);

  const filteredProds = (slug) => products.filter((p) => p.cat === slug);

  useEffect(() => {
    const data = filteredProds(slug);
    setProds(data);
  }, [slug]);
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 my-4 flex flex-col justify-center items-center">
        <img
          className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src="https://images.unsplash.com/photo-1682501428050-43a5e1ba78c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
        <div className="flex flex-col justify-center items-center my-1">
          <p className="text-xs font-semibold">Tracy Muriti</p>
          <p className="text-xs tracking-wider">Model | Writer</p>
        </div>

        {prods.length > 0 && (
          <div className="my-3">
            {prods.map((product) => (
              <InfluencerCard product={product} key={product.id} />
            ))}
          </div>
        )}

        {prods.length === 0 && (
          <div className="mt-6">
            <Empty />
          </div>
        )}
      </div>
    </>
  );
}

export default Slug;
