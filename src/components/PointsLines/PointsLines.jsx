import React from 'react';
import LineTo from 'react-lineto';
import Xarrow from "react-xarrows";

//Line
export const L = ({from, to}) => {

    {/*


    left: (pos01angled) ? pos01shadow.x + (minDist) : minDist * 2,
                                           top: pos01.y + minDist + (!pos01angled && minDist),
                                           right: (pos02angled) ? pos02.x - minDist : maxWidth,
                                           bottom: (pos02angled) ? pos02.y - minDist : maxHeight










    */}






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


