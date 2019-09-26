// actionTypes
import actionTypes from './actionTypes';

const initialState = {
  recipes: []
};

// define the reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload.recipes
      }
    case actionTypes.DELETE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes].filter(recipe => {
          return recipe._id !== action.payload._id
      })
    };
    default:
      return state;
  }
};

export default reducer;
