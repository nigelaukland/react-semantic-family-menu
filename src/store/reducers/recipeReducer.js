// actionTypes
import actionTypes from './../actions/actionTypes';

const initialState = {
  recipes: [],
  recipeViewModalIsVisible: false,
  recipeIdToView: ''
};

// define the reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload.recipes
      };
    case actionTypes.DELETE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes].filter((recipe) => {
          return recipe._id !== action.payload._id;
        })
      };
    case actionTypes.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes].concat(action.payload.recipeData)
      };
    case actionTypes.OPEN_RECIPE:
      return {
        ...state,
        recipeIdToView: action.payload.recipeIdToView,
        recipeViewModalIsVisible: true,
      };
    case actionTypes.CLOSE_RECIPE:
      return {
        ...state,
        recipeViewModalIsVisible: false
      };
    default:
      return state;
  }
};

export default reducer;
