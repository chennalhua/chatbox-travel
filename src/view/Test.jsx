// src/InstagramUserInfo.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userDataAction } from "../redux/action/userAction";

const InstagramUserInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDataAction({
      picture: require("assets/image/user.jpg"),
      name: "User",
    }))
  }, [])
  return (
    <div>
      <h1>Instagram User Info</h1>
    </div>
  );
};

export default InstagramUserInfo;
