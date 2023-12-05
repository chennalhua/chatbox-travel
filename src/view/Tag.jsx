import PlaceBox from 'components/PlaceBox';
import Nav from 'components/layout/Nav';
import React, { useEffect, useState } from 'react';
const Tag = () => {
    let [modalData, setModalData] = useState(null),
        [data, setData] = useState([]),
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
                            data?.length > 0 && data?.map((item, index) => {
                                return (
                                    <div className='py-4'>
                                        <PlaceBox item={item} setModalData={setModalData} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* <Nav /> */}
            </div>
            <div className="container">
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    {modalData?.title}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={`https://picsum.photos/1000/1000?random=101`}
                                    className="card-img-top"
                                    width='50%'
                                    alt=""
                                />
                                <p className="mt-3">{modalData?.introduction}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    關閉
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Tag