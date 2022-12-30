import React, { useEffect } from "react";
import "../Styles/Notification.css";
import { report } from "../Helper/Tables";
import {
  AiFillExclamationCircle,
  AiFillWarning,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";

const notificationData = [
  {
    variant: "alert",
    icon: <AiFillExclamationCircle />,
    head: "Did you know?",
    note: "i Here is something that you might like to know.",
  },
  {
    variant: "warning",
    icon: <AiFillWarning />,
    head: "Did you know?",
    note: "i Here is something that you might like to know.",
  },
  {
    variant: "Incorrect",
    icon: <AiFillCloseCircle />,
    head: "Did you know?",
    note: "i Here is something that you might like to know.",
  },
  {
    variant: "success",
    icon: <AiFillCheckCircle />,
    head: "Did you know?",
    note: "i Here is something that you might like to know.",
  },
];

function Notification() {
  const Navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "admin") {
      Navigate("/");
      console.error("Not Authorized");
    }
  }, []);

  return (
    <>
      <div className="all-books-right">
        <div className="allbooks-head">
          <div>
            <h2>Notifications</h2>
          </div>
          <div className="notication-card-head">
            {notificationData.map((x) => {
              return (
                <div className="notify-card" key={x.index}>
                  <div className={`left-border ${x.variant}-border`}></div>
                  <div className={`logo-notify ${x.variant}`}>{x.icon}</div>
                  <div className="notify-content">
                    <h2> {x.head}</h2>
                    <h3>{x.note}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
