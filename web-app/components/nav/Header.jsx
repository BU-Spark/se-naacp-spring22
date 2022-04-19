import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

import NavBar from './NavBar';

function Header(props) {
  Router.onRouteChangeStart = () => {
    NProgress.start();
  };

  Router.onRouteChangeComplete = () => {
    NProgress.done();
  };

  Router.onRouteChangeError = () => {
    NProgress.done();
  };

  return (
    <header className="w-full">
      <NavBar />
    </header>
  );
}
export default Header;
