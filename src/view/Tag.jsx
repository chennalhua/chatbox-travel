import { DeleteOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import NoDataBox from 'components/NoDataBox';
import PlaceBox from 'components/PlaceBox';
import { useDispatch, useSelector } from 'react-redux';
import { clearTag } from '../redux/action/chatAction';
const Tag = () => {
    const dispatch = useDispatch()
    const allChatData = useSelector(state => state.chatRe)

    const handleData = {
        getData: (type) => {
            return (
                allChatData.tagData?.filter(val => {
                    return type === val.type
                }).map((item, index) => {
                    return (
                        <div className='d-flex justify-content-center my-3' key={index}>
                            <PlaceBox item={item} width={'auto'} themeType={item.type} />
                        </div>
                    )
                })
            )
        }
    }

    const items = [
        {
            key: '1',
            label: '景點',
            children: handleData.getData('attractions'),
        },
        {
            key: '2',
            label: '美食',
            children: handleData.getData('food'),
        },
        {
            key: '3',
            label: '住宿',
            children: handleData.getData('hotel'),
        },
    ];

    return (
        <>
            <div
                className="bg-primary-light pb-5"
                style={{ height: "89vh", overflow: "scroll" }}
            >
                <div className="container py-3">
                    {
                        allChatData?.tagData.length > 0 ?
                            <>
                                <a href="#" className="text-danger text-end me-2" data-tour="clear" onClick={(_) => dispatch(clearTag())}>
                                    <DeleteOutlined style={{ fontSize: '20px' }} />
                                    <span className='ms-2 fw-bolder' style={{ fontSize: '14px', whiteSpace: 'pre' }}>清除收藏紀錄</span>
                                </a>
                                <Tabs defaultActiveKey="1" items={items} />
                            </>
                            :
                            <NoDataBox mes='尚無收藏' />
                    }
                </div>
            </div>
        </>
    )
}
export default Tag