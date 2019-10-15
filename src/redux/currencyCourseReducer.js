import {
    getCurrenciesAPI,
    getCurrencyCourseAPI,
    getCurrencyCourseToPeriodAPI
} from "../API/officialCurrenciesCoursesAPI";
import {calculationAmountCurrency} from "../helpers/calculationAmountCurrency";

const GET_CURRENCIES = 'GET_CURRENCIES';
const GET_CURRENCY_COURSE = 'GET_CURRENCY_COURSE';
const GET_CURRENCY_COURSE_TO_PERIOD = 'GET_CURRENCY_COURSE_TO_PERIOD';
const SET_SELECTED_CURRENCY = 'SET_SELECTED_CURRENCY';
const SET_SELECTED_CURRENCY_UP = 'SET_SELECTED_CURRENCY_UP';
const SET_SELECTED_CURRENCY_DOWN = 'SET_SELECTED_CURRENCY_DOWN';
const SET_AMOUNT_CURRENCY = 'SET_AMOUNT_CURRENCY';
const SET_PERIOD = 'SET_PERIOD';

const initialState = {
    currencies: [{currencyId: 145, currencyAbbreviation: '', currencyName: ''}],
    currenciesCourses: [{currencyId: 145, scale: 0, course: 0, date: ''}],
    currencyCourseToPeriod: [{currencyId: 145, course: 0, date: ''}, {currencyId: 145, course: 1, date: ''}],
    selectedCurrencyId: 145,
    selectedCurrencyUpId: 145,
    selectedCurrencyDownId: 145,
    amountCurrencyUp: 1,
    amountCurrencyDown: 1,
    startDate: '',
    endDate: ''
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
            return {
                ...state, currencyCourseToPeriod: action.dataCurrencyToPeriod.map(item =>
                    ({
                        currencyId: item.Cur_ID,
                        course: item.Cur_OfficialRate,
                        date: item.Date.slice(0, 10)
                    }))
            };
            break;
        case
        SET_PERIOD:
            return {
                ...state, startDate: action.startDate, endDate: action.endDate
            };
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
const getCurrencyCourseToPeriodAC = (id, dataCurrencyToPeriod) => {
    return {type: 'GET_CURRENCY_COURSE_TO_PERIOD', id, dataCurrencyToPeriod}
};
const getSelectedCurrencyAC = (id) => {
    return {type: 'SET_SELECTED_CURRENCY', id}
};
const getSelectedCurrencyUpAC = (id) => {
    return {type: 'SET_SELECTED_CURRENCY_UP', id}
};
const getSelectedCurrencyDownAC = (id) => {
    return {type: 'SET_SELECTED_CURRENCY_DOWN', id}
};
const getAmountCurrencyAC = (amountUp, amountDown) => {
    return {type: 'SET_AMOUNT_CURRENCY', amountUp, amountDown}
};
const getPeriodAC = (startDate, endDate) => {
    return {type: 'SET_PERIOD', startDate, endDate}
};

export const setCurrencies = () => {
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
export const setCurrencyCourse = (id, numberCurrency = '', amount, currencyUpId, currencyDownId) => {
    return async (dispatch, getState) => {
        try {
            const result = await getCurrencyCourseAPI(id);
            if (result.status === 200) {
                dispatch(getCurrencyCourseAC(result.data));
                if (numberCurrency === '') {
                    dispatch(getSelectedCurrencyAC(id));
                } else if (numberCurrency === 'up') {
                    dispatch(getSelectedCurrencyUpAC(id));
                    setCalculationCurrency(dispatch, getState().currenciesCourses.currenciesCourses, numberCurrency,
                        amount, id, currencyDownId);
                } else if (numberCurrency === 'down') {
                    dispatch(getSelectedCurrencyDownAC(id));
                    setCalculationCurrency(dispatch, getState().currenciesCourses.currenciesCourses, numberCurrency,
                        amount, currencyUpId, id);
                }
            }
        } catch (e) {

        }
    }
};
export const setPeriod = (startDate, endDate) => {
    return (dispatch) => {
        dispatch(getPeriodAC(startDate, endDate));
    }
};
export const getCurrencyCourseToPeriod = (id, startDate, endDate) => {
    return async (dispatch) => {
        try {
            const result = await getCurrencyCourseToPeriodAPI(id, startDate, endDate);
            if (result.status === 200) {
                dispatch(getCurrencyCourseToPeriodAC(id, result.data));
            }
        } catch (e) {

        }
    }
};
export const setAmountCurrency = (changedCurrency, amount, currencyUpId, currencyDownId) => {
    return (dispatch, getState) => {
        setCalculationCurrency(dispatch, getState().currenciesCourses.currenciesCourses, changedCurrency,
            amount, currencyUpId, currencyDownId);
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
        dispatch(getAmountCurrencyAC(+amount, +newAmount));
    } else {
        let newAmount = calculationAmountCurrency(+amount, courseDown, courseUp, scaleDown, scaleUp);
        if (currencyUpId === currencyDownId) {
            newAmount = amount;
        }
        dispatch(getAmountCurrencyAC(+newAmount, +amount));
    }
};