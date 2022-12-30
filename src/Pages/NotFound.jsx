import React from "react";
import "../Styles/NotFound.css";
import BookLogo from "../assets/book404.svg";

function NotFound() {
  return (
    <>
      <div className="notfound-head">
        <div className="not-found">
          <h3>Error</h3>
          <h1>4</h1>
          <div className="image404Head">
            <img src={BookLogo} alt="logo404" className="rotate" />
          </div>
          <h1>4</h1>
        </div>
      </div>
    </>
  );
}

export default NotFound;
