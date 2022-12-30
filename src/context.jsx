import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Config } from "./Config/Config";

export const MyContext = createContext("");

const AppContext = ({ children }) => {
  const [adminID, setAdminID] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // const lrole = localStorage.getItem("role");
    // if (
    //   lrole == "admin" ||
    //   lrole == "user" ||
    //   userRole == "admin" ||
    //   userRole == "user"
    // ) {
    //   navigate("/");
    // } else {
    //   navigate("/login");
    // }
  }, []);

  return (
    <MyContext.Provider
      value={{
        adminID,
        setAdminID,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AppContext;
