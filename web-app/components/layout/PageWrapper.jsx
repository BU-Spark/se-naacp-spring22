import React, { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import AppContext from '../../data/context/AppContext';
import API from '../../services/api';
import authenticationservice from '../../services/authenticationservice';
import userService from '../../services/userService';

import Layout from './Layout';
import Metatags from './Metatags';

export default function PageWrapper(props) {
  const { updateUser, restoreToken, userToken, signOut, isAppLoading, updateLoading } = useContext(AppContext);

  async function restoreUserState() {
    const { token, isLoggedIn, user } = props;
    if (typeof isLoggedIn === 'boolean') {
      authenticationservice.setToken(token);
      restoreToken(token);
    }
    if (user) {
      updateUser(user);
    }
    try {
      const response = (await userService.getProfile({})).data;
      updateUser(response.user);
    } catch (error) {}
  }
  useEffect(() => {
    restoreUserState();
  }, [props.isLoggedIn]);

  useEffect(() => {
    API.interceptors.response.use(
      response => {
        return response;
      },
      function (error) {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !!userToken && !originalRequest._retry) {
          originalRequest._retry = true;
          console.log('====== token expired =====');
          return authenticationservice.refeshToken().then(res => {
            // console.log('refreshing token');
            const { data, status } = res;
            const { authToken } = data?.data;
            console.log({ authToken, data, status });
            if (status === 201) {
              // 1) put token to LocalStorage
              authenticationservice.setToken(authToken);
              restoreToken(authToken);

              // 3) return originalRequest object with Axios.
              return API.request(originalRequest);
            } else {
              signOut();
              authenticationservice.deleteToken();
            }
          });
        } else {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
      },
    );

    updateLoading(false);
  }, []);

  if (isAppLoading) return null;

  return (
    <>
      <ToastContainer />
      <Metatags />
      <Layout>{props.children}</Layout>
    </>
  );
}
