import React from 'react';
import { Grid } from 'semantic-ui-react';

import RecipeCard from '../../Recipe/RecipeCard'


const dayMenu = (props) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <RecipeCard recipe={props.dayMenu.morningRecipeId} />
      </Grid.Column>
      <Grid.Column>
        <RecipeCard  recipe={props.dayMenu.lunchRecipeId} />
      </Grid.Column>
      <Grid.Column>
        <RecipeCard  recipe={props.dayMenu.dinnerRecipeId} />
      </Grid.Column>
      <Grid.Column>
        <RecipeCard  recipe={props.dayMenu.dinnerRecipeId} />
      </Grid.Column>
    </Grid.Row>
  );
};

export default dayMenu;