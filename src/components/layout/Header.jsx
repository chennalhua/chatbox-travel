import { Decrypt } from "assets/function/AES";
import Icon from "components/Icon";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tour from "reactour";
const Header = ({ userData, darkMode, setDarkMode }) => {
  const location = useLocation(),
    router = useNavigate();
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
  useEffect(() => {}, [userData]);
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
      <div className="w-100">
        <div className="container">
          <div className="header-wrap">
            <div className="d-flex align-items-center">
              {location?.pathname == "/detail" && (
                <a
                  href="#"
                  className="me-4"
                  onClick={(e) => (e.preventDefault(), router(-1))}
                >
                  <Icon
                    icon="arrow-left"
                    size={24}
                    color="#000"
                    className="arrow-left"
                  />
                </a>
              )}
              <h1 style={{ fontSize: "18px" }}>
                <span style={{ color: "#959595" }}>Hello,</span>
                <br />
                {userData !== null ? userData?.name : "User"}
              </h1>
            </div>
            <div className="d-flex align-items-center">
              <div className="form-check form-switch form-switch-lg mb-0 me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="darkMode"
                  checked={darkMode == "dark" && "checked"}
                  onChange={(e) =>
                    e.target.checked
                      ? (setDarkMode("dark"),
                        localStorage.setItem("darkMode", "dark"))
                      : (setDarkMode("light"),
                        localStorage.setItem("darkMode", "light"))
                  }
                />
                {darkMode == "dark" ? (
                  <Icon icon="sun" size={24} color="#fff" className="ms-2" />
                ) : (
                  <Icon
                    icon="moon"
                    size={22}
                    color="#212529"
                    className="ms-2"
                  />
                )}
                <label className="form-check-label" for="darkMode"></label>
              </div>
              {location?.pathname == "/chat" && (
                <a
                  href="#"
                  className="btn text-dark me-3 clear"
                  onClick={(e) => (e.preventDefault(), setIsTourShow(true))}
                >
                  <Icon icon="map-solid" size={24} color="#000" />
                  <span className="text-dark d-block">指引</span>
                </a>
              )}
              <div
                className="img-circle-mask"
                style={{ width: "45px", height: "45px" }}
              >
                <img
                  src={
                    userData !== null
                      ? userData?.picture
                      : require("assets/image/user.jpg")
                  }
                  className="img-fluid"
                  alt="xxx"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
