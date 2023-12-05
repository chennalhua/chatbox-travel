import React, { useState } from 'react';
const NoDataBox = ({ mes }) => {
    return (
        <>
            <div className="row mt-5">
                <div className="col-12">
                    <div className='bg-light rounded py-4'>
                        <h4 className='text-primary-dark text-center'>{mes}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NoDataBox