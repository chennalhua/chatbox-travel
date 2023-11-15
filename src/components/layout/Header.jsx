import React, { useState } from "react";
const Header = () => {
  return (
    <div className="container">
      <div className="header-wrap">
        <h1 style={{ fontSize: "24px" }}>
          <span style={{ fontSize: "16px", color: "#959595" }}>Hello,</span>
          <br />
          User
        </h1>
        <div
          className="img-circle-mask"
          style={{ width: "50px", height: "50px" }}
        >
          <img
            src={`https://picsum.photos/1000/1000?random=100`}
            className="img-fluid"
            alt="xxx"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
