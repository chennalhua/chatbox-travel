import React, { useState } from "react";
const Header = () => {
  return (
    <div className="container">
      <div className="header-wrap">
        <h1 style={{ fontSize: "24px" }}>
          <span style={{ fontSize: "16px", color: "#959595" }}>Hello,</span>
          <br />
          陳乃華
        </h1>
        <div
          className="img-circle-mask"
          style={{ width: "50px", height: "50px" }}
        >
          <img
            src="https://picsum.photos/100/100?random=1"
            className="img-fluid"
            alt="xxx"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
