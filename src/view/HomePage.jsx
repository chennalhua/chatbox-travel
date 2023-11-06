import React, { useState } from "react";
import Nav from "components/layout/Nav";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
const HomePage = () => {
  let splideSlideList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let splideSlideValue = "400px";
  let splideOptions = {
    rewind: true,
    width: "100%",
    // height: splideSlideValue,
    gap: "0.5em",
    type: "loop",
    // padding: "-100px",
    perPage: 1,
    focus: "start",
    pagination: true,
    arrows: false,
  };
  return (
    <div className="bg-primary-light py-4" style={{ height: "90vh" }}>
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
      </div>
      <div className="ps-3">
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
                      src={`https://picsum.photos/400/400?random=${index + 1}`}
                      alt={`img-${index}`}
                    />
                  </div>
                </SplideSlide>
              );
            })}
          </SplideTrack>
        </Splide>
      </div>
      <Nav />
    </div>
  );
};
export default HomePage;
