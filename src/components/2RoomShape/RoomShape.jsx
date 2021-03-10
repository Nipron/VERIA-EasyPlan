import React from 'react';
import rectangular from '../../img/ractangular.svg';
import rectangularL from '../../img/ractangular-l-type.svg';
import rectangularT from '../../img/ractangular-t-type.svg';

const RoomShape = () => {
    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Select Room Shape</h2>
                    <p>Please choose a shape similar to the room where you will be installing underfloor heating.
                        <br/>
                        The size of the room will be adjusted at a later step.</p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>
            <div className="content-section">
                <div className="content-box">
                    <div className="object-container">
                        <div className="rectangular"><img src={rectangular} alt="rectangular"/></div>
                        <div className="btn-select selected" id="btn-rectangular">
                            <a href="">Rectangular</a>
                        </div>
                    </div>
                    <div className="object-container">
                        <div className="rectangular"><img src={rectangularL} alt="rectangular-l"/>
                        </div>
                        <div className="btn-select" id="btn-l"><a href="">L-Shaped</a></div>
                    </div>
                    <div className="object-container">
                        <div className="rectangular"><img src={rectangularT} alt="rectangular-t"/>
                        </div>
                        <div className="btn-select" id="btn-t"><a href="">T-Shaped</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomShape;
