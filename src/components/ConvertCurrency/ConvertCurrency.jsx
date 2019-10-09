import React from 'react';
import s from './ConvertCurrency.module.css';
import cn from 'classnames';
import ButtonCurrency from "../ButtonCurrency/ButtonCurrency";

const ConvertCurrency = (props) => {
    return (
        <div>
            <div className={cn(s.blockText, s.blockConvertCurrency)}>
                <div className={cn(s.textConvert)}>CONVERT CURRENCY</div>
                <div className={cn(s.currency1)}>
                    <ButtonCurrency name={'USD'}/>
                </div>
                <div className={cn(s.count1)}>
                    <input/>
                </div>
                <div className={cn(s.currency2)}>
                    <ButtonCurrency name={'EUR'}/>
                </div>
                <div className={cn(s.count2)}>
                    <input/>
                </div>
            </div>
        </div>
    )
};

export default ConvertCurrency;