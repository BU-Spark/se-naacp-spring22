import App from 'next/app';
import jwt from 'jsonwebtoken';
import 'react-toastify/dist/ReactToastify.css';

import PageWrapper from '../components/layout/PageWrapper';
import '../styles/globals.css';

import configuration from '../config';
import GlobalState from '../data/context/GlobalState';
import authenticationservice from '../services/authenticationservice';

function Main({ Component, pageProps, props }) {
  return (
    <GlobalState>
      <PageWrapper {...props}>
        <Component {...pageProps} />
      </PageWrapper>
    </GlobalState>
  );
}

Main.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  const cookie = appContext.ctx.req?.headers?.cookie;
  // Only run on the server
  if (typeof window === 'undefined') {
    try {
      const response = await authenticationservice.refeshToken({ headers: { origin: configuration.appURL, cookie } });
      const { data, status } = response;
      const { authToken } = data?.data;
      if (status === 201) {
        const decoded = jwt.decode(authToken);
        const user = {
          id: decoded.sub,
          email: decoded.email,
        };
        return { ...appProps, props: { isLoggedIn: true, token: authToken, user } };
      }
      return { ...appProps, props: { isLoggedIn: false, token: undefined, user: undefined } };
    } catch (error) {
      if (error.response?.status === 401) {
        return { ...appProps, props: { user: null, isLoggedIn: false } };
      }
      return { ...appProps, props: {} };
    }
  }

  return { ...appProps };
};

export default Main;
