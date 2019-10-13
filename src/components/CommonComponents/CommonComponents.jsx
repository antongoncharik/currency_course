import React from 'react';
import cs from "./CommonComponents.module.css";

export const CommonSelectCurrency = (props) => {
    return (
        <select defaultValue={props.selectedCurrencyId}
                className={cs.select}
                onChange={(e) => props.changeCurrency(e)}
                onBlur={(e) => props.changeCurrency(e)}>
            {props.currencies.map(item =>
                <option key={item.currencyId}
                        value={item.currencyId}>{item.currencyAbbreviation}</option>)}
        </select>
    )
};

export const CommonInputCurrency = (props) => {
    return (
        <input type='number'
               min='0'
               value={props.amountCurrency}
               onChange={(e) => props.changeAmountCurrency(e, 'up', props.selectedCurrencyUpId, props.selectedCurrencyDownId)}/>
    )
};
