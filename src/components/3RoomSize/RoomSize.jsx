import React from 'react';

const RoomSize = () => {
    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Adjust Room Size</h2>
                    <p>Adjust the dimensions to match your actual room measurements.
                        Make sure to be as accurate as possible when dimensioning the room to ensure reliable results.
                        If you right-click anywhere on the room you can zoom in and thus make it easier to adjust the
                        room's exact size. Remember to zoom out when finished.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                    <span id="square"></span>
                </div>
                <div className="button-box">
                    <div id="btn-create-angle" className="box_btn-style">Create angled wall</div>
                    <div id="bnt-labels" className="box_btn-style">Show/hide labels</div>
                    <div id="btn-help-room-size" className="box_btn-style-black">Need help?</div>
                    <div id="room-size-count">15,3 m<sup>2</sup></div>
                    <div className="btn-next-step" id="btn-continue"><a href="">Continue</a></div>
                </div>
            </div>
        </div>
    );
};

export default RoomSize;
