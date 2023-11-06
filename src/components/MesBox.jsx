import React, { useState } from 'react';
const MesBox = () => {
    const handleStyle = {
        imgMask: {
            width: '50px',
            height: '50px',
            borderRadius: '50%'
        }
    }
    return (
        <>
            <div className='ms-2'>
                <img src='https://picsum.photos/200/200' className='img-fluid' style={handleStyle?.imgMask} />
                <div className='mes-box'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt similique architecto consequuntur blanditiis earum, dolore ratione eveniet debitis fugiat voluptatem sed voluptatibus cum, excepturi numquam? Consectetur ipsum neque doloribus temporibus!</div>
            </div>
            <div className='me-2'>
                <div className='text-end'>
                    <img src='https://picsum.photos/200/200' className='img-fluid' style={handleStyle?.imgMask} />
                </div>
                <div className='mes-box position-absolute' style={{ right: 0 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.Nesciunt similique architecto consequuntur blanditiis earum</div>
            </div>
        </>
    )
}
export default MesBox