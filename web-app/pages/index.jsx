import React, { useContext } from 'react';

import Home from '../components/containers/Home';
import Landing from '../components/containers/Landing';
import AppContext from '../data/context/AppContext';

export default function Index() {
  const { isSignedIn, user } = useContext(AppContext);
  return <>{isSignedIn ? <Home /> : <Landing />}</>;
}
