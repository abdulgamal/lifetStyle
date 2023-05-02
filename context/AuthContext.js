import React, { createContext, useEffect, useState } from "react";
import { getUsers } from "../requests";

export const AContext = createContext();
function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const handleAuth = (token, email) => {
    setUser({ token, email });
    localStorage.setItem("token", JSON.stringify({ token, email }));
  };
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchData = async () => {
    let res = await getUsers(user?.token);
    let value = {
      balance: res?.balance,
      email: res?.email,
      image: res?.image,
      name: res?.name,
    };
    setUserInfo(value);
  };

  useEffect(() => {
    const items = localStorage.getItem("token");
    if (items) {
      setUser(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user?.token]);

  return (
    <AContext.Provider value={{ user, handleAuth, logOut, userInfo }}>
      {children}
    </AContext.Provider>
  );
}

export default AuthContext;
