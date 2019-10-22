// react and redux
import React, { Component } from 'react';
import { connect } from 'react-redux'

// components
import RecipeList from './../../../components/RecipeList/RecipeList'

// semantic components
import { Container, List } from 'semantic-ui-react';

class recipePickSidebar extends Component {
  state = {};

  render() {
    return (
      <Container>
        
        <List relaxed celled>
          <RecipeList
            pickMode
            recipes={this.props.r_recipes}
            // onClickDeleteRecipe={this.handleDeleteRecipe}
            // onClickEditRecipe={this.handleEditRecipe}
            // onClickViewRecipe={this.handleViewRecipe}
            // isAuthenticated={this.props.r_isAuthenticated}
          />
        </List>

      </Container>
  );
  }

};

const mapStateToProps = (state) => {
  return {
    r_recipes: state.recipes.recipes
  }
}

export default 
connect(
  mapStateToProps
)(recipePickSidebar);
