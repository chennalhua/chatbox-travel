import React, { useEffect, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { DotLoader } from "components/Loading";
import scrollToBottom from "assets/function/scrollToBottom";
import cityCountyData from "assets/data/cityCountyData.json";
import WeatherBox from "components/WeatherBox";
import { callWeather } from "API/callWeather";
import PlaceBox from "components/PlaceBox";
import { Card, Button } from "antd";
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
  let [weatherData, setWeatherData] = useState(null)
  //@ EVENT
  const handleEvent = {
    typeFormat: function (type, data) {
      let robotType = type;

      //-- 判斷如果設定為 card 但沒 data 表示搜尋不到
      if (type === 'card' && data.length <= 0) {
        robotType = 'text';
        data = `很抱歉尚未提供 "${mes}" 查詢`
      }

      switch (robotType) {
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
        case "chooseAllCity": //選擇縣市 list for weather
          return (
            <Card
              style={{ width: 350 }}
              cover={
                <img
                  alt="q&a"
                  src={require('assets/image/QUESTION.png')}
                  height={183}
                />
              }
            >
              <h5 className="mb-3">
                搜尋條件不足，請繼續提供線索!
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
            </Card>
          );
        case "chooseType": //選擇主題類型: 景點,美食,天氣
          return (
            <Card
              style={{ width: 350 }}
              cover={
                <img
                  alt="q&a"
                  src={require('assets/image/QUESTION.png')}
                  height={183}
                />
              }
              actions={[
                <Button color="default" variant="solid" onClick={(e) => (setMesVal(`${mes}景點`))}>景點</Button>,
                <Button color="default" variant="solid" onClick={(e) => (setMesVal(`${mes}美食`))}>美食</Button>,
                <Button color="default" variant="solid" onClick={(e) => (setMesVal(`${mes}住宿`))}>住宿</Button>,
              ]}
            >
              <h5 className="card-title">
                請問您想得到什麼類型的資訊呢？
              </h5>
            </Card>
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
          alt=""
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
