import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

import Aux from '../../../hoc/Auxilliary';
import RecipeCard from '../../Recipe/RecipeCard';

const dayMenu = props => {
  return (
    <Aux>
      <Divider horizontal>{props.dayMenu.startDate}</Divider>
      <Grid columns="4">
        <Grid.Row>
          <Grid.Column>{props.dayMenu.startDate}</Grid.Column>
          <Grid.Column>
            {props.dayMenu.morningRecipeId ? (
              <RecipeCard recipe={props.dayMenu.morningRecipeId} />
            ) : null}
          </Grid.Column>
          <Grid.Column>
            {props.dayMenu.lunchRecipeId ? (
              <RecipeCard recipe={props.dayMenu.lunchRecipeId} />
            ) : null}
          </Grid.Column>
          <Grid.Column>
            {props.dayMenu.dinnerRecipeId ? (
              <RecipeCard 
                recipe={props.dayMenu.dinnerRecipeId}
                // onClickRecipeCard={props.onClickRecipeCard}
                 />
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Aux>
  );
};

export default dayMenu;
