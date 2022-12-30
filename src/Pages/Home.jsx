import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import emoji from "../assets/memoji1.png";
import emoji2 from "../assets/memoji2.png";
import axios from "axios";
import { Config } from "../Config/Config";

function Home() {
  const [role, setRole] = useState();
  const [student, setStudent] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [details, setDetails] = useState([]);

  const FetchUserDetails = async (id) => {
    const User = await axios.post(`${Config.api}/user/singleuserdetail/${id}`);
    setDetails(User.data.Student);
  };
  const FetchAdminDetails = async (id) => {
    setIsAdmin(true);
    const Admin = await axios.post(
      `${Config.api}/user/singleadmindetail/${id}`
    );

    setDetails(Admin.data.Student);
  };
  useEffect(() => {
    const Role = localStorage.getItem("role");
    setRole(Role);
    const id = localStorage.getItem("id");
    if (Role == "admin") {
      FetchAdminDetails(id);
    } else {
      FetchUserDetails(id);
    }
  }, []);

  return (
    <>
      <div className="home-right">
        <div className="home-head">
          <div>
            <h2>Home</h2>
          </div>
          <div className="profile-head">
            <div className="emoji-head">
              <img src={emoji2} alt="emoji" className="emoji-user" />
              <h3>Hi , {isAdmin ? details.name : details.stname}</h3>
              {/* <img
                src={role == "admin" ? emoji : emoji2}
                alt="emoji"
                className={role == "admin" ? "emoji-admin" : "emoji-user"}
              />
              <h3>Hi {role}</h3> */}
            </div>
            <div className="emoji-content">
              <div>
                <span>
                  <h2>Name :</h2>
                  <h2>{isAdmin ? details.name : details.stname}</h2>
                </span>
                <span>
                  <h2>Email :</h2>
                  <h2>{isAdmin ? details.email : details.mail}</h2>
                </span>
                {!isAdmin ? (
                  <>
                    <span>
                      <h2>Id :</h2>
                      <h2>{details.userId}</h2>
                    </span>
                    <span>
                      <h2>Reg :</h2>
                      <h2>{details.regno}</h2>
                    </span>
                    <span>
                      <h2>Dept :</h2>
                      <h2>{details.dept}</h2>
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
