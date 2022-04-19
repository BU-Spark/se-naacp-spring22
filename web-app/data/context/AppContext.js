import React from 'react';

const AppContext = React.createContext({
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    imageUrl: '',
    createdAt: 0,
  },
  isSignedIn: false,
  userToken: null,
  isModalOpen: false,
  isAppLoading: true,
  setModalState: menuState => {},
  signOut: token => {},
  signIn: token => {},
  restoreToken: token => {},
  updateLoading: (loadingState, message = null) => {},
  updateError: (errorMessage, onRetry = null) => {},
  updateUser: userDetails => {},
  getUser: () => {},
});
export default AppContext;
