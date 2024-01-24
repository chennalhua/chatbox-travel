import { callFoodShop } from 'API/callFoodShop';
import React, { useEffect, useState } from 'react';

const Test = () => {
    useEffect(() => {
        // console.log(callFoodShop('西港區'))
    }, [])
    return (
        <>
            <iframe width='100%' height='500px' src="https://www.cheers.com.tw/article/article.action?id=5102564"></iframe >
        </>
    )
}
export default Test