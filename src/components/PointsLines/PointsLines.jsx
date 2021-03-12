import React from 'react';
import LineTo from 'react-lineto';

//Line
export const L = ({from, to}) => {
    return (
        <LineTo from={from} to={to}
                borderWidth={4}
                borderColor={"#868686"}
                zIndex={0}/>
    );
};

