import React, { useState } from 'react';
const Nav = () => {
    let navList = [
        { path: 'chat', name: '聊天' },
        { path: 'chat', name: '天氣' },
        { path: 'chat', name: '旅遊' }
    ]
    return (
        <>
            <div className='nav mt-5'>
                <div className='container'>
                    <div className="row justify-content-center">
                        {
                            navList?.map((item, index) => {
                                return (
                                    <div className="col-4 text-center" key={`navList-${index}`}>
                                        <a href={`/${item?.path}`} className='btn nav-btn'></a>
                                        <p>{item?.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Nav