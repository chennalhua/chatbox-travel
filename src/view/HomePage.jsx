import React, { useEffect, useState } from "react";
import Nav from "components/layout/Nav";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
import { callWeather } from "API/callWeather";
import WeatherBox from "components/WeatherBox";
const HomePage = () => {
  //@ VALUE
  let [weatherData, setWeatherData] = useState(null)
  //@ EVENT
  useEffect(() => {
    const getWeather = async () => {
      const response = await callWeather('高雄');
      response[0] && setWeatherData(response[1])
    }
    getWeather()
  }, [])

  return (
    <div
      className="bg-primary-light pb-4"
      style={{ height: "85vh", overflow: "scroll" }}
    >
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={`https://picsum.photos/1920/800?random=1`}
              className="img-fluid"
            />
          </div>
          <div className="carousel-item">
            <img
              src={`https://picsum.photos/1920/800?random=2`}
              className="img-fluid"
            />
          </div>
          <div className="carousel-item">
            <img
              src={`https://picsum.photos/1920/800?random=3`}
              className="img-fluid"
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {/* weather */}
        {
          weatherData !== null &&
          <WeatherBox data={weatherData} />
        }
      </div>
      {/* <Nav /> */}
    </div>
  );
};
export default HomePage;
