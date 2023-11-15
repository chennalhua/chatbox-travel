import React, { useState } from "react";
import Nav from "components/layout/Nav";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
const HomePage = () => {
  let splideSlideList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let splideSlideValue = "400px";
  let splideOptions = {
    rewind: true,
    width: "100%",
    gap: "0.5em",
    type: "loop",
    focus: "start",
    pagination: true,
    arrows: false,
    breakpoints: {
      992: {
          perPage: 3
      },
      768: {
          perPage: 2
      },
      576: {
          perPage: 1,
      },
  }
  };
  return (
    <div
      className="bg-primary-light py-4"
      style={{ height: "85vh", overflow: "scroll" }}
    >
      <div className="container">
        <div className="chat mb-4">
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="搜尋"
            />
            <a href="#" className="mx-3">
              <Icon icon="search" color="#252525" size={24} />
            </a>
          </div>
        </div>
        {/* slide */}
        <div>
          <Splide hasTrack={false} options={splideOptions}>
            <SplideTrack options={{ gap: "1em" }}>
              {splideSlideList?.map((item, index) => {
                return (
                  <SplideSlide key={`slider-${index}`}>
                    <div
                      className="splide-img-wrap"
                      style={{
                        width: splideSlideValue,
                        height: splideSlideValue,
                      }}
                    >
                      <img
                        src={`https://picsum.photos/1000/1000?random=${
                          index + 1
                        }`}
                        alt={`img-${index}`}
                      />
                    </div>
                  </SplideSlide>
                );
              })}
            </SplideTrack>
          </Splide>
        </div>
        {/* weather */}
        <div className="mt-4 ms-2">
          <div className="row justify-content-between align-items-center p-2 rounded">
            <div className="col-6 d-flex align-items-center">
              <Icon
                icon="sun"
                size={50}
                color="#353535"
                className="text-center"
              />
              <div className="fw-bolder ms-4 text-dark">
                <p className="my-0">
                  {dayjs().format("YYYY/MM/DD")}{" "}
                  <span className="ms-2">{getWeek(dayjs().day())}</span>
                </p>
                <p className="my-0" style={{ fontSize: "28px" }}>
                  25 °C
                </p>
              </div>
            </div>
            <div className="col-6 text-end">
              <img
                src={require("assets/image/weather/sun.png")}
                className="img-fluid"
                width={200}
              />
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
};
export default HomePage;
