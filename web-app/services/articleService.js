import API from './api';
import errorHandler from '../helpers/errorHandler';

export default {
  getUserArticles({ query = undefined, limit = 10, page = 1 }) {
    let queryPromise;
    if (query) {
      queryPromise = API.get(`/v1/articles/me?q=${query}&limit=${limit}&page=${page}`);
    } else {
      queryPromise = API.get(`/v1/articles/me?limit=${limit}&page=${page}`);
    }
    return queryPromise
      .then(response => {
        return response.data;
      })
      .catch(errorHandler.handleAPIError);
  },
  createArticle(data) {
    return API.post('/v1/articles/', data)
      .then(response => {
        return response.data;
      })
      .catch(errorHandler.handleAPIError);
  },
  getArticle(id) {
    console.log({ id });
    return API.get(`/v1/articles/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(errorHandler.handleAPIError);
  },
  deleteArticle(articleId) {
    return API.delete(`/v1/articles/${articleId}`)
      .then(response => {
        return response.data;
      })
      .catch(errorHandler.handleAPIError);
  },
};
