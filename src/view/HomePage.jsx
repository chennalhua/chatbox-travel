import React, { useEffect, useState } from "react";
import { callWeather } from "API/callWeather";
import WeatherBox from "components/WeatherBox";
import callPositionInfo from "API/callPostionInfo";
import { Decrypt } from "assets/function/AES";
import Search from "antd/es/input/Search";
import ImgHrefBox from "components/imgHrefBox";
import bg from 'assets/image/view/view-1.jpg'
import { Button, Card } from "antd";
import { ArrowRightOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import PlaceBox from "components/PlaceBox";
import TodoCard from "components/todo/TodoCard";
const HomePage = () => {
  let splideOptions = {
    rewind: true,
    width: "100%",
    gap: "-80px",
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
        perPage: 2,
      },
    },
  };

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
            setPositionInfoData(ResponseData), getWeatherAPI(ResponseData.city)
          );
        case "error":
          return getWeatherAPI("嘉義縣"); //!顯示抓不到
        default:
          return getWeatherAPI("嘉義縣");
      }
    };
    getPositionInfoAPI();
  }, []);

  let [userName, setUserName] = useState(null);
  let checkLogin = localStorage.getItem("_USERDATA");
  useEffect(() => {
    if (checkLogin !== null) {
      setUserName(JSON.parse(Decrypt(checkLogin))?.name);
    }
  }, [checkLogin]);

  return (
    <div
      className="bg-primary-light py-4"
      style={{ height: "83vh", overflow: "scroll" }}
    >
      {positionInfoData !== null && (
        <>
          <div className="container">
            <div className="row">
              <Search
                placeholder="搜尋"
                allowClear
                size="large"
              // onSearch={onSearch}
              />
              <div className="my-4">
                <ImgHrefBox img={bg}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 style={{ lineHeight: '28px' }}>探索台灣，<br />一次旅行滿足所有期待！</h5>
                    <Button type="primary" size="large" icon={<ArrowRightOutlined className='text-light' />} onClick={(_) => window.location.href = '/chat'}>立即前往</Button>
                  </div>
                </ImgHrefBox>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div>
                  <div className="icon-href">
                    <a href="_">
                      <img src={require('assets/image/icon/attractions.png')} className="img-fluid" />
                      <br />
                    </a>
                  </div>
                  <p className="text-center">景點</p>
                </div>
                <div>
                  <div className="icon-href">
                    <a href="_">
                      <img src={require('assets/image/icon/food.png')} className="img-fluid" alt="" />
                      <br />
                    </a>
                  </div>
                  <p className="text-center">美食</p>
                </div>
                <div>
                  <div className="icon-href">
                    <a href="_">
                      <img src={require('assets/image/icon/room.png')} className="img-fluid" alt="" />
                      <br />
                    </a>
                  </div>
                  <p className="text-center">住宿</p>
                </div>
              </div>
              {/* 推薦 */}
              <div>
                <h5 className="mt-4 mb-3"> 精選景點｜探索的必訪之地！</h5>
                <Splide hasTrack={false} options={splideOptions}>
                  <SplideTrack options={{ gap: "1em" }}>
                    {[1, 2, 3, 4, 5, 6, 7]?.map((item, index) => {
                      return (
                        <SplideSlide key={`slider-${index}`}>
                          <Card
                            style={{
                              width: 300,
                            }}
                            cover={
                              <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                              />
                            }
                            actions={[
                              <SettingOutlined key="setting" />,
                              <EditOutlined key="edit" />,
                              <EllipsisOutlined key="ellipsis" />,
                            ]}
                          >
                          </Card>
                        </SplideSlide>
                      );
                    })}
                  </SplideTrack>
                </Splide>
              </div>
              {/* 筆記 */}
              <div>
                <h5 className="mt-4 mb-3"> 我的旅遊筆記｜記錄每一段精彩旅程</h5>
                <TodoCard />
              </div>
              {/* <div className="col-12">
                <div className="row mt-4 align-items-center">
                  <div className="col-sm-4 text-center">
                    <img
                      src={require("assets/image/robot_.png")}
                      className="img-fluid"
                      width="150px" alt=""
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
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default HomePage;
