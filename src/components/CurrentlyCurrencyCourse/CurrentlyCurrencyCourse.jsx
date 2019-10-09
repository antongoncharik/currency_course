import React from 'react';
import ButtonCurrency from "../ButtonCurrency/ButtonCurrency";
import s from './CurrentlyCurrencyCourse.module.css';
import cn from 'classnames';

const CurrentlyCurrencyCourse = (props) => {
    return (
        <div>
            <div className={cn(s.blockCourse, s.blockText)}>
                <div>CURRENCY</div>
                <div>COURSE</div>
                <ButtonCurrency name={'USD'}/>
                <div className={s.blockCurrentlyCourse}>2.0078</div>
            </div>
        </div>
    )
};

export default CurrentlyCurrencyCourse;