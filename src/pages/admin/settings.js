import CardSettings from "@/components/CardSettings";
import Admin from "@/layouts/Admin";
import { useContext } from "react";
import { AContext } from "../../../context/AuthContext";

export default function Settings() {
  const { user } = useContext(AContext);

  return (
    <Admin>
      <div className="flex flex-wrap">
        <CardSettings token={user?.token} />
      </div>
    </Admin>
  );
}
