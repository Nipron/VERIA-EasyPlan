import React from 'react';

const ColdSpots = () => {
    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Cold spots</h2>
                    <p>Here you can add 'cold spots' for areas where underfloor heating should not be placed due to
                        obstacles or certain types of furniture.
                        Note that you can only place the cold spot within the exterior walls (cold spot is yellow). If
                        the cold spot crosses the exterior wall (cold spot is red) it must be moved with the room again.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                    <span id="square"></span>
                </div>
                <div className="button-box">
                    <div id="btn-add-cold-spot" className="box_btn-style">Add Cold Spot</div>
                    <div id="btn-help-cold-spot" className="box_btn-style-black">Need help?</div>

                    <div className="bin-area">
                        <span>Drag here to delete</span>
                    </div>
                    <div className="btn-next-step" id="btn-continue"><a href="">Continue</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColdSpots;
