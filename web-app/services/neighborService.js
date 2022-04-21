import API from './api';
import errorHandler from '../helpers/errorHandler';

export default {
    getNeighbors({ query = undefined, limit = 10, page = 1 }) {
        let queryPromise;
        if (query) {
            queryPromise = API.get(`/v1/neighbors/me?q=${query}&limit=${limit}&page=${page}`);
        } else {
            queryPromise = API.get(`/v1/neighbors/me?limit=${limit}&page=${page}`);
        }
        return queryPromise
            .then(response => {
                return response.data;
            })
            .catch(errorHandler.handleAPIError);
    },
    getNeighbor(id) {
        console.log({ id });
        return API.get(`/v1/neighbors/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(errorHandler.handleAPIError);
    },
};
