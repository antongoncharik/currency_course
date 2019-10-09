import React from 'react';
import s from './ButtonCurrency.module.css';

const ButtonCurrency = (props) => {
    return (
        <button className={s.button}>{props.name}</button>
    )
}

export default ButtonCurrency;