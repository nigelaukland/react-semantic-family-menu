import React from 'react';

import RecipeListItem from '../Recipe/RecipeListItem';
import Aux from '../../hoc/Auxilliary';

const recipeList = props => {
  return (
    <Aux>
      {props.recipes.map(recipe => (
        <RecipeListItem
          //  this is also where we should pass the methods
          pickMode={props.pickMode}
          key={recipe._id}
          name={recipe.name}
          description={recipe.description}
          tinyImagePath={recipe.tinyImagePath}
          onClickEditRecipe={(e) => {
            props.onClickEditRecipe(e, recipe._id);
          }}
          onClickViewRecipe={(e) => {
            props.onClickViewRecipe(e, recipe._id);
          }}
          onClickDeleteRecipe={(e) =>
            props.onClickDeleteRecipe(e, recipe._id)
          }
          isAuthenticated={props.isAuthenticated}
        />
      ))}
    </Aux>
  );
};

export default recipeList;
