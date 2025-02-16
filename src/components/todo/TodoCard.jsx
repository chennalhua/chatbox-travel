import React, { useState } from 'react';
import { Button, Checkbox, Badge, Card, Drawer } from 'antd';
import { CalendarOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo, targetTodo } from '../../redux/action/todoAction';
import { typeData } from 'assets/function/settingData';
import dayjs from 'dayjs';
import NoDataBox from 'components/NoDataBox';
const TodoCard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    //@ REDUX
    const todos = useSelector(state => state.todosRe.todos);
    const targetTodoData = useSelector(state => state.todosRe.targetTodo);
    const dispatch = useDispatch();

    return (
        <>
            {todos?.length <= 0 && <NoDataBox mes='尚無紀錄' />}
            {todos.map((item) => {
                return (
                    <div className='my-2'>
                        <Card key={item.id} onClick={() => (setDrawerOpen(true), dispatch(targetTodo(item.id)))} style={{ cursor: 'pointer' }}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <Checkbox
                                        // checked={todo.completed}
                                        onChange={() => dispatch(toggleTodo(item.id))}
                                    ></Checkbox>
                                    <Badge className='mx-2' color={typeData(item.type).color} count={item.type} />
                                    <h2 className='mb-0 d-inline-block' style={{ fontSize: '16px' }}>{item.title}</h2>
                                </div>
                                <Button onClick={(_) => dispatch(deleteTodo(item.id))} shape="circle" color="default" variant="solid" icon={<DeleteOutlined style={{ fontSize: '20px' }} />} />
                            </div>
                        </Card>
                    </div>
                )
            })}
            {!!targetTodoData &&
                <Drawer title={targetTodoData.title} onClose={(_) => setDrawerOpen(false)} open={drawerOpen}>
                    <Badge className='mx-2' color={typeData(targetTodoData.type).color} count={targetTodoData.type} />
                    <div className='my-2 text-gray'>
                        <CalendarOutlined className='mx-2' style={{ fontSize: '18px' }} />
                        <span>{dayjs(targetTodoData.date[0]).format('YYYY-MM-DD')} ~ {dayjs(targetTodoData.date[1]).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className='mx-2'>{targetTodoData.des}</div>
                </Drawer>
            }
        </>
    )
}
export default TodoCard