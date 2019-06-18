import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import MenuBar from './../MenuBar/MenuBar';
import RecipeList from './../RecipeList/RecipeList';
import { Container, List } from 'semantic-ui-react';

class Layout extends Component {
  state = {
    menuActiveItem: 'Home',
    recipes: []
  };

  componentDidMount() {
    fetch('http://localhost:50001/recipes')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ recipes: data });
      });
  }

  handleMenuItemClick = (e, { name }) =>
    this.setState({ menuActiveItem: name });

  handleEditRecipe = recipeId => {
    console.log(`Editing recipe ${recipeId}`);
  };

  handleDeleteRecipe = (e, data, _id) => {
    console.log(`Deleting recipe ${_id}`);
    fetch(`http://localhost:50001/recipe/${_id}`, { method: 'DELETE' })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // remove the recipe from the state, using the spread operator to copy the original recipes and then
        // filter to compare and subsequently filter the elements
        const nextRecipes = [...this.state.recipes].filter(recipe => {
          return recipe._id !== data.recipe._id;
        });
        this.setState({ recipes: nextRecipes });
      });
  };

  render() {
    return (
      <Aux>
        <MenuBar
          menuActiveItem={this.state.menuActiveItem}
          menuItemClicked={this.handleMenuItemClick}
        />
        {this.state.menuActiveItem === 'Home' ? (
          <Container>This is the home menu page</Container>
        ) : null}
        {this.state.menuActiveItem === 'Menus' ? (
          <Container>This is the planner and list of available menus</Container>
        ) : null}
        {this.state.menuActiveItem === 'Recipes' ? (
          <Container>
            <List relaxed celled>
              <RecipeList
                recipes={this.state.recipes}
                onClickDeleteRecipe={this.handleDeleteRecipe}
                onClickEditRecipe={this.handleEditRecipe}
              />
            </List>
          </Container>
        ) : null}
        {this.state.menuActiveItem === 'Shopping List' ? (
          <Container>This is the shopping list</Container>
        ) : null}
      </Aux>
    );
  }
}

export default Layout;
