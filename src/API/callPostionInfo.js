import axios from 'axios';
import React, { useState } from 'react';
const callPositionInfo = async () => {
    try {
        let API = 'https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=zh-hant'
        let res = await axios.get(API)

        // latitude  緯度
        // longitude 經度
        return { ResponseCode: 'success', ResponseData: res.data, ResponseMes: 'success' }

    } catch (error) {
        return { ResponseCode: 'error', ResponseData: {}, ResponseMes: 'get api err' }
    }
}
export default callPositionInfo