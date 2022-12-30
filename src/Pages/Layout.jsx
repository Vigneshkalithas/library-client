import React from "react";
import "../Styles/Home.css";
import LeftScreen from "../Components/LeftScreen";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    // <div className="head-home">
    <div className="App-child">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
