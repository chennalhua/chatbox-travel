import React, { useEffect, useState } from "react";
import Header from "components/layout/Header";
import { Loading } from "components/Loading";
import { Decrypt, Encrypt } from "assets/function/AES";
import axios from "axios";
import url from "url";
import jwtDecode from "jwt-decode";
import randomStr from "assets/function/randomStr";
import Nav from "components/layout/Nav";
const RouterWrapper = ({ children }) => {
  //@ VALUE
  let [isLoading, setIsLoading] = useState(true),
    [userData, setUserData] = useState({ picture: require('assets/image/user.jpg'), name: 'User' }),
    [darkMode, setDarkMode] = useState('light') //深色模式
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
    let link = 'https://access.line.me/oauth2/v2.1/authorize?';
    link += 'response_type=code';
    link += `&client_id=${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`;
    link += `&redirect_uri=${process.env.REACT_APP_LINE_LOGIN_CALLBACK_URL}`;
    link += `&state=${state}`;
    link += `&nonce=${nonce}`;
    link += '&scope=openid%20profile';
    link += '&bot_prompt=normal';
    window.location.href = link;
  };
  const getAccessToken = (callbackURL) => {
    var urlParts = url.parse(callbackURL, true);
    var query = urlParts.query;
    var hasCodeProperty = Object.prototype.hasOwnProperty.call(query, 'code');
    if (hasCodeProperty) {
      const reqBody = {
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: `${process.env.REACT_APP_LINE_LOGIN_CALLBACK_URL}`,
        client_id: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`,
        client_secret: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_SECRET}`
      };
      const reqConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      axios
        .post(
          'https://api.line.me/oauth2/v2.1/token',
          encodeSearchParams(reqBody),
          reqConfig
        )
        .then((res) => {
          try {
            const decodedIdToken = jwtDecode(res.data.id_token, `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_SECRET}`, {
              algorithms: ['HS256'],
              audience: `${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`.toString(),
              issuer: 'https://access.line.me',
              // nonce: `${newId}`
            });
            //儲存加密
            localStorage.setItem(
              "_LOGINDATA",
              Encrypt(JSON.stringify(decodedIdToken))
            );
            setIsLoading(false);

          } catch (err) {
            // If token is invalid.
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (query.error) {
      // swal.fire({
      //   icon: 'error',
      //   title: '登入失敗 ><',
      //   text: '需「許可」授權，才能驗證登入',
      //   confirmButtonText: '重新登入',
      // }).then(function () {
      //   lineLogin()
      // })
    }
  };


  let checkLogin = localStorage.getItem("_LOGINDATA");
  useEffect(() => {
    if (checkLogin == null) {
      var urlParts = url.parse(window.location.href, true);
      var query = urlParts.query;
      const isLogin = () => {
        if (Object.keys(query).length === 0) {
          lineLogin();
        }
      }
      // isLogin()
      // getAccessToken(window.location.href);
      setIsLoading(false);
    } else {
      setUserData(JSON.parse(Decrypt(checkLogin)));
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [checkLogin]);

  return (
    <>
      <Loading isLoader={isLoading} />
      <div className="bg-primary-light" data-theme={darkMode}>
        <div className=" w-100" style={{ background: '#fff' }}>
          <Header userData={userData} setDarkMode={setDarkMode} />
        </div>
        {children}
        <div className="position-fixed w-100" style={{ bottom: 0, zIndex: 1000 }}>
          <Nav />
        </div>
      </div>
    </>
  );
};
export default RouterWrapper;
