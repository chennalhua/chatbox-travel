import Map from 'components/Map';
import NoDataBox from 'components/NoDataBox';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const Detail = () => { //詳細資料
    const location = useLocation()
    let param = new URLSearchParams(location.search)
    let key = param.get('key')

    //@ VALUE
    let [data, setData] = useState(null)

    useEffect(() => {
        let sourceData = require('assets/data/attractions.json')
        if (key !== null) {
            sourceData?.map((item, index) => {
                if (key == item?.name) {
                    console.log(item)
                    setData(item)
                }
            })
        }
    }, [])

    return (
        <div style={{ height: '80vh' }}>
            <div className='detail bg-primary-light'>
                {
                    data !== null ?
                        <>
                            {/* 輪播圖 */}
                            {
                                data?.images?.length > 0 &&
                                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            data?.images?.map((item, index) => {
                                                return (
                                                    <div className={`carousel-item ${index == 0 && 'active'}`}
                                                        data-bs-interval="8000">
                                                        <img src={item?.src} className="d-block w-100" alt={key} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            }
                            <div className="container mt-4">
                                <h2 className='title'>{data?.name}
                                    <span className="badge text-bg-primary-dark text-light mx-3" style={{ fontSize: '16px' }}>{data?.distric}</span>
                                </h2>
                                <div className='content mt-3'>
                                    <div>地址：{data?.address}</div>
                                    <div>營業：{data?.open_time}</div>
                                    <div>電話：{data?.tel}</div>
                                </div>
                                <p className='mt-4'>{data?.introduction}</p>
                                <div className='pb-4'><Map position={[data?.nlat, data?.elong]} /></div>
                            </div>
                        </>
                        :
                        <div className="container pt-2">
                            <NoDataBox mes='查無資訊' />
                        </div>
                }
            </div>
        </div>
    )
}
export default Detail