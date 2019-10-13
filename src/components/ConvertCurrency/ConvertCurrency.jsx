import React, {useState} from 'react';
import s from './ConvertCurrency.module.css';
import cn from 'classnames';
import {CommonSelectCurrency, CommonInputCurrency} from "../CommonComponents/CommonComponents";
import {connect} from "react-redux";
import {getCurrencyCourse, setAmountCurrency} from "../../redux/currencyCourseReducer";

const ConvertCurrency = (props) => {
    const [openedListUp, openCloseListUp] = useState(false);

    const [openedListDown, openCloseListDown] = useState(false);

    const currencyUpAbbreviation = props.currencies.find(item => item.currencyId === +props.selectedCurrencyUpId).currencyAbbreviation;

    const currencyDownAbbreviation = props.currencies.find(item => item.currencyId === +props.selectedCurrencyDownId).currencyAbbreviation;

    const scaleUp = props.currenciesCourses.find(item => item.currencyId === +props.selectedCurrencyUpId).scale;

    const scaleDown = props.currenciesCourses.find(item => item.currencyId === +props.selectedCurrencyDownId).scale;

    const changeCurrencyUp = (e) => {
        openCloseListUp(false);
        props.getCurrencyCourse(e.currentTarget.value, 'up', props.amountCurrencyUp, props.selectedCurrencyUpId, props.selectedCurrencyDownId);
    };

    const changeCurrencyDown = (e) => {
        openCloseListDown(false);
        props.getCurrencyCourse(e.currentTarget.value, 'down', props.amountCurrencyDown, props.selectedCurrencyUpId, props.selectedCurrencyDownId);
    };

    const changeAmountCurrency = (e, changedCurrency, currencyUpId, currencyDownId) => {
        props.setAmountCurrency(changedCurrency, +e.currentTarget.value, currencyUpId, currencyDownId);
    };

    return (
        <div>
            <div className={cn(s.blockText, s.blockConvertCurrency)}>
                <div className={cn(s.textConvert)}>CONVERT CURRENCY</div>
                <div className={cn(s.currencyUp)}>
                    {openedListUp &&
                    <CommonSelectCurrency currencies={props.currencies}
                                          selectedCurrencyId={props.selectedCurrencyUpId}
                                          changeCurrency={(e) => changeCurrencyUp(e)}/> ||
                    <div className={s.blockCurrentlyCourseText}
                         onClick={() => openCloseListUp(true)}>{`${currencyUpAbbreviation} (${scaleUp})`}</div>}
                </div>
                <div className={cn(s.countUp)}>
                    <CommonInputCurrency amountCurrency={props.amountCurrencyUp}
                                         selectedCurrencyUpId={props.selectedCurrencyUpId}
                                         selectedCurrencyDownId={props.selectedCurrencyDownId}
                                         changeAmountCurrency={(e) => changeAmountCurrency(e, 'up', props.selectedCurrencyUpId, props.selectedCurrencyDownId)}/>
                </div>
                <div className={cn(s.currencyDown)}>
                    {openedListDown &&
                    <CommonSelectCurrency currencies={props.currencies}
                                          selectedCurrencyId={props.selectedCurrencyDownId}
                                          changeCurrency={(e) => changeCurrencyDown(e)}/> ||
                    <div className={s.blockCurrentlyCourseText}
                         onClick={() => openCloseListDown(true)}>{`${currencyDownAbbreviation} (${scaleDown})`}</div>}
                </div>
                <div className={cn(s.countDown)}>
                    <CommonInputCurrency amountCurrency={props.amountCurrencyDown}
                                         selectedCurrencyUpId={props.selectedCurrencyUpId}
                                         selectedCurrencyDownId={props.selectedCurrencyDownId}
                                         changeAmountCurrency={(e) => changeAmountCurrency(e, 'down', props.selectedCurrencyUpId, props.selectedCurrencyDownId)}/>
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
        selectedCurrencyDownId: state.currenciesCourses.selectedCurrencyDownId,
        amountCurrencyUp: state.currenciesCourses.amountCurrencyUp,
        amountCurrencyDown: state.currenciesCourses.amountCurrencyDown
    }
};

export default connect(mapStateToProps, {
    getCurrencyCourse, setAmountCurrency
})(ConvertCurrency);