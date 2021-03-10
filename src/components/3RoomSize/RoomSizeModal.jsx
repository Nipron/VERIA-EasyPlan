import React from 'react';

import s from "./RoomSize.module.css";

const RoomSizeModal = ({active, setActive}) => {
    return (
        <div className={active ? `${s.modal} ${s.active}` : s.modal}
             onClick={() => setActive(false)}
        >
            <div className={s.modal__content}
            onClick={e => e.stopPropagation()}>
                Epta
            </div>
        </div>
    );
};

export default RoomSizeModal;
