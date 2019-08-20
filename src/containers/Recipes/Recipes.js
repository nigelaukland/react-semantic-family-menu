import React, { Component } from 'react';
import RecipeList from './../../components/RecipeList/RecipeList';
import RecipeViewModal from '../../components/RecipeViewModal/RecipeViewModal';
import RecipeAddModal from './../../components/RecipeAddModal/RecipeAddModal';
import { Container, List, Menu, Button } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

class Recipes extends Component {
  state = {
    recipes: [],
    recipeTarget: null,
    recipeViewModalIsVisible: false,
    recipeAddModalIsVisible: false,
    recipeAddModalLoading: false,
    recipeFormName: '',
    recipeFormDescription: '',
    recipeFormIngredients: '',
    recipeFormImage: null,
    recipeFormImagePreview: null
  };

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = () => {
    fetch(`${API_URL}/recipes`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ recipes: data });
      });
  };

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
    fetch(`${API_URL}/recipe/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `BEARER ${this.props.userToken}`
        }
      })
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

  handleAddRecipeClick = (e, { name }) =>
    this.setState({ recipeAddModalIsVisible: true });

  closeRecipeViewModal = () => {
    this.setState({
      recipeViewModalIsVisible: false
    });
  };

  closeRecipeAddModal = () => {
    this.setState({
      recipeAddModalIsVisible: false
    });
  };

  handleAddRecipeModalSubmit = (e, data) => {
    // deconstruct the state properties related to the form
    this.setState({ recipeAddModalLoading: true });
    const {
      recipeFormName,
      recipeFormDescription,
      recipeFormIngredients,
      recipeFormImage
    } = this.state;
    // build a FormData object for POSTing
    const recipeData = new FormData();
    recipeData.append('name', recipeFormName);
    recipeData.append('description', recipeFormDescription);
    recipeData.append('ingredients', recipeFormIngredients);
    recipeData.append('imagePath', recipeFormImage);
    // POST
    console.log(recipeData);
    fetch(`${API_URL}/recipe`, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${this.props.userToken}`
        },
      body: recipeData
      // headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          recipeAddModalLoading: false,
          recipeAddModalIsVisible: false,
          recipeFormImagePreview: null
        });
        this.getRecipes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  recipeFormImageChange = (e, data) => {
    this.setState({
      recipeFormImagePreview: URL.createObjectURL(e.target.files[0]),
      recipeFormImage: e.target.files[0]
    });
  };

  recipeFormDataChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        <Menu secondary>
          <Menu.Item>
            {this.props.isAuthenticated ? (
            <Button
              basic
              color="red"
              name="Add Recipe"
              onClick={this.handleAddRecipeClick}
            >
              Add Recipe
            </Button> 
            ) : (
            <Button
              basic
              disabled
              color="red"
              name="Login to edit recipes"
            >
              Login to edit recipes
            </Button>
            )}
          </Menu.Item>
        </Menu>
        <List selection animated relaxed celled>
          <RecipeList
            recipes={this.state.recipes}
            onClickDeleteRecipe={this.handleDeleteRecipe}
            onClickEditRecipe={this.handleEditRecipe}
            onClickViewRecipe={this.handleViewRecipe}
            isAuthenticated={this.props.isAuthenticated}
          />
        </List>
        {this.state.recipeViewModalIsVisible ? (
          <RecipeViewModal
            recipe={this.state.recipeTarget}
            closeRecipeViewModal={this.closeRecipeViewModal}
          />
        ) : null}
        {this.state.recipeAddModalIsVisible ? (
          <RecipeAddModal
            recipe={this.state.recipeTarget}
            closeRecipeAddModal={this.closeRecipeAddModal}
            onClickUploadImage={this.handleUploadImage}
            recipeFormDataChange={this.recipeFormDataChange}
            recipeFormImageChange={this.recipeFormImageChange}
            recipeFormImagePreview={this.state.recipeFormImagePreview}
            onRecipeAddModalSubmit={this.handleAddRecipeModalSubmit}
            recipeAddModalLoading={this.state.recipeAddModalLoading}
          />
        ) : null}
      </Container>
    );
  }
}

export default Recipes;
