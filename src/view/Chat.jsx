import React, { useEffect, useState } from "react";
import Nav from "components/layout/Nav";
import Icon from "components/Icon";
import Robot from "components/message/Robot";
import User from "components/message/User";
import axios from "axios";
import scrollToBottom from "assets/function/scrollToBottom";
import fuzzyQuery from "assets/function/fuzzyQuery";
import { callAttractions } from "API/callAttractions";
const Chat = () => {
  //景點 data
  let data = [
    {
      title: "將軍漁港",
      img: "",
      introduction:
        "\r\n漁船回港後，琳瑯滿目的漁獲在港邊拍賣的熱鬧景象，一直是將軍漁港在許多遊客心中的印象。",
      open_time: "全年開放",
      address: "725 臺南市將軍區平沙里156號",
    },
    {
      title: "安平老街",
      img: "",
      introduction:
        "\r\n漁船回港後，琳瑯滿目的漁獲在港邊拍賣的熱鬧景象，一直是將軍漁港在許多遊客心中的印象。",
      open_time: "全年開放",
      address: "725 臺南市將軍區平沙里156號",
    },
    {
      title: "將軍漁港",
      img: "",
      introduction:
        "\r\n漁船回港後，琳瑯滿目的漁獲在港邊拍賣的熱鬧景象，一直是將軍漁港在許多遊客心中的印象。",
      open_time: "全年開放",
      address: "725 臺南市將軍區平沙里156號",
    },
    {
      title: "將軍漁港",
      img: "",
      introduction:
        "\r\n漁船回港後，琳瑯滿目的漁獲在港邊拍賣的熱鬧景象，一直是將軍漁港在許多遊客心中的印象。",
      open_time: "全年開放",
      address: "725 臺南市將軍區平沙里156號",
    },
  ];

  //@ VALUE
  let [chatData, setChatData] = useState([]),
    [mesVal, setMesVal] = useState(""), //輸入框
    [keywordList, setKeyWordList] = useState([
      "現在天氣",
      "台北信義區景點",
      "台北美食",
    ]);

  useEffect(() => {
    let getHistoryData = localStorage.getItem('_HISTORY')
    console.log(JSON.parse(getHistoryData))
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
        let keyWord = {
          allCity: { rule: /台北|臺北|基隆|新北|宜蘭|新竹市|新竹縣|桃園|苗栗|台中市|臺中市|台中|臺中|彰化|南投|嘉義市|嘉義縣|雲林|台南|臺南|台南|臺南|高雄|屏東|台東|花蓮|澎湖|金門|連江/ },
          city: { rule: /台北|台北市|臺北|臺北市/ },
          area: { rule: /區/ },
          weather: { rule: /天氣|溫度|幾度|度/ },
          attractions: { rule: /景點|好玩|玩|地方/ }
        }
        let fuzzyKeyWord = {
          allCity: fuzzyQuery(keyWord.allCity.rule, val)[0],
          city: fuzzyQuery(keyWord.city.rule, val)[0],
          area: fuzzyQuery(keyWord.area.rule, val)[0],
          weather: fuzzyQuery(keyWord.weather.rule, val)[0],
          attractions: fuzzyQuery(keyWord.attractions.rule, val)[0]
        }

        //@ run 模組
        function runModal(key) {
          console.log(key)
          if (fuzzyKeyWord?.attractions) { //* run 景點
            switch (key) {
              case '1': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "card", data: callAttractions(val), val, setMesVal },
              }]);
              case '2': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseArea", data, val, setMesVal },
              }]);
              case '3': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseArea", data, val, setMesVal },
              }]);
              case '4': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseArea", data, val, setMesVal },
              }]);
              default: break;
            }
          } else if (fuzzyKeyWord?.weather) {//* run 天氣
            if (fuzzyKeyWord?.allCity) {
              return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "weather", data, val, setMesVal },
              }]);
            } else {
              return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseCity", data, val, setMesVal },
              }]);
            }
          } else { //* no run
            switch (key) {
              case '1':
              case '2':
              case '3': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "chooseType", data, val, setMesVal },
              }]);
              case '4': return setChatData(oldArray => [...oldArray, {
                key: key,
                type: "robot",
                component: { type: "text", data: '請提供更完整的條件\n景點查詢：ex. 台北市信義區景點\n天氣：ex.台北市天氣', val, setMesVal }
              }]);
              default: break;
            }
          }
        }

        if (fuzzyKeyWord?.city && fuzzyKeyWord?.area) {// 符合 台北市 臺北市 有區
          runModal('1')
        } else if (fuzzyKeyWord?.city && !fuzzyKeyWord?.area) {// 符合 台北市 臺北市 沒區
          runModal('2')
        } else if (!fuzzyKeyWord?.city && fuzzyKeyWord?.area) { //符合區域
          runModal('3')
        } else if (!fuzzyKeyWord?.city && !fuzzyKeyWord?.area) {
          runModal('4')
        }
      }
      robotParseKeyword(val);
      setMesVal(""); //reset
    },
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
                    return <Robot type={item?.component?.type} data={item?.component?.data} mes={item?.component?.val} setMesVal={item?.component?.setMesVal} />
                  }
                })}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-12 col-md-8">
            <div className="chat-input-wrap">
              <div className="mb-2 keyword-list d-flex">
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
        <Nav />
      </div>
    </>
  );
};
export default Chat;
