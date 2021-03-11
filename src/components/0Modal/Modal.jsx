import React from 'react';

import '../../styles/main.css';
import '../../styles/modals.css';
import s from "./Modal.module.css";

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? `${s.modal} ${s.active}` : s.modal} onClick={() => setActive(false)}>
            <div className={s.modal__content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;