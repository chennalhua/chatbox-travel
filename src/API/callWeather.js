import fuzzyQuery from 'assets/function/fuzzyQuery';
import axios from 'axios'

export const getCityKey = (message) => {
    switch (true) {
        case message.includes("Chiayi"):
        case message.includes("嘉義縣"):
            return 0;
        case message.includes("New Taipei"):
        case message.includes("新北"):
            return 1;
        case message.includes("Chiayi"):
        case message.includes("嘉義市"):
            return 2;
        case message.includes("Hsinchu"):
        case message.includes("新竹縣"):
            return 3;
        case message.includes("Hsinchu"):
        case message.includes("新竹市"):
            return 4;
        case message.includes("Taipei"):
        case message.includes("台北"):
            return 5;
        case message.includes("Tainan"):
        case message.includes("台南"):
            return 6;
        case message.includes("Yilan"):
        case message.includes("宜蘭"):
            return 7;
        case message.includes("Miaoli"):
        case message.includes("苗栗"):
            return 8;
        case message.includes("Yunlin"):
        case message.includes("雲林"):
            return 9;
        case message.includes("Hualien"):
        case message.includes("花蓮"):
            return 10;
        case message.includes("Taichung"):
        case message.includes("台中"):
            return 11;
        case message.includes("Taitung"):
        case message.includes("台東"):
            return 12;
        case message.includes("Taoyuan"):
        case message.includes("桃園"):
            return 13;
        case message.includes("Nantou"):
        case message.includes("南投"):
            return 14;
        case message.includes("Kaohsiung"):
        case message.includes("高雄"):
            return 15;
        case message.includes("kinmen"):
        case message.includes("金門"):
            return 16;
        case message.includes("Pingtung"):
        case message.includes("屏東"):
            return 17;
        case message.includes("Tainan"):
        case message.includes("基隆"):
            return 18;
        case message.includes("Penghu"):
        case message.includes("澎湖"):
            return 19;
        case message.includes("Changhua"):
        case message.includes("彰化"):
            return 20;
        case message.includes("Lianjiang"):
        case message.includes("連江"):
            return 21;
        default:
            return -1;
    }
}

export const callWeather = async (mes) => {
    let newMes = mes.replace('台', '臺') //字串特定文字轉換
    let rule = /台北|臺北|基隆|新北|宜蘭|新竹市|新竹縣|桃園|苗栗|台中市|臺中市|台中|臺中|彰化|南投|嘉義市|嘉義縣|雲林|台南|臺南|台南|臺南|高雄|屏東|台東|臺東|花蓮|澎湖|金門|連江/

    if (fuzzyQuery(rule, newMes)[0]) {
        try {
            const response = await axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314');
            const data = response.data;

            // 篩選出關鍵縣市
            let filterData = null
            data?.records?.location?.map((item, index) => {
                if (item.locationName.indexOf(fuzzyQuery(rule, newMes)[1]) > -1) {
                    filterData = item
                }
            })

            // 資料判斷 (日期時間)
            let jsonData = {}
            filterData?.weatherElement?.map((item, index) => {
                jsonData[`${item?.elementName}`] = item?.time[0]?.parameter?.parameterName
            })
            return [true, jsonData];
        } catch (error) {
            return [false];
        }
    } else { // 配對不成功
        return [false];
    }
};
