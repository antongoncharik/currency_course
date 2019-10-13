import {getCurrenciesAPI, getCurrencyCourseAPI} from "../API/officialCurrenciesCoursesAPI";
import {calculationAmountCurrency} from "../helpers/calculationAmountCurrency";

const GET_CURRENCIES = 'GET_CURRENCIES';
const GET_CURRENCY_COURSE = 'GET_CURRENCY_COURSE';
const GET_CURRENCY_COURSE_TO_PERIOD = 'GET_CURRENCY_COURSE_TO_PERIOD';
const SET_SELECTED_CURRENCY = 'SET_SELECTED_CURRENCY';
const SET_SELECTED_CURRENCY_UP = 'SET_SELECTED_CURRENCY_UP';
const SET_SELECTED_CURRENCY_DOWN = 'SET_SELECTED_CURRENCY_DOWN';
const SET_AMOUNT_CURRENCY = 'SET_AMOUNT_CURRENCY';

const initialState = {
    currencies: [{currencyId: 145, currencyAbbreviation: '', currencyName: ''}],
    currenciesCourses: [{currencyId: 145, scale: 0, course: 0, date: ''}],
    currencyCourseToPeriod: [{currencyId: 145, course: 0, date: ''}],
    selectedCurrencyId: 145,
    selectedCurrencyUpId: 145,
    selectedCurrencyDownId: 145,
    amountCurrencyUp: 1,
    amountCurrencyDown: 1
};

export const currencyCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENCIES:
            return {
                ...state, currencies: action.dataCurrencies.map(item =>
                    ({
                        currencyId: item.Cur_ID,
                        currencyAbbreviation: item.Cur_Abbreviation,
                        currencyName: item.Cur_Name_Eng
                    }))
            };
            break;
        case GET_CURRENCY_COURSE:
            return {
                ...state, currenciesCourses: [...state.currenciesCourses,
                    {
                        currencyId: action.dataCurrency.Cur_ID,
                        scale: action.dataCurrency.Cur_Scale,
                        course: action.dataCurrency.Cur_OfficialRate,
                        date: action.dataCurrency.Date
                    }
                ].filter(item => {
                    return item.course > 0
                })
            };
            break;
        case
        SET_SELECTED_CURRENCY:
            return {
                ...state, selectedCurrencyId: action.id
            };
            break;
        case
        SET_SELECTED_CURRENCY_UP:
            return {
                ...state, selectedCurrencyUpId: action.id
            };
            break;
        case
        SET_SELECTED_CURRENCY_DOWN:
            return {
                ...state, selectedCurrencyDownId: action.id
            };
            break;
        case
        SET_AMOUNT_CURRENCY:
            return {
                ...state, amountCurrencyUp: action.amountUp,
                amountCurrencyDown: action.amountDown
            };
            break;
        case
        GET_CURRENCY_COURSE_TO_PERIOD:
            break;
        default:
            return state;
    }
};

const getCurrenciesAC = (dataCurrencies) => {
    return {type: 'GET_CURRENCIES', dataCurrencies}
};
const getCurrencyCourseAC = (dataCurrency) => {
    return {type: 'GET_CURRENCY_COURSE', dataCurrency}
};
const getCurrencyCourseToPeriodAC = () => {
    return {type: 'GET_CURRENCY_COURSE_TO_PERIOD'}
};
const setSelectedCurrencyAC = (id) => {
    return {type: 'SET_SELECTED_CURRENCY', id}
};
const setSelectedCurrencyUpAC = (id) => {
    return {type: 'SET_SELECTED_CURRENCY_UP', id}
};
const setSelectedCurrencyDownAC = (id) => {
    return {type: 'SET_SELECTED_CURRENCY_DOWN', id}
};
const setAmountCurrencyAC = (amountUp, amountDown) => {
    return {type: 'SET_AMOUNT_CURRENCY', amountUp, amountDown}
};

export const getCurrencies = () => {
    return async (dispatch) => {
        try {
            const result = await getCurrenciesAPI();
            if (result.status === 200) {
                const currencies = result.data.filter(item => new Date(item.Cur_DateEnd) > new Date());
                dispatch(getCurrenciesAC(currencies));
            }
        } catch (e) {

        }
    }
};
export const getCurrencyCourse = (id, numberCurrency = '', amount, currencyUpId, currencyDownId) => {
    return async (dispatch, getState) => {
        try {
            const result = await getCurrencyCourseAPI(id);
            if (result.status === 200) {
                dispatch(getCurrencyCourseAC(result.data));
                if (numberCurrency === '') {
                    dispatch(setSelectedCurrencyAC(id));
                } else if (numberCurrency === 'up') {
                    dispatch(setSelectedCurrencyUpAC(id));
                    setCalculationCurrency(dispatch, getState().currenciesCourses.currenciesCourses, numberCurrency, amount, id, currencyDownId);
                } else if (numberCurrency === 'down') {
                    dispatch(setSelectedCurrencyDownAC(id));
                    setCalculationCurrency(dispatch, getState().currenciesCourses.currenciesCourses, numberCurrency, amount, currencyUpId, id);
                }
            }
        } catch (e) {

        }
    }
};
export const setAmountCurrency = (changedCurrency, amount, currencyUpId, currencyDownId) => {
    return (dispatch, getState) => {
        setCalculationCurrency(dispatch, getState().currenciesCourses.currenciesCourses, changedCurrency, amount, currencyUpId, currencyDownId);

    }
};
const setCalculationCurrency = (dispatch, currenciesCourses, changedCurrency, amount, currencyUpId, currencyDownId) => {
    const scaleUp = +currenciesCourses.find(item => item.currencyId === +currencyUpId).scale;
    const courseUp = +currenciesCourses.find(item => item.currencyId === +currencyUpId).course;
    const scaleDown = +currenciesCourses.find(item => item.currencyId === +currencyDownId).scale;
    const courseDown = +currenciesCourses.find(item => item.currencyId === +currencyDownId).course;
    if (changedCurrency === 'up') {
        let newAmount = calculationAmountCurrency(+amount, courseUp, courseDown, scaleUp, scaleDown);
        if (currencyUpId === currencyDownId) {
            newAmount = amount;
        }
        dispatch(setAmountCurrencyAC(+amount, +newAmount));
    } else {
        let newAmount = calculationAmountCurrency(+amount, courseDown, courseUp, scaleDown, scaleUp);
        if (currencyUpId === currencyDownId) {
            newAmount = amount;
        }
        dispatch(setAmountCurrencyAC(+newAmount, +amount));
    }
};