import React from 'react';
import Modal from "./Modal";

const ModalRoomSize = ({active, setActive}) => {
    return (
        <Modal active={active} setActive={setActive}>
            <div className="modal-window-room-size">
                <h1 className="modal-title">Adjusting the room size</h1>
                <span className="modal-btn-close" onClick={() => setActive(false)}></span>
                <div className="modal-left-content-box"></div>
                <div className="modal-right-content-box">
                    <h1 className="modal-container-content-title">How to adjust the dimensions:</h1>
                    <p className="modal-container-description">Press and drag the corner handles until the
                        dimensions match your actual room measurements.
                        You can also enter dimensions in centimeter by double clicking the box on a wall.</p>
                    <h1 className="modal-container-content-title">How to add an angled wall:</h1>
                    <p className="modal-container-description">If your room has an angled wall or other obstacle
                        simply click the "Create angled wall" button. Click once on the corner you need to
                        change, then press and drag the corner handle to adjust the dimensions. Repeat to add
                        more angled walls.</p>
                    <h1 className="modal-container-content-title">Show/hide dimension labels</h1>
                    <p className="modal-container-description">If dimesion labels are on your way,
                        you may hide them by clicking "Show/hide labels" button.</p>
                </div>
                <div className="modal-btn-ok" onClick={() => setActive(false)}>ok</div>
            </div>
        </Modal>
    );
};

export default ModalRoomSize;
