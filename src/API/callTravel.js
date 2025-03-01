import searchKeyword from 'assets/data/searchKeyword';
import fuzzyQuery from 'assets/function/fuzzyQuery';
import axios from 'axios';
const callTravel = async (type, mes, token) => {
    try {
        function getCity() {
            return Object.keys(searchKeyword()?.city).find((item) => {
                if (fuzzyQuery(searchKeyword()?.city?.[item].rule, mes)[0]) {
                    return item
                }
            })
        }
        function API(city) {
            switch (type) {
                case 'attractions': return `${process.env.REACT_APP_API}/api/basic/v2/Tourism/ScenicSpot/${city}?top=30`
                case 'food': return `${process.env.REACT_APP_API}/api/basic/v2/Tourism/Restaurant/${city}?top=30`
                case 'hotel': return `${process.env.REACT_APP_API}/api/basic/v2/Tourism/Hotel/${city}?top=30`
                case 'event': return `${process.env.REACT_APP_API}/api/basic/v2/Tourism/Activity/${city}`
                default: break
            }
        }

        function normalizeData(responseData) { //@ 標準化命名
            return responseData.filter((val, valIndex) => {
                return valIndex <= 30
            }).map(data => ({
                type: type,
                name: data?.ScenicSpotName || data?.RestaurantName || data?.HotelName || data?.ActivityName || null,
                des: data?.Description || data?.DescriptionDetail || null,
                desDetail: data?.DescriptionDetail || null,
                picture: data?.Picture,
                position: data?.Position,
                class: data?.Class || data?.Class1 || null,
                address: data?.Address || null,
                phone: data?.phone || null,
                openTime: data?.OpenTime || null,
                city: data?.City,
                startTime: data?.StartTime,
                otherInfo: {
                    spec: data?.Spec || null,
                    parkingInfo: data?.parkingInfo,
                    serviceInfo: data?.ServiceInfo
                }
            }));
        }

        if (!!getCity()) {
            const res = await axios.get(API(getCity()), {
                headers: {
                    Authorization: `${token.token_type} ${token.access_token}`
                }
            });

            return {
                ResponseCode: 'success',
                ResponseData: normalizeData(res.data),
                ResponseMes: 'success'
            };
        }
    } catch (error) {
        return {
            ResponseCode: 'error',
            ResponseData: null,
            ResponseMes: `發生錯誤: ${error.message}`
        };
    }
};

export default callTravel;
