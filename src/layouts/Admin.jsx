import HeaderStats from "@/components/HeaderStats";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AContext } from "../../context/AuthContext";

export default function Admin({ children }) {
  const { user } = useContext(AContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-100 min-h-screen">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div>
      </div>
    </>
  );
}
