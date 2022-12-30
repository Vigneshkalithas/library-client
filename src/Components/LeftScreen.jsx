import React from "react";
import "../Styles/LeftScreen.css";
import Logo from "../assets/book.svg";
import Logo1 from "../assets/book2.svg";
import Logo2 from "../assets/book3.svg";

function LeftScreen({ headline, paragraph }) {
  return (
    <div className="Left">
      <div className="leftscreeN">
        <img src={Logo2} alt="" className="left-screen-logo" />
        <h1>Welcome</h1>
        <h1>Ancient Library</h1>
        {/* <h1>ANCIENT LIBRARY</h1> */}
      </div>
    </div>
  );
}

export default LeftScreen;
