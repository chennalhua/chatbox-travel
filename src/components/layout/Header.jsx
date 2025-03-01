import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Tour from "reactour";
const Header = () => {
  const location = useLocation(),
    router = useNavigate();
  //@ REDUX
  const userData = useSelector(state => state.userRe);
  //@ VALUE
  let [isTourShow, setIsTourShow] = useState(false);

  //@ Tour Setting
  const tourStepSetting = [
    {
      selector: '[data-tour="clear"]',
      content: "清除對話紀錄",
    },
    {
      selector: '[data-tour="keyword-list"]',
      content: "關鍵字快捷鍵，往右滑可看更多",
    },
  ];

  return (
    <>
      {
        /* tour 導覽 */
        isTourShow && (
          <Tour
            onRequestClose={(e) => setIsTourShow(false)}
            steps={tourStepSetting}
            isOpen={isTourShow}
            accentColor="#f9ae2b"
            className="py-3 ps-4 pe-5 mx-3"
            rounded={5} //視窗弧形
          />
        )
      }
      <div className="w-100 bg-primary-light">
        <div className="container">
          <div className="header-wrap">
            <div className="d-flex align-items-center">
              {(location?.pathname !== "/") && (
                <Button className="me-2" size="large" shape="circle" color="default" icon={<ArrowLeftOutlined />} onClick={(e) => (e.preventDefault(), router(-1))}></Button>

              )}
              <h1 className="mb-0" style={{ fontSize: "18px" }}>
                <span style={{ color: "#959595" }} className="me-2">Hello,</span>
                {userData?.userData !== null ? userData?.userData?.name : "旅行者"}
              </h1>
            </div>
            <div className="d-flex align-items-center">
              {
                location?.pathname == "/" &&
                <div
                  className="img-circle-mask me-3"
                  style={{ width: "45px", height: "45px" }}
                >
                  <img
                    src={
                      userData?.userData !== null
                        ? userData?.userData?.picture
                        : require("assets/image/user.jpg")
                    }
                    className="img-fluid"
                    alt="xxx"
                  />
                </div>
              }
              {/* <Button shape="circle" size="large" onClick={(_) => window.location.href = '/member'}><UserOutlined /></Button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
