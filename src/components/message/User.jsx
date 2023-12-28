import React, { useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
import { Decrypt } from "assets/function/AES";
const MesBox = ({ type, data }) => {
  const handleStyle = {
    imgMask: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  };

  let userData = localStorage?.getItem("_LOGINDATA");

  return (
    <>
      <div className="mt-2 mb-4">
        <div className="text-end">
          <img
            src={
              userData !== null
                ? JSON.parse(Decrypt(userData))?.picture
                : require("assets/image/user.jpg")
            }
            className="img-fluid"
            style={handleStyle?.imgMask}
          />
        </div>
        <div className="mt-2 text-end">
          <div className="bg-light p-3 rounded d-inline-block light-box">{data}</div>
        </div>
      </div>
    </>
  );
};
export default MesBox;
