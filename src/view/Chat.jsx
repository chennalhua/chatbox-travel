import React, { useEffect, useState } from "react";
import Nav from "components/layout/Nav";
import Icon from "components/Icon";
import Robot from "components/message/Robot";
import User from "components/message/User";
import axios from "axios";
import scrollToBottom from "assets/function/scrollToBottom";
import fuzzyQuery from "assets/function/fuzzyQuery";
import { callAttractions } from "API/callAttractions";
import { Loading } from "components/Loading";
import searchKeyword from "assets/data/searchKeyword";
import { callFoodShop } from "API/callFoodShop";
const Chat = () => {
  let data = [];

  //@ VALUE
  let [chatData, setChatData] = useState([]),
    [mesVal, setMesVal] = useState(""), //輸入框
    [keywordList, setKeyWordList] = useState([
      "如何使用",
      "天氣預報",
      "台南安平區景點",
      "台南美食",
    ]),
    [isLoader, setIsLoader] = useState(false)

  useEffect(() => {
    let getHistoryData = localStorage.getItem('_HISTORY')
    if (getHistoryData !== null && getHistoryData !== undefined && getHistoryData !== 'undefined') {
      setChatData(JSON.parse(getHistoryData))
    }
  }, [])

  //@ EVENT
  const handleEvent = {
    chat: function (type, val) {
      let key = `key-${chatData?.length}`;

      setChatData(oldArray => [...oldArray, {
        key: key,
        type: "user",
        component: { val },
      }]);
      //* 解析關鍵字
      function robotParseKeyword(val) {
        let fuzzyKeyword = {
          allCity: fuzzyQuery(searchKeyword().allCity.rule, val)[0],
          city: fuzzyQuery(searchKeyword().city.rule, val)[0],
          area: fuzzyQuery(searchKeyword().area.rule, val)[0],
          weather: fuzzyQuery(searchKeyword().weather.rule, val)[0],
          attractions: fuzzyQuery(searchKeyword().attractions.rule, val)[0],
          food: fuzzyQuery(searchKeyword().food.rule, val)[0],
          haveCity: {
            taipeiArea: fuzzyQuery(searchKeyword().taipei.areaRule, val)[0],
            tainanArea: fuzzyQuery(searchKeyword().tainan.areaRule, val)[0]
          }
        }
        //@ run 模組
        function runModal(key) {
          if (fuzzyKeyword?.attractions) { //* run 景點
            let themeType = '景點'
            switch (key) {
              case '1': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "card", data: callAttractions(val).ResponseData, val, setMesVal, themeType },
              }]);
              case '2': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseArea", data, val, setMesVal, themeType },
              }]);
              case '3': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseHaveCity", data, val, setMesVal, themeType },
              }]);
              default: break;
            }
          } else if (fuzzyKeyword?.weather) {//* run 天氣
            let themeType = '天氣'
            if (fuzzyKeyword?.allCity) {
              return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "weather", data, val, setMesVal, themeType },
              }]);
            } else {
              return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseAllCity", data, val, setMesVal, themeType },
              }]);
            }
          } else if (fuzzyKeyword?.food) { //* run 美食
            let themeType = '美食'
            switch (key) {
              case '1': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "card", data: callFoodShop(val).ResponseData, val, setMesVal, themeType },
              }]);
              case '2': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseArea", data, val, setMesVal, themeType },
              }]);
              case '3': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseHaveCity", data, val, setMesVal,themeType }
              }]);
              default: break;
            }
          } else { //* no run
            switch (key) {
              case '1':
              case '2': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseType", data, val, setMesVal },
              }]);
              case '3': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "text", data: '請提供更完整的條件\n景點查詢：ex. 台南市安平區景點\n天氣：ex.台南市天氣', val, setMesVal }
              }]);
              default: break;
            }
          }
        }

        /*
          IF 是否符合所有縣市
              Y : 判斷台北或台南
                  Y : 判斷區域
                      Y : 給景點卡片
                      N : 根據縣市給區域 list
                  N : 讓選擇台北或台南
              N : 讓選擇台北或台南
          ---
          MODAL
          1 - 有符合縣市及區域
          2 - 只符合縣市
          3 - 都未符合
        */
        if (fuzzyKeyword.allCity) { //符合縣市
          if (fuzzyKeyword?.city) { //有符合台北 台南
            let thisCity = val.includes('台北') ? 'taipei' : 'tainan' //判斷文字是屬於哪個縣市
            if (fuzzyKeyword.haveCity[`${thisCity}Area`]) { //區域有符合
              runModal('1')
            } else { //未符合區域
              runModal('2')
            }
          } else {
            runModal('3')
          }
        } else { //未符合縣市
          runModal('3')
        }
      }
      robotParseKeyword(val);
      setMesVal(""); //reset
    },
    clearRecord: function (e) {
      setIsLoader(true)
      e.preventDefault()
      setChatData([])
      localStorage.removeItem('_HISTORY')
      setTimeout(() => { setIsLoader(false) }, 800)
    }
  };

  useEffect(() => {
    scrollToBottom("#chat");
  }, []);

  useEffect(() => {
    if (chatData?.length > 0) {
      localStorage.setItem('_HISTORY', JSON.stringify(chatData))
    }
  }, [chatData])


  //聊天室
  return (
    <>
      <Loading isLoader={isLoader} />
      <div className="chat-wrap">
        <div className="container">
          <div className="col-12 col-md-10 mx-auto">
            {/* 對話訊息框 */}
            <div className="chat-content" id="chat">
              {chatData?.length > 0 &&
                chatData?.map((item, index) => {
                  if (item?.type == 'user') {
                    return <User data={item?.component?.val} />
                  } else {
                    return <Robot type={item?.component?.type} data={item?.component?.data} mes={item?.component?.val} setMesVal={item?.component?.setMesVal} themeType={item?.component?.themeType} />
                  }
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="position-fixed w-100 bg-primary-light py-3" style={{ bottom: '58px', zIndex: 10 }}>
        <div className="container">
          <div className="col-12 col-md-10 mx-auto">
            <div className="mb-2 keyword-list d-flex" data-tour="keyword-list">
              {keywordList?.map((item, index) => {
                return (
                  <a
                    href="#"
                    className="mx-2"
                    onClick={(e) => setMesVal(item)}
                  >
                    <span
                      className="badge rounded-pill text-bg-secondary text-light"
                      style={{ fontSize: "16px" }}
                    >
                      + {item}
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="chat-input d-flex align-items-center">
              <a href="#" className="text-danger text-center me-2" data-tour="clear" onClick={e => handleEvent?.clearRecord(e)}>
                <Icon icon='trash' size={24} color="#dc3545" />
                <span className="d-block" style={{ fontSize: '14px', whiteSpace: 'pre' }}>清除紀錄</span>
              </a>
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                value={mesVal}
                onChange={(e) => setMesVal(e.target.value)}
              />
              <button
                type="button"
                className="btn chat-input-icon"
                onClick={(e) => handleEvent?.chat("user", mesVal)}
              >
                <Icon icon="send" size={24} color="#252525" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="position-absolute w-100" style={{ bottom: '60px' }}>
        <div className="bg-primary-light py-3">
          <div className="container">
            <div className="col-12 col-md-10 mx-auto">
              <div className="mb-2 keyword-list d-flex" data-tour="keyword-list">
                {keywordList?.map((item, index) => {
                  return (
                    <a
                      href="#"
                      className="mx-2"
                      onClick={(e) => setMesVal(item)}
                    >
                      <span
                        className="badge rounded-pill text-bg-secondary text-light"
                        style={{ fontSize: "16px" }}
                      >
                        + {item}
                      </span>
                    </a>
                  );
                })}
              </div>
              <div className="chat-input d-flex align-items-center">
                <a href="#" className="text-danger text-center me-2" data-tour="clear" onClick={e => handleEvent?.clearRecord(e)}>
                  <Icon icon='trash' size={24} color="#dc3545" />
                  <span className="d-block" style={{ fontSize: '14px', whiteSpace: 'pre' }}>清除紀錄</span>
                </a>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill"
                  value={mesVal}
                  onChange={(e) => setMesVal(e.target.value)}
                />
                <button
                  type="button"
                  className="btn chat-input-icon"
                  onClick={(e) => handleEvent?.chat("user", mesVal)}
                >
                  <Icon icon="send" size={24} color="#252525" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Chat;
