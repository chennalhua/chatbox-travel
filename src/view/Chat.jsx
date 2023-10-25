import React, { useState } from 'react';
const Chat = () => { //聊天室
    return (
        <>
            <div className='chat-wrap'>
                <div className='container-fluid'>
                    <div className='col-12'>
                        <div className='chat-input d-flex align-items-center'>
                            <input type='text' className='form-control form-control-lg rounded-pill' />
                            <button className='btn'>送出</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chat