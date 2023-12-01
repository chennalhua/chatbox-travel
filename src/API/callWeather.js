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

export const callWeather = async (locationIndex) => {
    try {
        const response = await axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314');
        const data = response.data;
        let jsonData = {}
        jsonData.Wx = data.records.location[locationIndex].weatherElement[0].time[0].parameter.parameterName;
        jsonData.MaxT = data.records.location[locationIndex].weatherElement[1].time[0].parameter.parameterName;
        jsonData.MinT = data.records.location[locationIndex].weatherElement[2].time[0].parameter.parameterName;
        jsonData.CI = data.records.location[locationIndex].weatherElement[3].time[0].parameter.parameterName;
        jsonData.PoP = data.records.location[locationIndex].weatherElement[4].time[0].parameter.parameterName;

        return jsonData;
    } catch (error) {
        return { error: error };
    }
};
