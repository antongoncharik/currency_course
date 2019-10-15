import React, {useState, useEffect} from 'react';
import s from './CurrentlyCurrencyCourse.module.css';
import cn from 'classnames';
import {connect} from "react-redux";
import {setCurrencies, setCurrencyCourse, getCurrencyCourseToPeriod} from "../../redux/currencyCourseReducer";
import {CommonSelectCurrency} from "../CommonComponents/CommonComponents";

const CurrentlyCurrencyCourse = (props) => {
    const [openedList, openCloseList] = useState(false);

    useEffect(() => {
        props.setCurrencies();
        props.setCurrencyCourse(145);
    }, [props.currencies.length]);

    useEffect(() => {
        props.getCurrencyCourseToPeriod(props.selectedCurrencyId, props.startDate, props.endDate);
    }, [props.selectedCurrencyId]);

    const course = props.currenciesCourses.find(item => item.currencyId === +props.selectedCurrencyId).course;

    const scale = props.currenciesCourses.find(item => item.currencyId === +props.selectedCurrencyId).scale;

    const currencyAbbreviation = props.currencies.find(item => item.currencyId === +props.selectedCurrencyId).currencyAbbreviation;

    const changeCurrency = (e) => {
        openCloseList(false);
        props.setCurrencyCourse(e.currentTarget.value);
    };

    return (
        <div>
            <div className={cn(s.blockCourse, s.blockText)}>
                <div>CURRENCY</div>
                <div>COURSE</div>
                {openedList &&
                <CommonSelectCurrency currencies={props.currencies}
                                      selectedCurrencyId={props.selectedCurrencyId}
                                      changeCurrency={(e) => changeCurrency(e)}/> ||
                <div className={s.blockCurrentlyCourse}
                     onClick={() => openCloseList(true)}>{`${currencyAbbreviation} (${scale})`}</div>}
                <div className={s.blockCurrentlyCourse}>{course}</div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        currencies: state.currenciesCourses.currencies,
        currenciesCourses: state.currenciesCourses.currenciesCourses,
        selectedCurrencyId: state.currenciesCourses.selectedCurrencyId,
        startDate: state.currenciesCourses.startDate,
        endDate: state.currenciesCourses.endDate
    }
};

export default connect(mapStateToProps, {
    setCurrencies,
    setCurrencyCourse,
    getCurrencyCourseToPeriod
})(CurrentlyCurrencyCourse);