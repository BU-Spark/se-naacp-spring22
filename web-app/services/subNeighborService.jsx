import API from './api';
import errorHandler from '../helpers/errorHandler';

export default {
    getSubNeighbors({ query = undefined, limit = 10, page = 1, nbid = "6261b09c0fe72b265b49627e" }) {
        let queryPromise;
        if (query) {
            queryPromise = API.get(`/v1/subneighbors/me?q=${query}&limit=${limit}&page=${page}&nbid=${nbid}`);
        } else {
            queryPromise = API.get(`/v1/subneighbors/me?limit=${limit}&page=${page}&nbid=${nbid}`);
        }
        return queryPromise
            .then(response => {
                return response.data;
            })
            .catch(errorHandler.handleAPIError);
    },
    getSubNeighbor(id) {
        console.log({ id });
        return API.get(`/v1/subneighbors/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(errorHandler.handleAPIError);
    },
};
