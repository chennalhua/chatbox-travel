import React, { useState } from "react";
export const DotLoader = ({ isLoader }) => {
  return <>{isLoader && <span className="loader"></span>}</>;
};

export const Loading = ({ isLoader }) => {
  return (
    <>
      {isLoader && (
        <div className="loading">
          <div className="spinner-wrapper text-light">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
