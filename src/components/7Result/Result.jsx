import React from 'react';
import {useSelector} from "react-redux";
import {Layer, Line, Stage} from "react-konva";

const Result = () => {

    let room = useSelector(state => state.room);
    let coldSpot = useSelector(state => state.coldSpot);



    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Result</h2>
                    <p>
                        Please note that this is a computer generated simulation.
                        <br/>
                        Installation of products on site may vary. Always be sure to carefully follow the instructions
                        enclosed in the package.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">

                    <Stage width={1220} height={320}>
                        <Layer name="main-layer">
                            <Line
                                x={302}
                                y={2}
                                points={room}
                                closed
                                stroke="#868686"
                                strokeWidth={5}
                                fill="yellow"
                            />
                        </Layer>
                        <Layer name="chair01">
                            <Line
                                x={0}
                                y={0}
                                points={coldSpot}
                                closed
                                stroke="#868686"
                                strokeWidth={2}
                                fill={"green"}
                            />
                        </Layer>
                    </Stage>



                    {/*<span className="calculation-process">Calculation Project...</span>
                    <span className="printing-project">Printing Project...</span>
                    <span className="calculation-complete">Calculation complete</span>*/}
                    <div className="block-button">
                        <div className="btn-notes-loading">Add Notes</div>
                        <div className="btn-list-loading">List of Parts / Where to Buy</div>
                        <div className="btn-print-project-loading"><a href="#">Print Project</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
