import React, {useState, useEffect} from 'react';
import s from './CurrentlyCurrencyCourse.module.css';
import cs from './../CommonCSS/Select.module.css';
import cn from 'classnames';
import {connect} from "react-redux";
import {getCurrencies, getCurrencyCourse} from "../../redux/currencyCourseReducer";

const CurrentlyCurrencyCourse = (props) => {
        const [openedList, openCloseList] = useState(false);

        useEffect(() => {
            props.getCurrencies();
            props.getCurrencyCourse(145);
        }, [props.currencies.length]);

        const course = props.currenciesCourses.find(item => item.currencyId === +props.selectedCurrencyId).course;

        const currencyAbbreviation = props.currencies.find(item => item.currencyId === +props.selectedCurrencyId).currencyAbbreviation;

        const changeCurrency = (e) => {
            openCloseList(false);
            props.getCurrencyCourse(e.currentTarget.value);
        };

        return (
            <div>
                <div className={cn(s.blockCourse, s.blockText)}>
                    <div>CURRENCY</div>
                    <div>COURSE</div>
                    {openedList &&
                    <select defaultValue={props.selectedCurrencyId}
                            className={cs.select}
                            onChange={(e) => changeCurrency(e)}
                            onBlur={(e) => changeCurrency(e)}>
                        {props.currencies.map(item =>
                            <option key={item.currencyId}
                                    value={item.currencyId}>{item.currencyAbbreviation}</option>)}
                    </select> ||
                    <div className={s.blockCurrentlyCourse}
                         onClick={() => openCloseList(true)}>{currencyAbbreviation}</div>}
                    <div className={s.blockCurrentlyCourse}>{course}</div>
                </div>
            </div>
        )
    }
;

const mapStateToProps = (state) => {
    return {
        currencies: state.currenciesCourses.currencies,
        currenciesCourses: state.currenciesCourses.currenciesCourses,
        selectedCurrencyId: state.currenciesCourses.selectedCurrencyId
    }
}

export default connect(mapStateToProps, {getCurrencies, getCurrencyCourse})(CurrentlyCurrencyCourse);