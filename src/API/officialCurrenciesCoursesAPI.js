import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.nbrb.by/api/exrates/'
});

export const getCurrenciesAPI = () => {
    return instance.get(`currencies`)
};

export const getCurrencyCourseAPI = (id) => {
    return instance.get(`rates/${id}`)
};

