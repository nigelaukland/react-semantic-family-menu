// actionTypes
import actionTypes from './../actions/actionTypes';

import { updateObject } from '../../shared/utilities';

const initialState = {
  isAuthenticated: false,
  userEmail: '',
  userId: '',
  userToken: null
}

// login user
// TODO: Dispatch an expiration date check action thing.
const authLogin = (state, action) => {
  return updateObject(state, {
    ...state,
    isAuthenticated: true,
    userEmail: action.payload.userEmail,
    userId: action.payload.userId,
    userToken: action.payload.userToken
  });
};

// logout user
const authLogout = (state, action) => {
  return updateObject(state, { isAuthenticated: false, userEmail: '', userId: '', userToken: null });
};

// define the reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return authLogin(state, action);
    case actionTypes.USER_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
