import React, { useEffect, useState } from "react";
import Nav from "components/layout/Nav";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
import { callWeather } from "API/callWeather";
import WeatherBox from "components/WeatherBox";
import callPositionInfo from "API/callPostionInfo";
import Map from "components/Map";
const HomePage = () => {
  //@ VALUE
  let [weatherData, setWeatherData] = useState(null),
    [positionInfoData, setPositionInfoData] = useState(null)

  //@ EVENT
  useEffect(() => {
    const getWeatherAPI = async (val) => {
      const response = await callWeather(val);
      response[0] && setWeatherData(response[1])
    }

    const getPositionInfoAPI = async () => {
      const res = await callPositionInfo()
      let { ResponseCode, ResponseData } = res
      switch (ResponseCode) {
        case 'success': return (setPositionInfoData(ResponseData), getWeatherAPI(ResponseData.city))
        case 'error': return //!顯示抓不到
        default: break;
      }
    }
    getPositionInfoAPI()

  }, [])

  return (
    <div
      className="bg-primary-light pb-4"
      style={{ height: "85vh", overflow: "scroll" }}
    >
      {positionInfoData !== null &&
        <>
          <Map position={[positionInfoData?.latitude, positionInfoData?.longitude]} />
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mt-4 ms-2">
                  <div className="rounded p-3" style={{ background: `rgba(255,255,255,0.3)` }}>
                    您目前位置是
                    <p>{positionInfoData.city}</p>
                    <p>{positionInfoData.locality}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                {weatherData !== null && <WeatherBox data={weatherData} />}
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};
export default HomePage;
