import React, { useReducer } from 'react';

import AppContext from './AppContext';
import appReducer, { appActions } from './appReducer';

const initialState = {
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
  isAppLoading: true,
  isModalOpen: false,
};

function GlobalState(props) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, userToken, isSignedIn, isAppLoading, isModalOpen } = state;

  const appContext = React.useMemo(
    () => ({
      user,
      userToken,
      isSignedIn,
      isAppLoading,
      isModalOpen,
      signIn: token => {
        dispatch({ type: appActions.SIGN_IN, token });
      },
      signOut: () => dispatch({ type: appActions.SIGN_OUT }),
      signUp: token => {
        dispatch({ type: appActions.SIGN_IN, token });
      },
      restoreToken: token => {
        if (!token) return;
        dispatch({ type: appActions.RESTORE_TOKEN, token });
      },
      getUser: () => {
        dispatch({ type: appActions.GET_USER });
      },
      setModalState: modalState => {
        dispatch({ type: appActions.SET_MODAL_STATE, modalState });
      },
      updateUser: userDetails => {
        if (!userDetails) return;
        dispatch({ type: appActions.UPDATE_USER, userDetails });
      },
      updateLoading: loadingState => {
        // @ts-ignore
        dispatch({
          type: loadingState === true ? appActions.START_LOADING : appActions.END_LOADING,
          data: {
            loadingState,
          },
        });
      },
    }),
    [userToken, user, isSignedIn, isAppLoading, isModalOpen],
  );

  return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>;
}

export default GlobalState;
