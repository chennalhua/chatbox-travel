import Icon from 'components/Icon';
import { Loading } from 'components/Loading';
import NoDataBox from 'components/NoDataBox';
import PlaceBox from 'components/PlaceBox';
import Nav from 'components/layout/Nav';
import React, { useEffect, useState } from 'react';
const Tag = () => {
    let [data, setData] = useState([]),
        [tagPlace, setTagPlace] = useState([]),
        [isLoader, setIsLoader] = useState(false)

    let sourceData = require('assets/data/attractions.json')
    //@ EVENT
    const handleEvent = {
        getData: function () {
            sourceData?.map((item, index) => {
                if (tagPlace?.includes(item.name)) {
                    setData(oldArr => [...oldArr, item])
                }
            })
        },
        clear: function (e) {
            e.preventDefault()
            setIsLoader(true)
            localStorage.removeItem('_TAGPLACE')
            setTimeout(() => {
                setTagPlace([])
                setIsLoader(false)
            }, 500)
        }
    }

    let getHistoryData = localStorage.getItem('_TAGPLACE')
    useEffect(() => {
        if (getHistoryData !== null && getHistoryData !== undefined && getHistoryData !== 'undefined') {
            setTagPlace(JSON.parse(getHistoryData))
        }
    }, [])

    return (
        <>
            <Loading isLoader={isLoader} />
            <div
                className="bg-primary-light pb-4"
                style={{ height: "85vh", overflow: "scroll" }}
            >
                <div className="container py-3">
                    {
                        tagPlace?.length > 0 &&
                        <a href="#" className="text-danger text-end me-2" data-tour="clear" onClick={e => handleEvent?.clear(e)}>
                            <Icon icon='trash' size={24} color="#dc3545" />
                            <span className='ms-2 fw-bolder' style={{ fontSize: '14px', whiteSpace: 'pre' }}>清除收藏紀錄</span>
                        </a>
                    }
                    <div className="row justify-content-center">
                        {
                            tagPlace?.length > 0 ? sourceData?.map((item, index) => {
                                if (tagPlace?.includes(item.name)) {
                                    return (
                                        <div className='col-12 col-md-4 my-2'>
                                            <PlaceBox item={item} width={'auto'} setArr={setTagPlace} />
                                        </div>
                                    )
                                }
                            }) :
                                <NoDataBox mes='尚無收藏' />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Tag