import Map from 'components/Map';
import NoDataBox from 'components/NoDataBox';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const Detail = () => { //詳細資料
    const location = useLocation()
    let param = new URLSearchParams(location.search)
    let key = param.get('key'),
        themeType = param.get('themeType')

    //@ VALUE
    let [data, setData] = useState(null)

    useEffect(() => {
        let sourceData = themeType == '景點' ? require('assets/data/attractions.json') : require('assets/data/foods.json')

        if (key !== null) {
            let allArr = []
            Object.keys(sourceData).map((item) => {
                sourceData[item].map((kitem) => {
                    allArr.push(kitem)
                })
            })

            allArr?.map((item, index) => {
                if (key == item?.name) {
                    setData(item)
                }
            })
        }
    }, [])

    //@ UIBLOCK
    const handleUiBlock = {
        banner: function () {
            if (data?.images?.length > 0) {
                return (
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
                )
            } else {
                if (themeType == '美食') {
                    return <img src={require('assets/image/FOOD.png')} className="img-fluid" alt={data?.name} />
                } else if (themeType == '景點') {
                    return <img src={require('assets/image/ATTRACTIONS.png')} className="img-fluid" alt={data?.name} />
                } else {
                    return <img src={require('assets/image/QUESTION.png')} className="img-fluid" alt={data?.name} />
                }
            }
        }
    }

    return (
        <div style={{ height: 'calc(100vh - 153px)', overflowY: 'scroll' }}>
            <div className='detail bg-primary-light vh-100'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            {
                                data !== null ?
                                    <>
                                        {handleUiBlock?.banner()}
                                        <div className="mt-4">
                                            <h2 className='title'>{data?.name}
                                                <span className="badge text-bg-primary-dark text-light mx-3" style={{ fontSize: '16px' }}>{data?.distric}</span>
                                            </h2>
                                            <div className='content mt-3'>
                                                <div>地址：{data?.address}</div>
                                                <div>營業：{data?.open_time}</div>
                                                <div>電話：{data?.tel}</div>
                                            </div>
                                            <p className='mt-4' style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{
                                                __html: data?.introduction,
                                            }}></p>
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
                </div>
            </div>
        </div>
    )
}
export default Detail