import {getCurrenciesAPI, getCurrencyCourseAPI} from "../API/officialCurrenciesCoursesAPI";

const GET_CURRENCIES = 'GET_CURRENCIES';
const GET_CURRENCY_COURSE = 'GET_CURRENCY_COURSE';
const GET_CURRENCY_COURSE_TO_PERIOD = 'GET_CURRENCY_COURSE_TO_PERIOD';

const initialState = {
    currencies: [{currencyId: 145, currencyAbbreviation: 'USD', currencyName: 'US Dollar'}],
    currenciesCourses: [{currencyId: 145, scale: 1, course: 2, date: ''}],
    currencyCourseToPeriod: [{currencyId: 145, course: 2, date: ''}],
    selectedCurrencyId: 145
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
                    state.currenciesCourses.find(item => {item.currencyId === })
                    ({
                        currencyId: action.dataCurrency.Cur_ID,
                        scale: action.dataCurrency.Cur_Scale,
                        course: action.dataCurrency.Cur_OfficialRate,
                        date: action.dataCurrency.Date
                    })]
            };
            break;
        case GET_CURRENCY_COURSE_TO_PERIOD:
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

export const getCurrencies = () => {
    return async (dispatch) => {
        try {
            const result = await getCurrenciesAPI();
            if (result.status === 200) {
                dispatch(getCurrenciesAC(result.data));
            }
        } catch (e) {

        }
    }
}

export const getCurrencyCourse = (id) => {
    return async (dispatch) => {
        try {
            const result = await getCurrencyCourseAPI(id);
            if (result.status === 200) {
                dispatch(getCurrencyCourseAC(result.data));
            }
        } catch (e) {

        }
    }
}