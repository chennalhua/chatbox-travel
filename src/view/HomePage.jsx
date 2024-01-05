import React, { useEffect, useState } from "react";
import { callWeather } from "API/callWeather";
import WeatherBox from "components/WeatherBox";
import callPositionInfo from "API/callPostionInfo";
import { Decrypt } from "assets/function/AES";
const HomePage = () => {
  //@ VALUE
  let [weatherData, setWeatherData] = useState(null),
    [positionInfoData, setPositionInfoData] = useState("嘉義縣");

  //@ EVENT
  useEffect(() => {
    const getWeatherAPI = async (val) => {
      const response = await callWeather(val);
      response[0] && setWeatherData(response[1]);
    };

    const getPositionInfoAPI = async () => {
      const res = await callPositionInfo();
      let { ResponseCode, ResponseData } = res;
      switch (ResponseCode) {
        case "success":
          return (
            setPositionInfoData({ city: "嘉義縣" }),
            getWeatherAPI(ResponseData.city)
          );
        case "error":
          return getWeatherAPI("嘉義"); //!顯示抓不到
        default:
          return getWeatherAPI("嘉義");
      }
    };
    getPositionInfoAPI();
  }, []);

  let [userName, setUserName] = useState(null);
  let checkLogin = localStorage.getItem("_LOGINDATA");
  useEffect(() => {
    if (checkLogin !== null) {
      setUserName(JSON.parse(Decrypt(checkLogin))?.name);
    }
  }, [checkLogin]);

  return (
    <div
      className="bg-primary-light pb-4"
      style={{ height: "90vh", overflow: "scroll" }}
    >
      {positionInfoData !== null && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row mt-4 align-items-center">
                  <div className="col-sm-4 text-center">
                    <img
                      src={require("assets/image/robot_.png")}
                      className="img-fluid"
                      width="150px"
                    />
                  </div>
                  <div className="col-sm-8">
                    <div className="message-box mx-2">
                      <div className="text">
                        <span
                          className="fw-bolder"
                          style={{ fontSize: "18px" }}
                        >
                          <span style={{ fontSize: "26px" }}>👋</span>,{" "}
                          {userName}
                        </span>
                        <span className="mt-2 d-block">
                          歡迎使用！您準備踏上一段冒險之旅尋找放鬆身心的景點。我將提供您景點提示、美食推薦。一起打造出美好回憶的旅程吧！
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 pb-4">
                {weatherData !== null && (
                  <WeatherBox data={weatherData} location={positionInfoData} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default HomePage;
