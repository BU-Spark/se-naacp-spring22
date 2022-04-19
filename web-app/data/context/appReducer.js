export const appActions = {
  UPDATE_USER: 'UPDATE_USER',
  START_LOADING: 'START_LOADING',
  END_LOADING: 'END_LOADING',
  SET_MENU_STATE: 'SET_MENU_STATE',
  SET_MODAL_STATE: 'SET_MODAL_STATE',
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const updateUser = (userDetails, prevState) => {
  const { user: currentUser } = prevState;
  return {
    ...prevState,
    user: {
      id: userDetails.id || currentUser.id,
      email: userDetails.email || currentUser.email,
      imageUrl: userDetails.imageUrl || currentUser.imageUrl,
      firstName: userDetails.firstName || currentUser.firstName,
      lastName: userDetails.lastName || currentUser.lastName,
      createdAt: userDetails.createdAt || currentUser.createdAt,
    },
  };
};

const appReducer = (prevState, action) => {
  switch (action.type) {
    case appActions.UPDATE_USER: {
      return updateUser(action.userDetails, prevState);
    }
    case appActions.RESTORE_TOKEN: {
      return {
        ...prevState,
        userToken: action.token,
        isSignedIn: true,
      };
    }
    case appActions.SIGN_IN: {
      return {
        ...prevState,
        isSignedIn: true,
        userToken: action.token,
      };
    }
    case appActions.SIGN_OUT: {
      return {
        ...prevState,
        isSignedIn: false,
        userToken: null,
      };
    }
    case appActions.START_LOADING: {
      return {
        ...prevState,
        isAppLoading: true,
      };
    }
    case appActions.END_LOADING: {
      return {
        ...prevState,
        isAppLoading: false,
      };
    }
    case appActions.SET_MODAL_STATE: {
      return {
        ...prevState,
        isModalOpen: action.modalState,
      };
    }
    default:
      return prevState;
  }
};

export default appReducer;
