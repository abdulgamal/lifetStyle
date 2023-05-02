import CardPageVisits from "@/components/CardPageVisits";
import Admin from "@/layouts/Admin";
import { useContext } from "react";
import { AContext } from "../../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AContext);
  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <CardPageVisits token={user?.token} />
      </div>
    </Admin>
  );
}

// Dashboard.layout = Admin;
