import { Decrypt } from "assets/function/AES";
import Icon from "components/Icon";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Tour from "reactour";
const Header = ({ userData }) => {
  const location = useLocation()
  //@ VALUE
  let [isTourShow, setIsTourShow] = useState(false)

  //@ Tour Setting
  const tourStepSetting = [
    {
      selector: '[data-tour="clear"]',
      content: '清除對話紀錄',
    },
    {
      selector: '[data-tour="keyword-list"]',
      content: '關鍵字快捷鍵，往右滑可看更多',
    }
  ]
  useEffect(() => {
  }, [userData]);
  return (
    <>
      {/* tour 導覽 */
        isTourShow &&
        <Tour
          onRequestClose={e => setIsTourShow(false)}
          steps={tourStepSetting}
          isOpen={isTourShow}
          accentColor='#f9ae2b'
          className="py-3 ps-4 pe-5 mx-3"
          rounded={5} //視窗弧形
        />
      }
      <div className="w-100">
        <div className="container">
          <div className="header-wrap">
            <h1 style={{ fontSize: "18px" }}>
              <span style={{ color: "#959595" }}>Hello,</span>
              <br />
              {userData !== null ? userData?.name : "User"}
            </h1>
            <div className="d-flex align-items-center">
              {
                location?.pathname == '/chat' &&
                <a href="#" className="btn text-dark me-3" onClick={e => (e.preventDefault(), setIsTourShow(true))}>
                  <Icon icon='map-solid' size={24} color="#000" />
                  <span className="text-dark d-block">指引</span>
                </a>
              }
              <div
                className="img-circle-mask"
                style={{ width: "45px", height: "45px" }}
              >
                <img
                  src={userData !== null ? userData?.picture : require('assets/image/user.jpg')}
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
