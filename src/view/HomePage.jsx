import React, { useState } from 'react';
import Nav from 'components/layout/Nav';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
const HomePage = () => {
    let splideSlideList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let splideSlideValue = '400px'
    let splideOptions = {
        rewind: true,
        width: splideSlideValue,
        height: splideSlideValue,
        gap: '0.5em',
        type: 'loop',
        padding: '350px',
        perPage: 1,
        focus: 'start',
        pagination: true,
        arrows: false,
    }
    return (
        <>
            <div className='chat mb-4 px-2'>
                <div className='d-flex align-items-center'>
                    <input type='text' className='form-control form-control-lg rounded-pill' />
                    <button className='btn'>送出</button>
                </div>
            </div>
            <Splide hasTrack={false} options={splideOptions}>
                <SplideTrack options={{ gap: '1em' }}>
                    {
                        splideSlideList?.map((item, index) => {
                            return (
                                <SplideSlide key={`slider-${index}`}>
                                    <div className='splide-img-wrap' style={{ width: splideSlideValue, height: splideSlideValue }}>
                                        <img src={`https://picsum.photos/400/400?random=${index + 1}`} alt={`img-${index}`} />
                                    </div>
                                </SplideSlide>
                            )
                        })
                    }
                </SplideTrack>
            </Splide>
            <Nav />
        </>
    )
}
export default HomePage