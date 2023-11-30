import React, { useEffect, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "components/Icon";
import dayjs from "dayjs";
import { getWeek } from "assets/function/dateTool";
import { DotLoader } from "components/Loading";
import scrollToBottom from "assets/function/scrollToBottom";
const MesBox = ({ type, data }) => {
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

  //@ EVENT
  const handleEvent = {
    typeFormat: function (type, data) {
      switch (type) {
        case "text":
          return (
            <div className="bg-light p-3 rounded d-inline-block">{data}</div>
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
                            <img
                              src={`https://picsum.photos/1000/1000?random=${
                                index + 1
                              }`}
                              className="card-img-top"
                              alt=""
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{item?.title}</h5>
                            <p
                              className="card-text"
                              dangerouslySetInnerHTML={{
                                __html: item?.introduction,
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
            <div className="bg-light p-3 rounded d-inline-block">
              <p>為您顯示目前天氣</p>
              <div className="bg-primary-light p-3 rounded">
                {/* 主要目前天氣 */}
                <div className="d-flex align-items-center">
                  <Icon
                    icon="sun"
                    size={40}
                    color="#353535"
                    className="text-center"
                  />
                  <div className="fw-bolder ms-4 text-dark">
                    <p className="my-0">
                      {dayjs().format("YYYY/MM/DD")}{" "}
                      <span className="ms-2">{getWeek(dayjs().day())}</span>
                    </p>
                    <p className="my-0" style={{ fontSize: "20px" }}>
                      25 °C
                    </p>
                  </div>
                </div>
                <hr />
                {/* 其他天氣資訊 */}
                <div className="mt-2 fw-bolder">
                  <div className="row justify-content-center">
                    <div className="col-3 text-center">
                      <div>
                        10時 <p>25 °C</p>
                      </div>
                    </div>
                    <div className="col-3 text-center">
                      <div>
                        12時 <p>30 °C</p>
                      </div>
                    </div>
                    <div className="col-3 text-center">
                      <div>
                        14時 <p>29 °C</p>
                      </div>
                    </div>
                    <div className="col-3 text-center">
                      <div>
                        16時 <p>25 °C</p>
                      </div>
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
