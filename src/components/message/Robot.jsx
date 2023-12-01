import React, { useEffect, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
import { DotLoader } from "components/Loading";
import scrollToBottom from "assets/function/scrollToBottom";
import cityCountyData from 'assets/data/cityCountyData.json'
import TextLongToDot from "assets/function/TextLongToDot";
import WeatherBox from "components/WeatherBox";
import { callWeather, getCityKey } from "API/callWeather";
const MesBox = ({ type, data, mes, setMesVal }) => {
  let [isLoader, setIsLoader] = useState(true),
    [modalData, setModalData] = useState(null);

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
  useEffect(() => {
    const getWeather = async () => {
      const response = await callWeather(getCityKey(mes));
      setWeatherData(response)
    }
    getWeather()
  }, [])

  //@ EVENT
  const handleEvent = {
    typeFormat: function (type, data) {
      switch (type) {
        case "text":
          return (
            <>
              <div className="bg-light p-3 rounded d-inline-block" style={{ whiteSpace: 'pre-line' }} >{data}</div>
            </>
          );
        case "card":
          return (
            <>
              <Splide hasTrack={false} options={splideOptions}>
                <SplideTrack options={{ gap: "1em" }}>
                  {data?.map((item, index) => {
                    return (
                      <SplideSlide key={`slider-${index}`}>
                        <div className="card me-2" style={{ width: "350px" }}>
                          <div
                            style={{
                              width: "100%",
                              height: "180px",
                              overflow: "hidden",
                            }}
                          >
                            {item?.images?.length > 0 ?
                              <img src={item?.images[0].src}
                                className="card-img-top"
                                alt={item?.name}
                              /> :
                              <img src={require('assets/image/robot.jpg')}
                                className="card-img-top"
                                alt={`${item?.name}-沒有相關圖片 QQ`}
                              />
                            }
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{item?.name}</h5>
                            <p
                              className="card-text"
                              dangerouslySetInnerHTML={{
                                __html: TextLongToDot(item?.introduction),
                              }}
                            ></p>
                            <div className="text-center">
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={(e) => (
                                  e.preventDefault(), setModalData(item)
                                )}
                              >
                                查看更多
                              </button>
                            </div>
                          </div>
                        </div>
                      </SplideSlide>
                    );
                  })}
                </SplideTrack>
              </Splide>
            </>
          );
        case "weather":
          return (
            <WeatherBox data={weatherData} />
          );
        case "chooseArea":
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
                    src={require('assets/image/robot.jpg')}
                    className="card-img-top"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-4">搜尋條件不足，請繼續提供線索!!</h5>
                  <select className="form-select" aria-label="Default select example" onChange={e => setMesVal(`${mes}${e.target.value}`)}>
                    <option selected disabled>請選擇</option>
                    {
                      cityCountyData?.data?.[0].areas.map((item, index) => {
                        return (<option value={item?.AREA_NAME}>{item?.AREA_NAME}</option>)
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          );
        case "chooseCity":
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
                    src={require('assets/image/robot.jpg')}
                    className="card-img-top"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-4">搜尋條件不足，請繼續提供線索!!</h5>
                  <select className="form-select" aria-label="Default select example" onChange={e => setMesVal(`${mes}${e.target.value}`)}>
                    <option selected disabled>請選擇</option>
                    {
                      cityCountyData?.data?.map((item, index) => {
                        return (<option value={item?.COU_NAME}>{item?.COU_NAME}</option>)
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          );
        case "chooseType":
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
                    src={require('assets/image/robot.jpg')}
                    className="card-img-top"
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-4">請問您想得到什麼類型的資訊呢？</h5>
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-primary w-100" onClick={e => setMesVal(`${mes}景點`)}>景點</button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-primary w-100" onClick={e => setMesVal(`${mes}天氣`)}>天氣</button>
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
      <div className="container">
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {modalData?.title}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={`https://picsum.photos/1000/1000?random=101`}
                  className="card-img-top"
                  width='50%'
                  alt=""
                />
                <p className="mt-3">{modalData?.introduction}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MesBox;
