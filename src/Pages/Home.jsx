import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

const Home = () => {
  const [userCookie, setUserCookie] = useState(false);
  const [adminCookie, setAdminCookies] = useState(false);

  const getCookies = () => {
    if (Cookies.get("user")) {
      setUserCookie(true);
    } else if (Cookies.get("admin")) {
      setAdminCookies(true);
    }
  };

  useEffect(() => {
    getCookies();
  }, []);

  return (
    <div>
      {
        Cookies.get("type") === "admin" ? <AdminHome/> : <UserHome />
      }
      
    </div>
  );
};

export default Home;
