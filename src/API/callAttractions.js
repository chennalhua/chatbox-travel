import axios from "axios";
import fuzzyQuery from 'assets/function/fuzzyQuery'

export const callAttractions = (mes) => {
    let data = require('assets/data/attractions.json')
    let returnArr = []
    data?.map((item, index) => {
        if (mes?.includes(item?.distric)) {
            returnArr.push(item)
        }
    })
    return returnArr
}