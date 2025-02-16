import searchKeyword from 'assets/data/searchKeyword' //搜尋關鍵字
import fuzzyQuery from 'assets/function/fuzzyQuery'

export const callAttractions = (mes) => {
    let data = require('assets/data/attractions.json') // GET response - 因 API 有 CORS，暫時找替代方式

    // 模糊搜尋是否有相關關鍵字
    if (fuzzyQuery(searchKeyword().taipei.rule, mes)[0]) { // 配對"縣市"
        if (fuzzyQuery(searchKeyword().taipei.areaRule, mes)[0]) { // 配對"區"
            return { ResponseCode: 'success', ResponseData: runAPI('台北'), ResponseMes: 'success' }
        } else {
            return { ResponseCode: 'runChooseTaipei', ResponseData: [], ResponseMes: '縣市區域配對失敗，重新選擇對的區域' }
        }
    } else if (fuzzyQuery(searchKeyword().tainan.rule, mes)[0]) { // 配對"縣市"
        if (fuzzyQuery(searchKeyword().tainan.areaRule, mes)[0]) {// 配對"區"
            return { ResponseCode: 'success', ResponseData: runAPI('台南'), ResponseMes: 'success' }
        } else {
            return { ResponseCode: 'runChooseTainan', ResponseData: [], ResponseMes: '縣市區域配對失敗，重新選擇對的區域' }
        }
    } else { // 配對縣市失敗
        /* 流程 - runChooseCity : 跑卡片讓選 "台北" , "台南" */
        return { ResponseCode: 'runChooseCity', ResponseData: [], ResponseMes: '尚未搜尋到景點' }
    }

    function runAPI(city) {
        let returnArr = []
        data[city]?.map((item, index) => {
            if (mes?.includes(item?.distric)) {
                returnArr.push(item)
            }
        })
        return returnArr
    }
}