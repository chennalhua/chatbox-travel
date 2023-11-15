import React, { useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
const MesBox = ({ type, data }) => {
  const handleStyle = {
    imgMask: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  };

  return (
    <>
      <div className="mt-2 mb-4">
        <div className="text-end">
          <img
            src={`https://picsum.photos/1000/1000?random=100`}
            className="img-fluid"
            style={handleStyle?.imgMask}
          />
        </div>
        <div className="mt-2 text-end">
          <div className="bg-light p-3 rounded d-inline-block">{data}</div>
        </div>
      </div>
    </>
  );
};
export default MesBox;
