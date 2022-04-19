import API from './api';
import errorHandler from '../helpers/errorHandler';

let authToken = null;

export default {
  getLoggedInUser() {
    const user = localStorage.getItem('authUser');
    if (user) return JSON.parse(user);
    return null;
  },
  removeLoggedInUser() {
    localStorage.removeItem('authUser');
  },
  setLoggedInUser(user) {
    if (!user) return;
    localStorage.setItem('authUser', JSON.stringify(user));
  },
  getToken() {
    if (authToken) {
      return JSON.parse(authToken);
    }
    return null;
  },
  setToken(newAuthToken) {
    if (newAuthToken) {
      API.defaults.headers.common['authorization'] = `Bearer ${newAuthToken}`;
      authToken = newAuthToken;
    }
  },
  restoreToken() {
    const authToken = this.getToken();
    if (authToken) {
      API.defaults.headers.common['authorization'] = `Bearer ${authToken}`;
      return authToken;
    }
    return null;
  },
  deleteToken() {
    delete API.defaults.headers.common['authorization'];
    authToken = null;
  },
  logIn(credentials) {
    return API.post('/v1/auth/login', credentials)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        errorHandler.handleAPIError(err);
      });
  },
  signUp(credentials) {
    return API.post('/v1/auth/signup', credentials)
      .then(response => {
        return response.data;
      })
      .catch(errorHandler.handleAPIError);
  },
  logOut() {
    this.deleteToken();
    return API.post('/v1/auth/logout')
      .then(response => {
        return response.data;
      })
      .catch(errorHandler.handleAPIError);
  },
  refeshToken(config) {
    return API.post('/v1/auth/refresh-token', {}, config);
  },
};
