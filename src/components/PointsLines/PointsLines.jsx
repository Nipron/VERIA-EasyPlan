import React from 'react';
import LineTo from 'react-lineto';
import Xarrow from "react-xarrows";

//Line
export const L = ({from, to}) => {
    return (
        <Xarrow
            start={from}
            end={to}
            path="straight"
            color="#868686"
            headSize={0}
            strokeWidth={5}
        />
    );
};


