// react and redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../../store/actions/actions';

// components
import Aux from '../../../hoc/Auxilliary';
import RecipeCard from '../../Recipe/RecipeCard';

// semantic components
import { Grid, Divider } from 'semantic-ui-react';

class DayMenu extends Component {
  render() {
    return (
      <Aux>
        <Divider horizontal>{this.props.dayMenu.startDate}</Divider>
        <Grid columns="4">
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              {this.props.dayMenu.morningRecipeId ? (
                <RecipeCard recipe={this.props.dayMenu.morningRecipeId} />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {this.props.dayMenu.lunchRecipeId ? (
                <RecipeCard recipe={this.props.dayMenu.lunchRecipeId} />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {this.props.dayMenu.dinnerRecipeId ? (
                <RecipeCard
                  recipe={this.props.dayMenu.dinnerRecipeId}
                  onClickRecipeCard={() => {
                    this.props.r_openRecipeViewModal(this.props.dayMenu.dinnerRecipeId._id)
                  }}
                />
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    r_openRecipeViewModal: (recipeToView) =>
      dispatch(actions.openRecipe(recipeToView))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DayMenu);
