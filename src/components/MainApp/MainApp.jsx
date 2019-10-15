import React from 'react';
import CurrentlyCurrencyCourse from "../CurrentlyCurrencyCourse/CurrentlyCurrencyCourse";
import ConvertCurrency from "../ConvertCurrency/ConvertCurrency";
import ChartCurrency from "../ChartCurrency/ChartCurrency";
import s from './MainApp.module.css';

const MainApp = (props) => {
    return (
        <div className={s.app}>
            <div className={s.currentlyCurrency}>
                <CurrentlyCurrencyCourse/>
            </div>
            <div className={s.convertCurrency}>
                <ConvertCurrency/>
            </div>
            <div className={s.chartCurrency}>
                <ChartCurrency/>
            </div>
        </div>
    )
};

export default MainApp;
