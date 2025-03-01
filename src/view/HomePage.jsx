import React, { useEffect, useRef, useState } from "react";
import callPositionInfo from "API/callPostionInfo";
import ImgHrefBox from "components/imgHrefBox";
import bg from 'assets/image/view/view-1.jpg'
import { Button } from "antd";
import { ArrowRightOutlined} from "@ant-design/icons";
import TodoCard from "components/todo/TodoCard";
import { useSelector } from "react-redux";
import { Loading } from "components/Loading";
import dayjs from "dayjs";
import callTravel from "API/callTravel";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const router = useNavigate();
  //@ REDUX
  const authData = useSelector(state => state.authRe)

  //@ REF
  const APIRef = useRef(null);

  //@ VALUE
  let [isLoading, setIsLoading] = useState(false)
  let [positionInfoData, setPositionInfoData] = useState(null);
  let [allEventData, setAllEventData] = useState(null)

  //@ API
  const handleAPI = {
    positionAPI: async () => {
      setIsLoading(true)
      let res = await callPositionInfo()
      let { ResponseCode, ResponseData } = res
      if (ResponseCode === 'success') {
        setPositionInfoData(ResponseData)
        let eventRes = await callTravel('event', ResponseData?.city, authData?.tdxToken)
        if (eventRes?.ResponseCode === 'success') {
          setAllEventData(eventRes?.ResponseData)
          setTimeout(() => { setIsLoading(false) }, 800)
        }
      }
    }
  }
  APIRef.current = handleAPI;

  //@ EVENT
  useEffect(() => {
    APIRef.current.positionAPI()
  }, []);

  return (
    <>
      <Loading />
      <div
        className="bg-primary-light py-4"
        style={{ height: "83vh", overflow: "scroll" }}
      >
        <div className="container">
          <div className="row">
            <div className="my-2 mb-4">
              <ImgHrefBox img={bg}>
                <div className="d-flex align-items-center justify-content-between">
                  <h5 style={{ lineHeight: '28px' }}>探索台灣，<br />一次旅行滿足所有期待！</h5>
                  <Button type="primary" size="large" icon={<ArrowRightOutlined className='text-light' />} onClick={(_) => window.location.href = '/chat'}>立即前往</Button>
                </div>
              </ImgHrefBox>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <div className="icon-href">
                  <img src={require('assets/image/icon/attractions.png')} className="img-fluid" />
                </div>
                <p className="text-center">景點</p>
              </div>
              <div>
                <div className="icon-href">
                  <img src={require('assets/image/icon/food.png')} className="img-fluid" alt="" />
                </div>
                <p className="text-center">美食</p>
              </div>
              <div>
                <div className="icon-href">
                  <img src={require('assets/image/icon/room.png')} className="img-fluid" alt="" />
                </div>
                <p className="text-center">住宿</p>
              </div>
            </div>
            {/* 推薦 */}
            {!!allEventData &&
              <div>
                <h5 className="mt-4 mb-3"> {positionInfoData?.city}最近夯甚麼｜掌握即時訊息</h5>
                {allEventData
                  ?.sort((a, b) => {
                    return dayjs(b.startTime).valueOf() - dayjs(a.startTime).valueOf()
                  })
                  ?.filter((_, valIndex) => {
                    return valIndex <= 5
                  })
                  ?.map((item) => {
                    return (
                      <div className="my-3">{dayjs(item?.startTime).format('YYYY-MM-DD')}｜<a href="#"
                        onClick={(e) =>
                        (e.preventDefault(),
                          router({
                            pathname: `/detail`,
                            search: `type=event&city=${item.city}&name=${item?.name}`,
                          }))}>{item?.name}</a></div>
                    );
                  })}
              </div>
            }
            {/* 筆記 */}
            <div>
              <h5 className="mt-4 mb-3"> 我的旅遊筆記｜記錄每一段精彩旅程</h5>
              <TodoCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
