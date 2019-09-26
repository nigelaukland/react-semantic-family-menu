// actionTypes
import actionTypes from './actionTypes'

const initialState = {
  isAuthenticated: false,
  userEmail: '',
  userId: '',
  userToken: null
}

// define the reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        userEmail: action.payload.userEmail,
        userId: action.payload.userId,
        userToken: action.payload.userToken
      }
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state;
    }
};

export default reducer;