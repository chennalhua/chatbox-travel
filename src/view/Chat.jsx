import React, { useEffect, useState } from "react";
import Nav from "components/layout/Nav";
import Icon from "components/Icon";
import Robot from "components/message/Robot";
import User from "components/message/User";
import axios from "axios";
import scrollToBottom from "assets/function/scrollToBottom";
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
      "台南景點推薦",
      "台南美食",
    ]);

  //@ EVENT
  const handleEvent = {
    setChatData: function (type, val) {
      setMesVal(""); //reset
      let historyData = chatData;
      let key = `key-${chatData?.length}`;

      historyData.push({
        key: key,
        type: "user",
        component: <User data={val} />,
      });
      //* 解析關鍵字
      function robotParseKeyword(val) {
        if (val.includes("天氣")) {
          historyData.push({
            key: key,
            type: "robot",
            component: <Robot type="weather" data={data} />,
          });
        } else if (val.includes("景點")) {
          historyData.push({
            key: key,
            type: "robot",
            component: <Robot type="card" data={data} />,
          });
        } else {
          historyData.push({
            key: key,
            type: "robot",
            component: <Robot type="text" data='尚無搜尋到推薦' />,
          });
        }
      }
      robotParseKeyword(val);
      setChatData(historyData);
    },
  };

  useEffect(() => {
    scrollToBottom("#chat");
  }, []);

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
                  return item?.component;
                })}
              {/* <User data="為我推薦台南景點" />
              <Robot type="card" data={data} />
              <User data="我要搜尋高雄美食" />
              <Robot type="text" data="不好意思，目前搜尋不到任何美食" />
              <User data="請給我目前的天氣預報" />
              <Robot type="weather" data="不好意思，目前搜尋不到任何景點" /> */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-12 col-md-8">
            <div className="chat-input-wrap">
              <div className="mb-2">
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
                  onClick={(e) => handleEvent?.setChatData("user", mesVal)}
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
