import axios from 'axios';

const callPositionInfo = async () => {
    try {
        const getLocationByOSM = async (lat, lng) => {
            try {
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=zh-TW`;
                const res = await axios.get(url);

                return {
                    ResponseCode: 'success',
                    ResponseData: {
                        city: res.data.address.city || null,
                        district: res.data.address.suburb || null,
                        latitude: lat,
                        longitude: lng
                    },
                    ResponseMes: 'success'
                };
            } catch (error) {
                return {
                    ResponseCode: 'error',
                    ResponseData: null,
                    ResponseMes: `查詢失敗: ${error.message}`
                };
            }
        };

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const result = await getLocationByOSM(lat, lng);
                    resolve(result);
                },
                (error) => {
                    reject({
                        ResponseCode: 'error',
                        ResponseData: null,
                        ResponseMes: `無法獲取位置: ${error.message}`
                    });
                }
            );
        });
    } catch (error) {
        return {
            ResponseCode: 'error',
            ResponseData: null,
            ResponseMes: `發生錯誤: ${error.message}`
        };
    }
};

export default callPositionInfo;
