import Icon from "components/Icon";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Nav = () => {
  let navList = [
    { path: "", name: "首頁", icon: "home" },
    { path: "chat", name: "聊天", icon: "mes" },
    // { path: "weather", name: "天氣", icon: "map" },
    // { path: "tag", name: "收藏", icon: "tag" },
  ];
  return (
    <>
      <div className="nav">
        <div className="container">
          <div className="d-flex justify-content-evenly">
            {navList?.map((item, index) => {
              return (
                <div className="text-center" key={`navList-${index}`}>
                  <NavLink
                    to={`/${item?.path}`}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "active"
                        : "btn nav-btn"
                    }
                  >
                    <Icon icon={item?.icon} size={24} color="#4493bd" />
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
