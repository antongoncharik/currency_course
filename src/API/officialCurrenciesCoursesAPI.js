import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.nbrb.by/api/exrates/'
});

export const getCurrenciesAPI = () => {
    return instance.get(`currencies`)
};
export const getCurrencyCourseAPI = (id) => {
    return instance.get(`rates/${id}`)
};
export const getCurrencyCourseToPeriodAPI = (id, startDate, endDate) => {
    return instance.get(`rates/Dynamics/${id}?startDate=${startDate}&endDate=${endDate}`)
};