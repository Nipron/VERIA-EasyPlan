import React from 'react';
import Modal from "./Modal";
import {useTranslation} from "react-i18next";

const ModalRoomSize = ({active, setActive}) => {

    const {t} = useTranslation();

    return (
        <Modal active={active} setActive={setActive}>
            <div className="modal-window-room-size">
                <h1 className="modal-title">{t("adjusting_the_room_size")}</h1>
                <span className="modal-btn-close" onClick={() => setActive(false)}></span>
                <div className="modal-left-content-box"></div>
                <div className="modal-right-content-box">
                    <h1 className="modal-container-content-title">{t("how_to_adjust")}</h1>
                    <p className="modal-container-description">{t("how_to_adjust_text")}</p>
                    <h1 className="modal-container-content-title">{t("how_to_add_wall")}</h1>
                    <p className="modal-container-description">{t("how_to_add_wall_text")}</p>
                    <h1 className="modal-container-content-title">{t("show_hide_dimension_labels")}</h1>
                    <p className="modal-container-description">{t("show_hide_dimension_labels_text")}</p>
                </div>
                <div className="modal-btn-ok" onClick={() => setActive(false)}>ok</div>
            </div>
        </Modal>
    );
};

export default ModalRoomSize;
