import callTravel from 'API/callTravel';
import { Loading } from 'components/Loading';
import Map from 'components/Map';
import NoDataBox from 'components/NoDataBox';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
const Detail = () => { //詳細資料
    const location = useLocation()
    let param = new URLSearchParams(location.search)
    let name = param.get('name'),
        type = param.get('type'),
        city = param.get('city')

    const authData = useSelector(state => state.authRe);

    const APIRef = useRef()
    //@ VALUE
    let [data, setData] = useState(null)
    let [isLoading, setIsLoading] = useState(false)

    //@ API
    const handleAPI = {
        getData: async () => {
            setIsLoading(true)
            let res = await callTravel(type, city, authData?.tdxToken)

            let { ResponseCode, ResponseData } = res
            if (ResponseCode === 'success') {
                let findData = ResponseData.find(item => {
                    return item.name === name
                })
                setData(findData)
                setTimeout(() => { setIsLoading(false) }, 800)
            }
        }
    }
    APIRef.current = handleAPI;

    useEffect(() => {
        APIRef.current.getData()
    }, [])

    //@ UIBLOCK
    const handleUiBlock = {
        banner: function () {
            if (!!data?.picture?.PictureUrl1) {
                return (
                    <img src={data?.picture?.PictureUrl1} className="img-fluid" alt={data?.name} />
                )
            } else {
                if (type == 'food') {
                    return <img src={require('assets/image/FOOD.png')} className="img-fluid" alt={data?.name} />
                } else if (type == 'attractions') {
                    return <img src={require('assets/image/ATTRACTIONS.png')} className="img-fluid" alt={data?.name} />
                } else if (type === 'hotel') {
                    return <img src={require('assets/image/HOTEL.png')} className="img-fluid" alt={data?.name} />
                } else if (type === 'event') {
                    return <img src={require('assets/image/EVENT.png')} className="img-fluid" alt={data?.name} />
                } else {
                    return <img src={require('assets/image/QUESTION.png')} className="img-fluid" alt={data?.name} />
                }
            }
        }
    }

    return (
        <>
            <Loading isLoading={isLoading} />
            <div style={{ height: 'calc(100vh - 153px)', overflowY: 'scroll' }}>
                <div className='detail bg-primary-light vh100'>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8">
                                {
                                    !!data ?
                                        <>
                                            {handleUiBlock?.banner()}
                                            <div className="mt-4">
                                                <h2 className='title'>{data?.name}
                                                    <span className="badge text-bg-primary-dark text-light mx-3" style={{ fontSize: '16px' }}>{data?.distric}</span>
                                                </h2>
                                                <div className='content mt-3'>
                                                    <div>地址：{data?.address}</div>
                                                    <div>營業：{data?.openTime}</div>
                                                    <div>電話：{data?.phone}</div>
                                                </div>
                                                <p className='mt-4' style={{ textAlign: 'justify' }}>{data?.des}</p>
                                                <p className='mt-4' style={{ textAlign: 'justify' }}>{data?.desDetail}</p>
                                                <div className='pb-4'><Map position={[data?.position?.PositionLat, data?.position?.PositionLon]} /></div>
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
        </>
    )
}
export default Detail