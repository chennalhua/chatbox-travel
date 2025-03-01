import { Card } from 'antd';
const NoDataBox = ({ mes }) => {
    return (
        <>
            <Card>
                <p className='text-primary-dark text-center mb-0 fw-bolder' style={{ fontSize: '18px' }}>{mes}</p>
            </Card>
        </>
    )
}
export default NoDataBox