export default function searchKeyword() {
    return (
        {
            allCity: { rule: /台北|臺北|基隆|新北|宜蘭|新竹市|新竹縣|桃園|苗栗|台中市|臺中市|台中|臺中|彰化|南投|嘉義市|嘉義縣|雲林|台南|臺南|台南|臺南|高雄|屏東|台東|花蓮|澎湖|金門|連江/ },
            city: { rule: /台北|台北市|臺北|臺北市|台南|台南市|臺南|臺南市/ },
            area: { rule: /區/ },
            weather: { rule: /天氣|溫度|幾度|度|降雨|最高|最低/ },
            attractions: { rule: /景點|好玩|玩|地方|介紹/ },
            food: { rule: /美食|好吃|吃|美味|美食介紹|餓|食物/ },
            taipei: {
                rule: /台北|台北市|臺北|臺北市/,
                areaRule: /中正區|大同區|中山區|松山區|大安區|萬華區|信義區|士林區|北投區|內湖區|南港區|文山區/
            },
            tainan: {
                rule: /台南|台南市|臺南|臺南市/,
                areaRule: /中西區|東區|南區|北區|安平區|安南區|永康區|歸仁區|新化區|左鎮區|玉井區|楠西區|南化區|仁德區|關廟區|龍崎區|官田區|麻豆區|佳里區|西港區|七股區|將軍區|學甲區|北門區|新營區|後壁區|白河區|東山區|六甲區|下營區|柳營區|鹽水區|善化區|大內區|山上區|新市區|安定區/
            }
        }
    )
}