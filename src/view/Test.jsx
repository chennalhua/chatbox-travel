import axios from 'axios';
import React, { useEffect, useState } from 'react';
const Test = () => {
    useEffect(() => {
        let API = 'https://www.travel.taipei/open-api/zh-tw/Events/News?page=1'
        axios.get(API)
            .then((res) => {
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
    }, [])
    return (
        <>
        </>
    )
}
export default Test