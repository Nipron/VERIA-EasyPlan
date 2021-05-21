import React from 'react';
import Modal from "./Modal";

const ModalPartsList = ({active, setActive, list}) => {
    return (
        <Modal active={active} setActive={setActive}>
            <div className="modal-window-parts-list">
                <h1 className="modal-title">List of parts</h1>
                <span className="modal-btn-close" onClick={() => setActive(false)}></span>
                <div className="parts-list-inner-field">
                    <div className="parts-list-header">
                        <span className="parts-list-header-text">Qty & Part name (part no.)</span>
                    </div>
                    <div className="parts-list-content">
                        {Object.keys(list).map(key => {
                                let name = '';
                                switch (key) {
                                    case "mat5_100":
                                        name = `Veria Clickmat 100, 5m${"\u00B2"}`
                                        break;
                                    case "mat4_100":
                                        name = `Veria Clickmat 100, 4m${"\u00B2"}`
                                        break;
                                    case "mat3_100":
                                        name = `Veria Clickmat 100, 3m${"\u00B2"}`
                                        break;
                                    case "mat2_100":
                                        name = `Veria Clickmat 100, 2m${"\u00B2"}`
                                        break;
                                    case "mat5_55":
                                        name = `Veria Clickmat 55, 5m${"\u00B2"}`
                                        break;
                                    case "mat4_55":
                                        name = `Veria Clickmat 55, 4m${"\u00B2"}`
                                        break;
                                    case "mat3_55":
                                        name = `Veria Clickmat 55, 3m${"\u00B2"}`
                                        break;
                                    case "mat2_55":
                                        name = `Veria Clickmat 55, 2m${"\u00B2"}`
                                        break;
                                    case "cord2":
                                        name = `Veria Clickmat extension cord, 2m`
                                        break;
                                    case "cord1":
                                        name = `Veria Clickmat extension cord, 1m`
                                        break;
                                    case "cord025":
                                        name = `Veria Clickmat extension cord, 0.25m`
                                        break;
                                    case "kit100":
                                        name = `Veria Wireless Clickkit 100`
                                        break;
                                    case "kit55":
                                        name = `Veria Wireless Clickkit 55`
                                        break;
                                    default:
                                        name = "something wrong";
                                }

                                if (list[key] > 0) {
                                    return <div className="parts-list-section">
                                        <span className="parts-list-text">{`${list[key]} x ${name}`}</span>
                                    </div>
                                }
                            }
                        )
                        }
                    </div>
                    <div className="find-dealers">Find dealers</div>
                    <div className="dealers-site">
                        <a href="https://www.veriafloorheating.com/"
                           target="_blank"
                           style={{textDecoration: "none"}}>veriafloorheating.com</a>
                    </div>
                </div>
                <div className="modal-btn-ok" onClick={() => setActive(false)}>ok</div>
            </div>

        </Modal>
    );
};

export default ModalPartsList;