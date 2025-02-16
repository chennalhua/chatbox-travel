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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#dd844c',
          fontSize: 16, // 設定全域字體大小
        },
      }}>
        <Router />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
