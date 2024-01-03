
import fuzzyQuery from 'assets/function/fuzzyQuery'; //模糊搜尋篩選器
import axios from 'axios'
export const callWeather = async (mes) => { //@ 取得"天氣"

    let newMes = mes.replace('台', '臺') //字串特定文字轉換
    let rule = /台北|臺北|基隆|新北|宜蘭|新竹市|新竹縣|桃園|苗栗|台中市|臺中市|台中|臺中|彰化|南投|嘉義市|嘉義縣|雲林|台南|臺南|台南|臺南|高雄|屏東|台東|臺東|花蓮|澎湖|金門|連江/ //設定正規表達 rule

    if (fuzzyQuery(rule, newMes)[0]) { //模糊查詢 function ，判斷如果 rule 為 true 關鍵字配對
        try {
            // GET API
            // const response = await axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314'); 
            const data = require('assets/data/weather.json'); // GET response

            // 篩選出關鍵縣市
            let filterData = null
            data?.records?.location?.map((item, index) => { 
                //GET response data 做過濾篩選，取出符合的 item
                if (item.locationName.indexOf(fuzzyQuery(rule, newMes)[1]) > -1) {
                    filterData = item
                }
            })

            // 資料判斷
            let jsonData = {}
            filterData?.weatherElement?.map((item, index) => { //GET return data
                jsonData[`${item?.elementName}`] = item?.time[0]?.parameter?.parameterName
            })
            return [true, jsonData];
        } catch (error) { // catch API error
            return [false];
        }
    } else { // 模糊查詢 function 配對不成功
        return [false];
    }
};
