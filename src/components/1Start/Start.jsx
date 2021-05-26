import React from 'react';
import {useDispatch} from "react-redux";
import {HashLink as Link} from 'react-router-hash-link';
import {useTranslation} from "react-i18next";

import {updateButton} from "../../redux/buttonsReducer";

import s from './Start.module.css';
import {findDirect, isWayFree, weakSnake} from "../../calculator/superSnake";


const Start = () => {

    const start = [0, 0]
    const finish = [100, 100]
    const stops = [[10, 10], [10, 20], [10, 30], [10, 40], [10, 50], [10, 90], [50, 90], [90, 90], [18, 20], [18, 60]]
    const walls = [[20, 20, 80, 20], [80, 20, 80, 80], [80, 80, 20, 80], [20, 80, 20, 20], [0, 45, 15, 45]]

    console.log(findDirect(start, finish, stops, walls))

    /* const normSnake = (startPoint, endPoint, pitStops, walls) => {
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

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    }

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>{t("plan_your_room")}</h2>
                    <p>{t("plan_your_room_text_p1")}
                        <br/>
                        {t("plan_your_room_text_p2")}
                         <a href="https://www.veriafloorheating.com/" target="_blank"><b>veriafloorheating.com</b></a>
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
                    {t("room_shape")}
                </Link>
            </div>
        </div>
    );
};

export default Start;
