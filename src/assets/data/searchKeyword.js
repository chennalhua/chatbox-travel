export default function searchKeyword() { //基本關鍵字庫建立
    return (
        {
            allCity: { rule: /台北|臺北|基隆|新北|宜蘭|新竹市|新竹縣|桃園|苗栗|台中市|臺中市|台中|臺中|彰化|南投|嘉義市|嘉義縣|雲林|台南|臺南|台南|臺南|高雄|屏東|台東|花蓮|澎湖|金門|連江/ }, //@ 全台縣市
            city: {
                Taipei: { //@ 台北
                    rule: /台北|台北市|臺北|臺北市/,
                    areaRule: /中正區|大同區|中山區|松山區|大安區|萬華區|信義區|士林區|北投區|內湖區|南港區|文山區/
                },
                Keelung: { //@ 基隆
                    rule: /基隆|基隆市/
                },
                NewTaipei: { //@ 新北
                    rule: /新北|新北市/
                },
                YilanCounty: { //@ 宜蘭
                    rule: /宜蘭|宜蘭縣/
                },
                Hsinchu: { //@ 新竹市
                    rule: /新竹市/
                },
                HsinchuCounty: { //@ 新竹縣
                    rule: /新竹縣/
                },
                Taoyuan: { //@ 桃園市
                    rule: /桃園|桃園市/
                },
                MiaoliCounty: { //@ 苗栗縣
                    rule: /苗栗|苗栗縣/
                },
                Taichung: { //@ 台中市
                    rule: /台中|台中市|臺中|臺中市/
                },
                ChanghuaCounty: { //@ 彰化縣
                    rule: /彰化|彰化縣/
                },
                NantouCounty: { //@ 南投
                    rule: /南投|南投縣/
                },
                Chiayi: { //@ 嘉義
                    rule: /嘉義市/
                },
                ChiayiCounty: { //@ 嘉義縣
                    rule: /嘉義縣/
                },
                YunlinCounty: { //@ 雲林
                    rule: /雲林|雲林縣/
                },
                Tainan: { //@ 台南
                    rule: /台南|台南市|臺南|臺南市/,
                    areaRule: /中西區|東區|南區|北區|安平區|安南區|永康區|歸仁區|新化區|左鎮區|玉井區|楠西區|南化區|仁德區|關廟區|龍崎區|官田區|麻豆區|佳里區|西港區|七股區|將軍區|學甲區|北門區|新營區|後壁區|白河區|東山區|六甲區|下營區|柳營區|鹽水區|善化區|大內區|山上區|新市區|安定區/
                },
                Kaohsiung: { //@ 高雄
                    rule: /高雄|高雄市/
                },
                PingtungCounty: { //@ 屏東縣
                    rule: /屏東|屏東縣/
                },
                TaitungCounty: { //@ 台東縣
                    rule: /台東|台東縣|臺東|臺東縣/
                },
                HualienCounty: { //@ 花蓮縣
                    rule: /花蓮|花蓮縣/
                },
                PenghuCounty: { //@ 澎湖縣
                    rule: /澎湖|澎湖縣/
                },
                KinmenCounty: { //@ 金門縣
                    rule: /金門|金門縣/
                },
                LienchiangCounty: { //@ 連江縣
                    rule: /連江|連江縣|馬祖|馬祖縣/
                },
            }, //@ 關鍵縣市
            citySeparate: { rule: /新竹|嘉義/ }, //@ 縣市分開
            area: { rule: /區/ }, //@ 區域
            weather: { rule: /天氣|溫度|幾度|度|降雨|最高|最低/ }, //@ 天氣
            attractions: { rule: /景點|好玩|玩|地方|介紹/ }, //@ 景點
            food: { rule: /美食|好吃|吃|美味|美食介紹|餓|食物/ }, //@ 美食
            hotel: { rule: /住宿|飯店|HOTEL|hotel|Hotel|休息|宿舍|民宿/ }, //@ 住宿
        }
    )
}