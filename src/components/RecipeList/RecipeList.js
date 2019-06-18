import React from 'react';

import Recipe from './Recipe/Recipe.js';
import Aux from '../../hoc/Auxilliary';

const recipeList = props => {
  return (
    <Aux>
      {props.recipes.map(recipe => (
        <Recipe
          //  this is also where we should pass the methods
          key={recipe._id}
          name={recipe.name}
          description={recipe.description}
          onClickEditRecipe={(e) => {
            props.onClickEditRecipe(e, recipe._id);
          }}
          onClickViewRecipe={(e) => {
            props.onClickViewRecipe(e, recipe._id);
          }}
          onClickDeleteRecipe={(e) =>
            props.onClickDeleteRecipe(e, recipe._id)
          }
        />
      ))}
    </Aux>
  );
};

export default recipeList;
