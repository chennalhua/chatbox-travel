import { Decrypt } from "assets/function/AES";
import React, { useEffect, useState } from "react";
const Header = ({ userData }) => {
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <div className="container">
      <div className="header-wrap">
        <h1 style={{ fontSize: "24px" }}>
          <span style={{ fontSize: "16px", color: "#959595" }}>Hello,</span>
          <br />
          {userData !== null ? userData?.name : "User"}
        </h1>
        <div
          className="img-circle-mask"
          style={{ width: "50px", height: "50px" }}
        >
          <img
            src={userData !== null ? userData?.picture : require('assets/image/user.jpg')}
            className="img-fluid"
            alt="xxx"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
