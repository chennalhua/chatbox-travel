import React, { useEffect, useState } from "react";
import Robot from "components/message/Robot";
import User from "components/message/User";
import scrollToBottom from "assets/function/scrollToBottom";
import fuzzyQuery from "assets/function/fuzzyQuery";
import { Loading } from "components/Loading";
import searchKeyword from "assets/data/searchKeyword";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import callTravel from "API/callTravel";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessages } from "../redux/action/chatAction";
const Chat = () => {
  const authData = useSelector(state => state.authRe);
  const allChatData = useSelector(state => state.chatRe);
  const dispatch = useDispatch()
  let data = [];

  //@ VALUE
  let [chatData, setChatData] = useState([]),
    [mesVal, setMesVal] = useState(""), //輸入框
    [keywordList, setKeyWordList] = useState([
      "如何使用",
      "天氣預報",
      "高雄景點",
      "台南美食",
      "台北住宿",
    ]),
    [isLoader, setIsLoader] = useState(false)

  //@ EVENT
  const handleEvent = {
    chat: async function (type, val) { //聊天對話 (type:類型 user(使用者) robot(機器人), val:value)
      let key = `key-${chatData?.length}`; //對話框 id key，給每個訊息唯一碼

      //@ run user message
      dispatch(addMessage({ // 儲存 chat data
        key: key,
        type: "user", // 表示為 "user" 對話類型
        component: { val }, //元件類型: 一般對話框，無特殊元件
      }))

      function robotParseKeyword(val) { //解析關鍵字
        let fuzzyKeyword = {
          allCity: fuzzyQuery(searchKeyword().allCity.rule, val)[0],
          citySeparate: fuzzyQuery(searchKeyword().citySeparate.rule, val)[0],
          weather: fuzzyQuery(searchKeyword().weather.rule, val)[0],
          attractions: fuzzyQuery(searchKeyword().attractions.rule, val)[0],
          food: fuzzyQuery(searchKeyword().food.rule, val)[0],
          hotel: fuzzyQuery(searchKeyword().hotel.rule, val)[0],
        }

        //@ run robot message modal
        async function runModal(key) {
          if (fuzzyKeyword?.attractions) { //* run 景點
            let res = await callTravel('attractions', val, authData?.tdxToken)
            let themeType = '景點'
            switch (key) { // 根據 key 給出機器人要丟出的類型
              case '1': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "card", data: res?.ResponseData, val, setMesVal, themeType },
                /* type:類型，card: 卡片式,chooseArea:地區下拉選單,chooseHaveCity:縣市按鈕
                  data:資料
                  val:value
                  setMesVal:子組件回傳更新的 state
                  themeType:主題類型
                */
              }))
              case '2': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "chooseAllCity", data, val, setMesVal, themeType },
              }));
              default: break;
            }
          } else if (fuzzyKeyword?.weather) {//* run 天氣
            let themeType = '天氣'
            if (fuzzyKeyword?.allCity) {
              return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "weather", data, val, setMesVal, themeType },
              }));
            } else {
              return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "chooseAllCity", data, val, setMesVal, themeType },
              }));
            }
          } else if (fuzzyKeyword?.food) { //* run 美食
            let themeType = '美食'
            let res = await callTravel('food', val, authData?.tdxToken)
            switch (key) {
              case '1': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "card", data: res?.ResponseData, val, setMesVal, themeType },
              }));
              case '2': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "chooseAllCity", data, val, setMesVal, themeType }
              }));
              default: break;
            }
          } else if (fuzzyKeyword?.hotel) { //* run 住宿
            let themeType = '住宿'
            let res = await callTravel('hotel', val, authData?.tdxToken)
            switch (key) {
              case '1': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "card", data: res?.ResponseData, val, setMesVal, themeType },
              }));
              case '2': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "chooseAllCity", data, val, setMesVal, themeType }
              }));
              default: break;
            }
          } else { //* no run
            switch (key) {
              case '1': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "chooseType", data, val, setMesVal },
              }));
              case '2': return dispatch(addMessage({
                key: key,
                type: "robot",
                component: { type: "text", data: '請提供更完整的條件\n景點查詢：ex. 台南市安平區景點\n天氣：ex.台南市天氣', val, setMesVal }
              }));
              default: break;
            }
          }
        }

        /*
          MODAL
          1 - 有符合縣市及區域
          2 - 都未符合
        */

        //判斷給出相對應要跑的模組 key
        if (fuzzyKeyword.allCity) { //查詢是否符合全縣市
          runModal('1')
        } else { //未符合縣市
          runModal('2')
        }
      }
      robotParseKeyword(val); //run 解析關鍵字
      setMesVal(""); //reset message
    },
    clearRecord: function (e) {
      setIsLoader(true)
      e.preventDefault()
      dispatch(clearMessages())
      setTimeout(() => { setIsLoader(false) }, 800)
    }
  };

  useEffect(() => {
    scrollToBottom("#chat");
  }, []);

  // useEffect(() => { // watch keyboard
  //   const keyDownHandler = e => {
  //     if (e.key == 'Enter') {
  //       e.preventDefault();
  //       handleEvent?.chat("user", mesVal)
  //     }
  //   };
  //   document.addEventListener('keydown', keyDownHandler);
  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, [mesVal]);


  //聊天室
  return (
    <>
      <Loading isLoader={isLoader} />
      <div className="chat-wrap">
        <div className="container">
          <div className="col-12 col-md-10 mx-auto">
            {/* 對話訊息框 */}
            <div className="chat-content" id="chat">
              {allChatData?.chatData?.length > 0 &&
                allChatData?.chatData?.map((item, index) => {
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
      <div className="bg-primary-light position-fixed w-100 py-3" style={{ bottom: '55px', zIndex: 10 }}>
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
                      className="badge rounded-pill text-bg-dark text-light"
                      style={{ fontSize: "16px" }}
                    >
                      + {item}
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="chat-input d-flex align-items-center mb-3">

              <a href="#" className="text-danger text-center me-2 clear" data-tour="clear" onClick={e => handleEvent?.clearRecord(e)}>
                <DeleteOutlined style={{ fontSize: '20px' }} />
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
                <SendOutlined style={{ fontSize: '20px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
