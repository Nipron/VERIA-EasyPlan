import React from 'react';
import s from "./DimInput.module.css";

const DimInput = (props) => {
    return (
        <input
            className={s.dimInput}
            type="number"
            value={(props.value * 2).toString()}
            onChange={e => props.setter(e.target.value / 2)}
            onKeyPress={e => (e.key === "Enter") && props.action()}
            autoFocus={true}
            onBlur={props.action}/>
    );
};

export default DimInput;
