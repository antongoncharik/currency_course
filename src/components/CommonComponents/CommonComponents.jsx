import React from 'react';
import cs from "./CommonComponents.module.css";

const CommonSelectCurrency = (props) => {
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

export default CommonSelectCurrency;