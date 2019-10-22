import actionTypes from './actionTypes';

const API_URL = 'http://localhost:50001';

export const userLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  localStorage.removeItem('expirationDate');
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

export const addRecipe = (recipeData) => {
  return {
    type: actionTypes.ADD_RECIPE,
    payload: { recipeData: recipeData }
  };
};

export const openRecipe = (recipeIdToView) => {
  console.log(recipeIdToView);
  return {
    type: actionTypes.OPEN_RECIPE,
    payload: { recipeIdToView: recipeIdToView }
  };
};

export const closeRecipe = () => {
  return {
    type: actionTypes.CLOSE_RECIPE
  };
};

// asynchronous actions, requiring action creators and thunk

export const initRecipes = () => {
  return (dispatch) => {
    fetch(`${API_URL}/recipes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setRecipes(data));
      });
  };
};

export const initDeleteRecipe = (userToken, _id) => {
  return (dispatch) => {
    fetch(`${API_URL}/recipe/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `BEARER ${userToken}`
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(deleteRecipe(_id));
      });
  };
};

export const initAddRecipe = (userToken, recipeData) => {
  return (dispatch) => {
    fetch(`${API_URL}/recipe`, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${userToken}`
      },
      body: recipeData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(`data.recipe: ${JSON.stringify(data.recipe)}`);
        console.log(`data: ${JSON.stringify(data)}`);
        dispatch(addRecipe(data.recipe));
      });
  };
};

export const initOpenRecipe = (recipeId) => {
  return (dispatch, getState) => {
    console.log(`Viewing recipe ${recipeId}`);
    // get the recipes form the redux state
    const { recipes } = getState();
    // grab the first (and hopefully only!) recipe from the array of recipes
    const recipeToView = recipes.find((recipe) => {
      return recipe._id === recipeId;
    });

    // update the state to display the recipe in the modal
    this.props.r_openRecipeViewModal(recipeToView);

  };
};
