import { getWeek } from 'assets/function/dateTool';
import dayjs from 'dayjs';
import React, { useState } from 'react';
const WeatherBox = ({ data }) => {


    //@ UIBLOCK
    const uiBlock = {
        temperature: function (val) { //溫度表
            const getStyle = (val) => {
                if (val <= 20) {
                    return ({ background: '#a6f1fa', boxShadow: '0 0 10px 8px rgba(166,241,250, 0.5)' })
                } else if (val > 20 && val <= 25) {
                    return ({ background: '#53cad8', boxShadow: '0 0 10px 8px rgba(83,202,216, 0.5)' })

                } else if (val > 25 && val <= 30) {
                    return ({ background: '#ff9800', boxShadow: '0 0 10px 8px rgba(255,152,0, 0.5)' })

                } else if (val > 30) {
                    return ({ background: '#f44336', boxShadow: '0 0 10px 8px rgba(244,67,54, 0.5)' })

                }
            }
            return (<div className='temperature-circle' style={getStyle(val)}></div>)
        },
        textColor: function (val) {
            if (val <= 20) {
                return ({ fontSize: "28px", color: '#a6f1fa' })
            } else if (val > 20 && val <= 25) {
                return ({ fontSize: "28px", color: '#53cad8' })

            } else if (val > 25 && val <= 30) {
                return ({ fontSize: "28px", color: '#ff9800' })

            } else if (val > 30) {
                return ({ fontSize: "28px", color: '#f44336' })

            }
        }

    }

    return (
        <>
            <div className="mt-4 ms-2">
                <div className="bg-light p-2 rounded">
                    <div className="d-flex align-items-center justify-content-around py-4">
                        {uiBlock?.temperature(data?.MaxT)}
                        {/* DATE */}
                        <p className="my-0 text-center">
                            {dayjs().format("YYYY/MM/DD")}{" "}
                            <span className="ms-2 d-block">{getWeek(dayjs().day())}</span>
                        </p>
                        <div className="fw-bolder ms-4 text-dark">
                            <p className="my-0" style={uiBlock?.textColor(data?.MaxT)}>
                                {data?.MaxT} °C
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-center">
                            <p>最低溫</p>
                            <p>{data?.MinT} °C</p>
                        </div>
                        <div className="col-4 text-center">
                            <p>最高溫</p>
                            <p>{data?.MaxT} °C</p>
                        </div>
                        <div className="col-4 text-center">
                            <p>降雨機率</p>
                            <p>{data?.PoP} %</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WeatherBox