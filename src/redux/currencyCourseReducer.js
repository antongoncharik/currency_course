const GET_CURRENCIES = 'GET_CURRENCIES';
const GET_CURRENCY_COURSE = 'GET_CURRENCY_COURSE';
const GET_CURRENCY_COURSE_TO_PERIOD = 'GET_CURRENCY_COURSE_TO_PERIOD';

const initialState = {
    currencies: [{currencyId: 145, currencyAbbreviation: 'USD', currencyName: 'US Dollar'}],
    currenciesCourses: [{currencyId: 145, scale: 1, course: 2, date: ''}],
    currencyCourseToPeriod: [{currencyId: 145, course: 2, date: ''}]
};

export const currencyCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENCIES:
            break;
        case GET_CURRENCY_COURSE:
            break;
        case GET_CURRENCY_COURSE_TO_PERIOD:
            break;
        default:
            return state;
    }
};

const getCurrenciesAC = () => {
    return {type: 'GET_CURRENCIES'}
};

const getCurrencyCourseAC = () => {
    return {type: 'GET_CURRENCY_COURSE'}
};

const getCurrencyCourseToPeriodAC = () => {
    return {type: 'GET_CURRENCY_COURSE_TO_PERIOD'}
};

const getCurrencies = () => (dispatch) => {

}


