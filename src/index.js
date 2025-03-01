import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from "./router/AppRouter";
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';
import 'assets/stylesheet/all.scss'
import 'bootstrap/dist/js/bootstrap.min.js';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';
import dayjs from 'dayjs';
import zhTw from "antd/locale/zh_TW";
dayjs.locale("zh-tw");
const locale = {
  name: "zh-tw",
  weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
  weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
  weekdaysMin: "日_一_二_三_四_五_六".split("_"),
  months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  ordinal: (n) => `${n}日`,
  relativeTime: {
    future: "%s內",
    past: "%s前",
    s: "幾秒",
    m: "1 分鐘",
    mm: "%d 分鐘",
    h: "1 小時",
    hh: "%d 小時",
    d: "1 天",
    dd: "%d 天",
    M: "1 個月",
    MM: "%d 個月",
    y: "1 年",
    yy: "%d 年",
  },
};
dayjs.locale(locale, null, true);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#dd844c',
          fontSize: 16, // 設定全域字體大小
        },
      }} locale={zhTw}>
        <Router />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
