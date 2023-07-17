import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [userCookie, setUserCookie] = useState(false);
  const [adminCookie, setAdminCookies] = useState(false);
  const location = useLocation();
  // console.log(location.state);
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
      {Cookies.get("type") === "admin" ? (
        <AdminHome resetPass={!location?.state?.reset_password} />
      ) : (
        <UserHome resetPass={!location?.state?.reset_password} />
      )}
    </div>
  );
};

export default Home;
