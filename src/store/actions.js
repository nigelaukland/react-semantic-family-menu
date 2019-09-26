import actionTypes from './actionTypes';

const API_URL = 'http://localhost:50001';

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};

export const userLogin = (userEmail, userId, userToken) => {
  return {
    type: actionTypes.USER_LOGIN,
    payload: { userEmail: userEmail, userId: userId, userToken: userToken }
  };
};

export const setRecipes = (recipes) => {
  return {
    type: actionTypes.SET_RECIPES,
    payload: { recipes: recipes }
  };
};

export const deleteRecipe = (_id) => {
  return {
    type: actionTypes.DELETE_RECIPE,
    payload: { _id: _id }
  };
};

// asynchronous actions, requiring action creators and thunk
export const initRecipes = () => {
  return dispatch => {
    fetch(`${API_URL}/recipes`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(setRecipes(data));
      });
  };
};

export const initDeleteRecipe = (userToken, _id) => {
  return dispatch => {
    fetch(`${API_URL}/recipe/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `BEARER ${userToken}`
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(deleteRecipe(_id));
      });
  };
};