import React, { useEffect, useRef, useState } from "react";
import Header from "components/layout/Header";
import { Loading } from "components/Loading";
import axios from "axios";
import url from "url";
import jwtDecode from "jwt-decode";
import randomStr from "assets/function/randomStr";
import Nav from "components/layout/Nav";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginAction, userDataAction } from '../redux/action/userAction'
import { callTdxTokenAPI } from "API/callAuth";
import { tdxTokenAction } from "../redux/action/authAction";
import dayjs from "dayjs";
const RouterWrapper = ({ children }) => {
  //@ REDUX
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userRe);
  const authData = useSelector(state => state.authRe);

  //@ REF
  const APIRef = useRef(null)

  //@ VALUE
  let [isLoading, setIsLoading] = useState(true),
    [darkMode, setDarkMode] = useState("light"); //深色模式
  const state = randomStr(20);
  const nonce = randomStr(25);

  function encodeSearchParams(obj) {
    const params = [];
    Object.keys(obj).forEach((key) => {
      let value = obj[key];
      if (typeof value === "undefined") {
        value = "";
      }
      params.push([key, encodeURIComponent(value)].join("="));
    });

    return params.join("&");
  }
  const lineLogin = () => {
    let link = "https://access.line.me/oauth2/v2.1/authorize?";
    link += "response_type=code";
    link += `&client_id=${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`;
    link += `&redirect_uri=${process.env.REACT_APP_LINE_LOGIN_CALLBACK_URL}`;
    link += `&state=${state}`;
    link += `&nonce=${nonce}`;
    link += "&scope=openid%20profile";
    link += "&bot_prompt=normal";
    window.location.href = link;
  };
  const getAccessToken = (callbackURL) => {
    var urlParts = url.parse(callbackURL, true);
    var query = urlParts.query;
    var hasCodeProperty = Object.prototype.hasOwnProperty.call(query, "code");
    if (hasCodeProperty) {
      const reqBody = {
        grant_type: "authorization_code",
        code: query.code,
        redirect_uri: `${process.env.REACT_APP_LINE_LOGIN_CALLBACK_URL}`,
        client_id: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`,
        client_secret: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_SECRET}`,
      };
      const reqConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios
        .post(
          "https://api.line.me/oauth2/v2.1/token",
          encodeSearchParams(reqBody),
          reqConfig
        )
        .then((res) => {
          try {
            const decodedIdToken = jwtDecode(
              res.data.id_token,
              `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_SECRET}`,
              {
                algorithms: ["HS256"],
                audience:
                  `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`.toString(),
                issuer: "https://access.line.me",
                // nonce: `${newId}`
              }
            );
            //儲存加密
            dispatch(userDataAction({
              name: decodedIdToken?.name,
              picture: decodedIdToken?.picture
            }))
            dispatch(checkLoginAction('yes'))
            setIsLoading(false);
          } catch (err) {
            // If token is invalid.
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // else if (query.error) {}
  };

  //@ API
  const handleAPI = {
    callTdxTokenAPI: async () => {
      let res = await callTdxTokenAPI();
      let { ResponseCode, ResponseData } = res
      if (ResponseCode === 'success') {
        dispatch(tdxTokenAction(ResponseData))
      }
    }
  }
  APIRef.current = handleAPI;

  useEffect(() => {
    // 判斷是否有登入
    if (userData?.checkLogin === 'no') {
      let urlParts = url.parse(window.location.href, true);
      let query = urlParts.query;
      const isLogin = () => {
        if (Object.keys(query).length === 0) {
          lineLogin();
        }
      };
      isLogin()
      getAccessToken(window.location.href);
      setIsLoading(false);
    } else {
      let isDarkMode = localStorage.getItem("darkMode");
      if (isDarkMode !== null) {
        setDarkMode(isDarkMode);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    // 判斷是否有 TOKEN
    if (!authData?.tdxToken) {
      APIRef.current.callTdxTokenAPI()
    } else {
      if (dayjs().valueOf() >= authData?.tdxToken?.expires) {
        APIRef.current.callTdxTokenAPI()
      }
    }
  }, []);

  return (
    <>
      <Loading isLoader={isLoading} />
      <div data-theme={darkMode}>
        <div className=" w-100" style={{ background: "#fff" }}>
          <Header
            userData={userData?.userData}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>
        {children}
        <div
          className="position-fixed w-100"
          style={{ bottom: 0, zIndex: 1000 }}
        >
          <Nav />
        </div>
      </div>
    </>
  );
};
export default RouterWrapper;
