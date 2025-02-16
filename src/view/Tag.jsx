import { DeleteOutlined } from '@ant-design/icons';
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
        getAllData: function () {
            let attrData = require('assets/data/attractions.json'),
                foodData = require('assets/data/foods.json')

            let newAttrArr = [],
                newFoodArr = []
            function contact(storage, data, themeType) {
                Object.keys(data).map((item) => {
                    data[item].map((kitem) => {
                        kitem.themeType = themeType
                        storage.push(kitem)
                    })
                })
            }

            contact(newAttrArr, attrData, '景點')
            contact(newFoodArr, foodData, '美食')

            return newAttrArr.concat(newFoodArr)
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
                style={{ height: "90vh", overflow: "scroll" }}
            >
                <div className="container py-3">
                    {
                        tagPlace?.length > 0 &&
                        <a href="#" className="text-danger text-end me-2" data-tour="clear" onClick={e => handleEvent?.clear(e)}>
                            <DeleteOutlined style={{ fontSize: '20px' }} />
                            <span className='ms-2 fw-bolder' style={{ fontSize: '14px', whiteSpace: 'pre' }}>清除收藏紀錄</span>
                        </a>
                    }
                    <div className="row justify-content-center">
                        {
                            tagPlace?.length > 0 && handleEvent?.getAllData()?.map((item, index) => {
                                if (tagPlace?.includes(item.name)) {
                                    return (
                                        <div className='col-12 col-md-4 my-2'>
                                            <PlaceBox item={item} width={'auto'} setArr={setTagPlace} themeType={item.themeType} />
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    {tagPlace?.length <= 0 && <NoDataBox mes='尚無收藏' />}
                </div>
            </div>
        </>
    )
}
export default Tag