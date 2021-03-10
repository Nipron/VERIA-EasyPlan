import React from 'react';
import laminate from '../../img/laminate.jpg';
import parquet from '../../img/parquet.jpg';
import veria from "../../img/veria-logo.png";
import unburnable from "../../img/unburnable.jpg";
import burnable from "../../img/burnable-wood.jpg";

const FloorType = () => {
    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Select Floor Type</h2>
                    <p>Top floor covering is the type of surface that you wish to lay on top of the floor after
                        installing the floor heating.

                        Subfloor construction is the surface that the heating elements will be laid out on.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>


            <div className="content-section-grid">
                <div className="constructor-box">
                    <form className="floor-type-form" id="cover-form" action="" method="get">
                        <div className="top-covering">
                            <h2>Top floor covering</h2>
                            <ul>
                                <li>
                                    <img src={laminate} alt="laminate"/>
                                        <input type="checkbox" name="laminate"/>
                                            <label htmlFor="laminate">laminate</label>
                                </li>
                                <li>
                                    <img src={parquet} alt="laminate"/>
                                        <input type="checkbox" name="parquet"/>
                                            <label htmlFor="parquet">parquet</label>
                                </li>
                            </ul>
                        </div>
                        <span className="form-logo">
              <img src={veria} alt="form-logo"/>
              <hr/>
            </span>
                        <div className="subfloor-covering">
                            <h2>Subfloor covering</h2>
                            <ul>
                                <li>
                                    <span className="icon_unburnuble"></span>
                                    <img className="unburnable-icon" src={unburnable} alt="unburnable"/>
                                        <input type="checkbox" name="unburnable"/>
                                            <label htmlFor="unburnable">unburnable</label>
                                </li>
                                <li>
                                    <span className="icon_burnable"></span>
                                    <img className="burnuble-icon" src={burnable} alt="burnable"/>
                                        <input type="checkbox" name="burnable"/>
                                            <label htmlFor="burnable">burnable</label>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="button-box">
                    <div id="btn-help-floor-type" className="box_btn-style-black">Need help?</div>
                    <div className="info-area">
                        <span>Select please top and subfloor...</span>
                    </div>
                    <button type="submit" form="cover-form">Continue</button>

                </div>
            </div>
        </div>
    );
};

export default FloorType;
