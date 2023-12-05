import NoDataBox from 'components/NoDataBox';
import PlaceBox from 'components/PlaceBox';
import Nav from 'components/layout/Nav';
import React, { useEffect, useState } from 'react';
const Tag = () => {
    let [data, setData] = useState([]),
        [tagPlace, setTagPlace] = useState([])

    //@ EVENT
    const handleEvent = {
        getData: function () {
            let sourceData = require('assets/data/attractions.json')
            sourceData?.map((item, index) => {
                if (tagPlace?.includes(item.name)) {
                    setData(oldArr => [...oldArr, item])
                }
            })
        }
    }

    let getHistoryData = localStorage.getItem('_TAGPLACE')
    useEffect(() => {
        if (getHistoryData !== null && getHistoryData !== undefined && getHistoryData !== 'undefined') {
            setTagPlace(JSON.parse(getHistoryData))
        }
    }, [])

    // useEffect(() => {
    //     setTagPlace(JSON.parse(getHistoryData))
    // }, [getHistoryData])

    useEffect(() => {
        function rightCartData() {
            const item = JSON.parse(localStorage.getItem('_TAGPLACE'))
            if (item) {
                setTagPlace(item);
            }
        }
        window.addEventListener('storage', rightCartData)
        return () => {
            window.removeEventListener('storage', rightCartData)
        }
    }, [])

    useEffect(() => {
        if (tagPlace?.length > 0) {
            handleEvent?.getData()
        }
    }, [tagPlace])

    return (
        <>
            <div
                className="bg-primary-light pb-4"
                style={{ height: "85vh", overflow: "scroll" }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        {
                            data?.length > 0 ? data?.map((item, index) => {
                                return (
                                    <div className='py-4'>
                                        <PlaceBox item={item} />
                                    </div>
                                )
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