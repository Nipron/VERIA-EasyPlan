import React from 'react';
import '../../styles/main.css';
import '../../styles/modals.css';

const Start = () => {
    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Plan your installation</h2>
                    <p>EasyPlan makes it easy to plan your new Veria system.
                        <br/>
                        The application guides you through a few selections and provides a design and layout plan
                        for achieving maximum heated floor area based on your input.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>
            <div className="content-section">
                <div className="content-section-banner">

                </div>
                <div className="btn-next-step" id="btn-step"><a href="#">Start here</a></div>
            </div>
        </div>
    );
};

export default Start;
