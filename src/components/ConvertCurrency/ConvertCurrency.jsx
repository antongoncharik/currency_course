import React, {useState} from 'react';
import s from './ConvertCurrency.module.css';
import cn from 'classnames';
import CommonSelectCurrency from "../CommonComponents/CommonComponents";
import {connect} from "react-redux";
import {getCurrencyCourse} from "../../redux/currencyCourseReducer";

const ConvertCurrency = (props) => {
    const [openedListUp, openCloseListUp] = useState(false);

    const [openedListDown, openCloseListDown] = useState(false);

    const currencyUpAbbreviation = props.currencies.find(item => item.currencyId === +props.selectedCurrencyUpId).currencyAbbreviation;

    const currencyDownAbbreviation = props.currencies.find(item => item.currencyId === +props.selectedCurrencyDownId).currencyAbbreviation;

    const scaleUp = props.currenciesCourses.find(item => item.currencyId === +props.selectedCurrencyUpId).scale;

    const scaleDown = props.currenciesCourses.find(item => item.currencyId === +props.selectedCurrencyDownId).scale;

    const changeCurrencyUp = (e) => {
        openCloseListUp(false);
        props.getCurrencyCourse(e.currentTarget.value, 'up');
    };

    const changeCurrencyDown = (e) => {
        openCloseListDown(false);
        props.getCurrencyCourse(e.currentTarget.value, 'down');
    };

    return (
        <div>
            <div className={cn(s.blockText, s.blockConvertCurrency)}>
                <div className={cn(s.textConvert)}>CONVERT CURRENCY</div>
                <div className={cn(s.currency1)}>
                    {openedListUp &&
                    <CommonSelectCurrency currencies={props.currencies}
                                          selectedCurrencyId={props.selectedCurrencyUpId}
                                          changeCurrency={(e) => changeCurrencyUp(e)}/> ||
                    <div className={s.blockCurrentlyCourseText}
                         onClick={() => openCloseListUp(true)}>{`${currencyUpAbbreviation} (${scaleUp})`}</div>}
                </div>
                <div className={cn(s.count1)}>
                    <input/>
                </div>
                <div className={cn(s.currency2)}>
                    {openedListDown &&
                    <CommonSelectCurrency currencies={props.currencies}
                                          selectedCurrencyId={props.selectedCurrencyDownId}
                                          changeCurrency={(e) => changeCurrencyDown(e)}/> ||
                    <div className={s.blockCurrentlyCourseText}
                         onClick={() => openCloseListDown(true)}>{`${currencyDownAbbreviation} (${scaleDown})`}</div>}
                </div>
                <div className={cn(s.count2)}>
                    <input/>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        currencies: state.currenciesCourses.currencies,
        currenciesCourses: state.currenciesCourses.currenciesCourses,
        selectedCurrencyUpId: state.currenciesCourses.selectedCurrencyUpId,
        selectedCurrencyDownId: state.currenciesCourses.selectedCurrencyDownId
    }
}

export default connect(mapStateToProps, {
    getCurrencyCourse
})(ConvertCurrency);