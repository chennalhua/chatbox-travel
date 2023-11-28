import React, { useState } from "react";
export const DotLoader = ({ isLoader }) => {
  return <>{isLoader && <span className="loader"></span>}</>;
};
