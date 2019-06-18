import React, { Component } from 'react';
import RecipeList from './../../components/RecipeList/RecipeList';
import RecipeViewModal from './../../components/RecipeViewModel/RecipeViewModal';
import { Container, List } from 'semantic-ui-react';

class Recipes extends Component {
  state = {
    recipes: [],
    recipeTarget: null,
    recipeViewModalIsVisible: false
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

  handleEditRecipe = (e, _id) => {
    // stop the click event from also triggering the click event listener on the parent div
    e.stopPropagation();
    console.log(`Editing recipe ${_id}`);
  };

  handleViewRecipe = (e, _id) => {
    console.log(`Viewing recipe ${_id}`);
    // grab the first (and hopefully only!) recipe from the array of recipes
    const recipeToView = this.state.recipes.find(recipe => {
      return recipe._id === _id;
    });

    // update the state to display the recipe in the modal
    this.setState({ recipeTarget: recipeToView });
    this.setState({ recipeViewModalIsVisible: true });
  };

  handleDeleteRecipe = (e, _id) => {
    // stop the click event from also triggering the click event listener on the parent div
    e.stopPropagation();
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

  toggleRecipeViewModal = () => {
    this.setState({
      recipeViewModalIsVisible: !this.state.recipeViewModalIsVisible
    });
  };

  render() {
    return (
      <Container>
        <List selection animated relaxed celled>
          <RecipeList
            recipes={this.state.recipes}
            onClickDeleteRecipe={this.handleDeleteRecipe}
            onClickEditRecipe={this.handleEditRecipe}
            onClickViewRecipe={this.handleViewRecipe}
          />
        </List>
        {this.state.recipeViewModalIsVisible ? (
          <RecipeViewModal
            recipe={this.state.recipeTarget}
            toggleRecipeViewModal={this.toggleRecipeViewModal}
          />
        ) : null}
      </Container>
    );
  }
}

export default Recipes;
