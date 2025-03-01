import axios from 'axios';
import dayjs from 'dayjs';
export const callTdxTokenAPI = async () => { // 抓 IP 位置
    try {
        let API = `${process.env.REACT_APP_API}/auth/realms/TDXConnect/protocol/openid-connect/token`
        let postData = {
            grant_type: 'client_credentials',
            client_id: 'naihua.work-b2b06347-49ed-49b0',
            client_secret: '796e350d-2686-4245-ae46-d51af2d31ff2'
        }

        let res = await axios.post(API, postData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return {
            ResponseCode: 'success',
            ResponseData: {
                access_token: res.data.access_token,
                expires: dayjs().add(23, 'h').valueOf(),
                date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                token_type: res.data.token_type
            },
            ResponseMes: 'success'
        }

    } catch (error) {
        return { ResponseCode: 'error', ResponseData: {}, ResponseMes: 'get api err' }
    }
}