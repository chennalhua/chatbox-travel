import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import TextLongToDot from "assets/function/TextLongToDot";
import { useNavigate } from 'react-router-dom';
const PlaceBox = ({ item, width, setArr }) => {
    const router = useNavigate()

    let [tagPlace, setTagPlace] = useState([])

    //@ EVENT
    const handleEvent = {
        setLove: function (e, name) {
            e.preventDefault()

            let newArr = tagPlace
            if (newArr.includes(name)) {
                newArr.splice(newArr.indexOf(name), 1);
            } else {
                newArr.push(name)
            }

            let filterRepeat = newArr.filter(function (element, index, arr) {
                return arr.indexOf(element) == index;
            });
            setTagPlace(filterRepeat)
            setArr(filterRepeat)
            localStorage.setItem('_TAGPLACE', JSON.stringify(filterRepeat))
        }
    };

    useEffect(() => {
        let getHistoryData = localStorage.getItem('_TAGPLACE')
        if (getHistoryData !== null && getHistoryData !== undefined && getHistoryData !== 'undefined') {
            setTagPlace(JSON.parse(getHistoryData))
            setArr(JSON.parse(getHistoryData))
        }
    }, [])

    useEffect(() => {
        if (tagPlace?.length > 0) {
            localStorage.setItem('_TAGPLACE', JSON.stringify(tagPlace))
            setArr(tagPlace)
        }
    }, [tagPlace])
    return (
        <>
            <div className="card me-2" style={width == 'auto' ? {} : { width: "350px" }}>
                <div
                    style={{
                        width: "100%",
                        height: "180px",
                        overflow: "hidden",
                    }}
                >
                    {item?.images?.length > 0 ?
                        <img src={item?.images[0].src}
                            className="card-img-top"
                            alt={item?.name}
                        /> :
                        <img src={require('assets/image/robot.jpg')}
                            className="card-img-top"
                            alt={`${item?.name}-沒有相關圖片 QQ`}
                        />
                    }
                </div>
                <div className="card-body">
                    <div className="text-end mb-2">
                        <a href="#" onClick={e => (handleEvent?.setLove(e, item?.name))}>
                            <Icon icon={tagPlace.includes(item?.name) ? 'heart-solid' : 'heart-outline'}
                                size={22} color={tagPlace.includes(item?.name) ? '#da1e11' : '#000'} /></a>
                    </div>
                    <h5 className="card-title">{item?.name}</h5>
                    <p
                        className="card-text"
                        dangerouslySetInnerHTML={{
                            __html: TextLongToDot(item?.introduction),
                        }}
                    ></p>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            // data-bs-toggle="modal"
                            // data-bs-target="#exampleModal"
                            onClick={(e) => (
                                e.preventDefault(), router({
                                    pathname: `/detail`,
                                    search: `key=${item?.name}`
                                })
                            )}
                        >
                            查看更多
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PlaceBox