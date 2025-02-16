import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/action/todoAction';
const TodoForm = () => {
    //@ REDUX
    const dispatch = useDispatch();

    //@ VALUE
    let selectOptions = [
        {
            label: '景點',
            value: '景點',
        },
        {
            label: '美食',
            value: '美食',
        },
        {
            label: '住宿',
            value: '住宿',
        },
        {
            label: '其他',
            value: '其他',
        },
    ];
    let [modalShow, setModalShow] = useState(false)

    //@ FORM
    const onFinish = (values) => {
        dispatch(addTodo(values));
        setModalShow(false)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Button style={{ width: '50px', height: '50px' }} size="large" shape="circle" color="primary" variant="solid" icon={<PlusOutlined style={{ fontSize: "20px" }} />} onClick={(_) => setModalShow(true)}></Button>
            <Modal title='我的紀錄'
                open={modalShow}
                onCancel={(_) => setModalShow(false)}
                maskClosable={false}
                destroyOnClose={true}
                footer={[]}>
                <Form
                    name='basic'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        label='標題'
                        name='title'
                        rules={[
                            {
                                required: true,
                                message: '尚未輸入標題',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='類型'
                        name='type'
                        rules={[
                            {
                                required: true,
                                message: '尚未選擇類型',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: '100%',
                            }}
                            placeholder='請選擇紀錄類型'
                            defaultValue={[]}
                            options={selectOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        label='日期'
                        name='date'
                        rules={[
                            {
                                required: true,
                                message: '尚未選擇日期',
                            },
                        ]}
                    >
                        <DatePicker.RangePicker className='w-100' />
                    </Form.Item>
                    <Form.Item
                        label='敘述'
                        name='des'
                        rules={[
                            {
                                required: true,
                                message: '尚未輸入文字',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label={null} className='text-end mt-2'>
                        <Button type='primary' htmlType='submit'>
                            建立
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}
export default TodoForm