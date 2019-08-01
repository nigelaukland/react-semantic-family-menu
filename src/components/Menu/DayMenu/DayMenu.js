import React from 'react';
import { Grid } from 'semantic-ui-react';

import RecipeCard from '../../Recipe/RecipeCard';

const dayMenu = props => {
  return (
    <Grid columns="4">
      <Grid.Row>
        <Grid.Column>
          {props.dayMenu.startDate}
        </Grid.Column>
        <Grid.Column>
          {props.dayMenu.morningRecipeId ? (
          <RecipeCard recipe={props.dayMenu.morningRecipeId} /> ) : null}
        </Grid.Column>
        <Grid.Column>
        {props.dayMenu.lunchRecipeId ? (
          <RecipeCard recipe={props.dayMenu.lunchRecipeId} /> ) : null}
        </Grid.Column>
        <Grid.Column>
        {props.dayMenu.dinnerRecipeId ? (
          <RecipeCard recipe={props.dayMenu.dinnerRecipeId} /> ) : null}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default dayMenu;
