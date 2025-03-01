import { Button} from 'antd';
import { useSelector } from 'react-redux';
const Member = () => {
    //@ REDUX
    const getUserData = useSelector(state => state.userRe)
    let { userData, checkLogin } = getUserData

    return (
        <>
            <div className='vh-100 bg-primary-light'>
                <div className="container">
                    <div className='text-center'>
                        <div className='d-flex justify-content-center'>
                            <div
                                className="img-circle-mask"
                                style={{ width: "100px", height: "100px" }}
                            >
                                <img
                                    src={checkLogin === 'yes' ?
                                        userData.picture :
                                        require("assets/image/user.jpg")}
                                    className="img-fluid"
                                    alt="xxx"
                                />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-center my-3'>
                            <p className='fw-bolder text-primary-dark m-0' style={{ fontSize: '20px' }}>{checkLogin === 'yes' ? userData.name : '旅行者'}</p>
                        </div>
                        <div className='border-dashed'></div>
                        <div className='mt-3'>
                            {
                                checkLogin === 'yes' ?
                                    <>
                                        <p>會員 ID：{userData?.aud}</p>
                                        <Button type='primary' className='fw-bolder' >
                                            登出
                                        </Button>
                                    </> :
                                    <Button className='text-light p-4 fw-bolder' style={{ background: '#06c755' }}>
                                        <img src={require('assets/image/icon/line.png')} className='img-fluid' alt='' style={{ width: '50px' }} />
                                        LINE 登入
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Member