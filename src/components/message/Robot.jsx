import React, { useEffect, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
import { DotLoader } from "components/Loading";
import scrollToBottom from "assets/function/scrollToBottom";
import cityCountyData from "assets/data/cityCountyData.json";
import WeatherBox from "components/WeatherBox";
import { callWeather } from "API/callWeather";
import PlaceBox from "components/PlaceBox";
import { callFoodShop } from "API/callFoodShop";
import fuzzyQuery from "assets/function/fuzzyQuery";
import searchKeyword from "assets/data/searchKeyword";
const MesBox = ({ type, data, mes, setMesVal, themeType }) => {
  let [isLoader, setIsLoader] = useState(true);
  let [arr, setArr] = useState([]);

  const handleStyle = {
    imgMask: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  };

  let splideOptions = {
    rewind: true,
    width: "100%",
    gap: "-25px",
    type: "loop",
    focus: "start",
    pagination: false,
    arrows: false,
    breakpoints: {
      992: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  };

  //@ VALUE
  let [weatherData, setWeatherData] = useState(null),
    [foodData, setFoodData] = useState([])
  let thisCity = fuzzyQuery(searchKeyword().taipei.rule, mes)[0] ? '台北市' : '台南市'
  //@ EVENT
  const handleEvent = {
    typeFormat: function (type, data) {
      switch (type) {
        case "text": //文字框
          return (
            <>
              <div
                className="bg-light p-3 rounded d-inline-block light-box"
                style={{ whiteSpace: "pre-line" }}
              >
                {data}
              </div>
            </>
          );
        case "card": //卡片
          return (
            <>
              <Splide hasTrack={false} options={splideOptions}>
                <SplideTrack options={{ gap: "1em" }}>
                  {data?.map((item, index) => {
                    return (
                      <SplideSlide key={`slider-${index}`}>
                        <PlaceBox item={item} setArr={setArr} themeType={themeType} />
                      </SplideSlide>
                    );
                  })}
                </SplideTrack>
              </Splide>
            </>
          );
        case "weather": //天氣
          return <WeatherBox data={weatherData} />;
        case "chooseArea": //選擇區域
          return (
            <div>
              <div className="card me-2" style={{ width: "335px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={require("assets/image/QUESTION.png")}
                    className="card-img-top"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    搜尋條件不足，請繼續提供線索!!
                  </h5>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setMesVal(`${thisCity}${e.target.value}${themeType}`)}
                  >
                    <option selected disabled>
                      請選擇
                    </option>
                    {
                      cityCountyData?.data.filter((val) => {
                        if (thisCity == val.COU_NAME) {
                          return val
                        }
                      }).map((item) => {
                        return (
                          item.areas.map((kitem, kindex) => {
                            return (
                              <option value={kitem?.AREA_NAME}>
                                {kitem?.AREA_NAME}
                              </option>
                            );
                          })
                        )
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          );
        case "chooseHaveCity": //選擇目前提供查詢的縣市
          return (
            <div>
              <div className="card me-2" style={{ width: "335px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={require("assets/image/QUESTION.png")}
                    className="card-img-top"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    {`目前僅提供以下縣市資訊..><`}
                  </h5>
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-primary w-100"
                        onClick={(e) => setMesVal(`台北${themeType}`)}
                      >
                        台北
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-primary w-100"
                        onClick={(e) => setMesVal(`台南${themeType}`)}
                      >
                        台南
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "chooseAllCity": //選擇縣市 list for weather
          return (
            <div>
              <div className="card me-2" style={{ width: "335px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={require("assets/image/QUESTION.png")}
                    className="card-img-top"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    搜尋條件不足，請繼續提供線索!!
                  </h5>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setMesVal(`${e.target.value}${themeType}`)}
                  >
                    <option selected disabled>
                      請選擇
                    </option>
                    {cityCountyData?.data?.map((item, index) => {
                      return (
                        <option value={item?.COU_NAME}>{item?.COU_NAME}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          );
        case "chooseType": //選擇主題類型: 景點,美食,天氣
          return (
            <div>
              <div className="card me-2" style={{ width: "335px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={require("assets/image/robot.jpg")}
                    className="card-img-top"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    請問您想得到什麼類型的資訊呢？
                  </h5>
                  <div className="row">
                    <div className="col-4">
                      <button
                        className="btn btn-primary w-100"
                        onClick={(e) => setMesVal(`${mes}景點`)}
                      >
                        景點
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-primary w-100"
                        onClick={(e) => setMesVal(`${mes}美食`)}
                      >
                        美食
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-primary w-100"
                        onClick={(e) => setMesVal(`${mes}天氣`)}
                      >
                        天氣
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          break;
      }
    },
  };

  useEffect(() => {
    const getWeather = async () => {
      const response = await callWeather(mes);
      response[0] && setWeatherData(response[1]);
    };
    getWeather();

    const getFood = async () => {
      const response = await callFoodShop(mes);
      setFoodData(response);
    };
    getFood();

    setTimeout(() => {
      setIsLoader(false);
    }, 800);
  }, []);

  useEffect(() => {
    scrollToBottom("#chat");
  }, [isLoader]);

  return (
    <>
      <div className="mb-4 position-relative">
        <img
          src={require("assets/image/robot.jpg")}
          className="img-fluid"
          style={handleStyle?.imgMask}
        />
        {isLoader ? (
          <DotLoader isLoader={isLoader} />
        ) : (
          <div className="mt-2">{handleEvent?.typeFormat(type, data)}</div>
        )}
      </div>
    </>
  );
};
export default MesBox;
