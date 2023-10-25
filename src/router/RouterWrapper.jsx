import React, { useState } from 'react';
import Header from 'components/layout/Header';
const RouterWrapper = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
export default RouterWrapper