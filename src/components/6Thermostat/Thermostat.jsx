import React from 'react';

const Thermostat = () => {
    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Add Thermostat</h2>
                    <p>You need this thermostat kit to connect to the 1st mat and to a socket. The kit also has a wired
                        floor sensor.
                        With Veria Wireless Clickkit you will be able to control the temperature quickly and precisely.
                        You may also program
                        4 different time zones during the weekdays and weekend.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                    <div className="product-box">
                        <div className="btn-accept-product" id="select-handler">Wireles Clickkit</div>
                    </div>
                </div>
                <div className="button-box">
                    <div className="info-area-thermostat">
                        <span>Select please...</span>
                    </div>
                    <div className="btn-next-step" id="btn-continue-thermostat"><a
                        href="">Continue</a></div>
                </div>
            </div>
        </div>
    );
};

export default Thermostat;
