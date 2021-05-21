import React from 'react';
import {useDispatch} from "react-redux";
import {HashLink as Link} from 'react-router-hash-link';

import {updateButton} from "../../redux/buttonsReducer";

import s from './Start.module.css';
import {isWayFree, weakSnake} from "../../calculator/superSnake";

const Start = () => {

  /*  const start = [0,0]
    const finish = [100, 100]
    const stops = [[10,10], [10, 20], [10, 30], [10, 40], [10, 50], [10, 90], [50, 90], [90, 90], [18, 20], [18, 60]]
    const walls =[[20, 20, 80, 20],[80, 20, 80, 80],[80, 80, 20, 80],[20, 80, 20, 20], [0, 45, 6, 45]]

     const normSnake = (startPoint, endPoint, pitStops, walls) => {
        let resultPath = weakSnake(startPoint, endPoint, pitStops, walls)
        if (resultPath.length < 3) return resultPath;
        let count = resultPath.length
         console.log(resultPath)
        for (let i = 0; i < count - 2; i++) {
            for (let j = 0; j < count - i; j++) {
                if (isWayFree(resultPath[i], resultPath[count - 1 - j], walls)) {
                    resultPath.splice(i + 1, count - j - i - 2)
                    console.log(resultPath)
                    count = count - j - i - 2
                }
            }
        }
        return resultPath;
    }

    console.log(normSnake(start, finish, stops, walls))*/





    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    }

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Plan your installation</h2>
                    <p>EasyPlan makes it easy to plan your new Veria system.
                        <br/>
                        The application guides you through a few selections and provides a design and layout plan for achieving maximum heated floor area based on your input.
                        Please note,  that this program serves for visualization purpose. If you are not fully satisfied with the results of our calculations and visualization, please contact us for further engineering support: <b>veriafloorheating.com</b>
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>
            <div className="content-section">
                <div className="content-section-banner">
                    <div className={s.slider}>
                        <div className={`${s.slide} ${s.slide1}`}/>
                        <div className={`${s.slide} ${s.slide2}`}/>
                        <div className={`${s.slide} ${s.slide3}`}/>
                        <div className={`${s.slide} ${s.slide1}`}/>
                    </div>
                </div>
                <Link to="/roomshape" onClick={() => handleClick(2)} className={s.btnNextStep}>
                    Room Shape
                </Link>
            </div>
        </div>
    );
};

export default Start;
