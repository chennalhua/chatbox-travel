import React, { useState } from "react";
import Nav from "components/layout/Nav";
import Icon from "components/Icon";
const Chat = () => {
  //聊天室
  return (
    <>
      <div className="chat-wrap">
        <div className="container">
          <div className="col-12">
            <div className="chat-input-wrap">
              <div className="chat-input d-flex align-items-center">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill"
                />
                <button className="btn chat-input-icon">
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
