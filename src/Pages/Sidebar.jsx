import React, { useEffect, useState } from "react";
import "../Styles/Sidebar.css";
import dashboardlogo from "../assets/book.svg";
import allBooks from "../assets/allbooks.png";
import singleBook from "../assets/singleBook.png";
import home from "../assets/home.png";
import bell from "../assets/icons8-notification-48.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../Config/Config";
import toast, { Toaster } from "react-hot-toast";
import ediTLogo from "../assets/icons8-edit-100.png";
import returnLogo from "../assets/icons8-return-64.png";
import issueLogo from "../assets/icons8-magazine-50.png";
import allIssueLogo from "../assets/icons8-issue-58.png";

function Sidebar() {
  const [role, setRole] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const Role = localStorage.getItem("role");
    setRole(Role);
  }, []);

  async function Logout() {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(`${Config.api}/user/logout`, {
        token,
      });
      console.log(result);
      localStorage.clear();
      toast.success(result.data.message);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.success(error.data.message);
    }
  }
  return (
    <div className="sidebar-head">
      <div className="dashboard-logo-head">
        <img src={dashboardlogo} alt="logo" />
        <h1>Ancient Library</h1>
      </div>
      <div>
        {role == "user" ? (
          <ul className="sidebar-ul">
            <li onClick={() => navigate("/")}>
              <span>
                <img src={home} alt="db-logo" />
              </span>
              <h3>Home</h3>
            </li>
            <li onClick={() => navigate("/allbooks")}>
              <span>
                <img src={allBooks} alt="db-logo" />
              </span>
              <h3>All Books</h3>
            </li>
            <li onClick={() => navigate("/yourbooks")}>
              <span>
                <img src={singleBook} alt="db-logo" />
              </span>
              <h3>Your Books</h3>
            </li>
            <li onClick={() => navigate("/notifications")}>
              <span>
                <img src={bell} alt="db-logo" />
              </span>
              <h3>Notifications</h3>
            </li>
          </ul>
        ) : (
          <ul className="sidebar-ul">
            {" "}
            <li onClick={() => navigate("/")}>
              <span>
                <img src={home} alt="db-logo" />
              </span>
              <h3>Home</h3>
            </li>
            <li onClick={() => navigate("/all")}>
              <span>
                <img src={allBooks} alt="db-logo" />
              </span>
              <h3>All Books</h3>
            </li>
            <li onClick={() => navigate("/managebooks")}>
              <span>
                <img src={ediTLogo} alt="db-logo" />
              </span>
              <h3>Manage Books</h3>
            </li>
            <li onClick={() => navigate("/issuerequests")}>
              <span>
                <img src={issueLogo} alt="db-logo" />
              </span>
              <h3>Issue Request</h3>
            </li>
            <li onClick={() => navigate("/allissuerequests")}>
              <span>
                <img src={allIssueLogo} alt="db-logo" />
              </span>
              <h3>All Issued Books</h3>
            </li>
            <li onClick={() => navigate("/allstudents")}>
              <span>
                <img src={returnLogo} alt="db-logo" />
              </span>
              <h3>Student Lists</h3>
            </li>
          </ul>
        )}
      </div>
      <div className="signout-head">
        <button className="signout-btn" onClick={Logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
