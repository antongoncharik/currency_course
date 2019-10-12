import {getCurrenciesAPI, getCurrencyCourseAPI} from "../API/officialCurrenciesCoursesAPI";

const GET_CURRENCIES = 'GET_CURRENCIES';
const GET_CURRENCY_COURSE = 'GET_CURRENCY_COURSE';
const GET_CURRENCY_COURSE_TO_PERIOD = 'GET_CURRENCY_COURSE_TO_PERIOD';
const SET_SELECTED_CURRENCY = 'SET_SELECTED_CURRENCY';
const SET_SELECTED_CURRENCY_UP = 'SET_SELECTED_CURRENCY_UP';
const SET_SELECTED_CURRENCY_DOWN = 'SET_SELECTED_CURRENCY_DOWN';

const initialState = {
    currencies: [{currencyId: 145, currencyAbbreviation: '', currencyName: ''}],
    currenciesCourses: [{currencyId: 145, scale: 0, course: 0, date: ''}],
    currencyCourseToPeriod: [{currencyId: 145, course: 0, date: ''}],
    selectedCurrencyId: 145,
    selectedCurrencyUpId: 145,
    selectedCurrencyDownId: 145
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

export const getCurrencyCourse = (id, numberCurrency = '') => {
    return async (dispatch) => {
        try {
            const result = await getCurrencyCourseAPI(id);
            if (result.status === 200) {
                dispatch(getCurrencyCourseAC(result.data));
                if (numberCurrency === '') {
                    dispatch(setSelectedCurrencyAC(id));
                } else if (numberCurrency === 'up') {
                    dispatch(setSelectedCurrencyUpAC(id));
                } else if (numberCurrency === 'down') {
                    dispatch(setSelectedCurrencyDownAC(id));
                }
            }
        } catch (e) {

        }
    }
};