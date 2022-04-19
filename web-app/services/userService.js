import API from './api';
import errorHandler from '../helpers/errorHandler';

export default {
  getProfile({ includeKin = false }) {
    return API.get(`/v1/users/me${includeKin ? '?includeKin=true' : ''}`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        errorHandler.handleAPIError(err);
      });
  },
};
