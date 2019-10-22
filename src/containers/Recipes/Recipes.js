// react and redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

// components
import RecipeList from './../../components/RecipeList/RecipeList';
// import RecipeViewModal from '../../components/RecipeViewModal/RecipeViewModal';
import RecipeAddModal from './../../components/RecipeAddModal/RecipeAddModal';

// semantic components
import { Container, List, Menu, Button } from 'semantic-ui-react';

class Recipes extends Component {
  // local UI state
  state = {
    recipeTarget: null,
    // recipeViewModalIsVisible: false,
    recipeAddModalIsVisible: false,
    recipeAddModalLoading: false,
    recipeFormName: '',
    recipeFormDescription: '',
    recipeFormIngredients: '',
    recipeFormImage: null,
    recipeFormImagePreview: null
  };

  componentDidMount() {
    this.props.r_initRecipes();
  }

  // componentDidUpdate() {
  //   const recipeDataToView = this.props.r_recipes.find((recipe) => {
  //     return recipe._id === this.props.r_recipeIdToView;
  //   });

  //   this.setState({ recipeTarget: recipeDataToView });
  // }

  handleEditRecipe = (e, _id) => {
    // stop the click event from also triggering the click event listener on the parent div
    e.stopPropagation();
    console.log(`Editing recipe ${_id}`);
  };

  handleViewRecipe = (e, _id) => {
    console.log(`Viewing recipe ${_id}`);
    // // grab the first (and hopefully only!) recipe from the array of recipes
    // const recipeIdToView = this.props.r_recipes.find((recipe) => {
    //   return recipe._id === _id;
    // });

    // update the state to display the recipe in the modal
    this.props.r_openRecipeViewModal(_id);
    // this.setState({ r_recipeViewModalIsVisible: true });
  };

  handleDeleteRecipe = (e, _id) => {
    // stop the click event from also triggering the click event listener on the parent div
    e.stopPropagation();
    console.log(`Deleting recipe ${_id}`);
    this.props.r_initDeleteRecipe(this.props.r_userToken, _id);
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
    console.log(this.props.r_userToken);
    // initAddRecipe here
    this.props.r_initAddRecipe(this.props.r_userToken, recipeData);
    this.setState({
      recipeAddModalLoading: false,
      recipeAddModalIsVisible: false,
      recipeFormImagePreview: null
    });
    // TODO: should probably show a success / error message here
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
            {this.props.r_isAuthenticated ? (
              <Button
                basic
                color="red"
                name="Add Recipe"
                onClick={this.handleAddRecipeClick}
              >
                Add Recipe
              </Button>
            ) : (
              <Button basic disabled color="red" name="Login to edit recipes">
                Login to edit recipes
              </Button>
            )}
          </Menu.Item>
        </Menu>
        <List selection animated relaxed celled>
          <RecipeList
            recipes={this.props.r_recipes}
            onClickDeleteRecipe={this.handleDeleteRecipe}
            onClickEditRecipe={this.handleEditRecipe}
            onClickViewRecipe={this.handleViewRecipe}
            isAuthenticated={this.props.r_isAuthenticated}
          />
        </List>
        {/* {this.props.r_recipeViewModalIsVisible ? (
          <RecipeViewModal
            recipe={this.state.recipeTarget}
            closeRecipeViewModal={this.props.r_closeRecipeViewModal}
          />
        ) : null} */}
        {this.state.recipeAddModalIsVisible ? (
          <RecipeAddModal
            recipe={this.state.recipeTarget} // TODO
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

const mapStateToProps = (state) => {
  return {
    r_recipes: state.recipes.recipes,
    // r_recipeViewModalIsVisible: state.recipes.recipeViewModalIsVisible,
    r_recipeIdToView: state.recipes.recipeIdToView,
    r_userToken: state.auth.userToken,
    r_isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    r_initRecipes: () => dispatch(actions.initRecipes()),
    r_initDeleteRecipe: (userToken, _id) =>
      dispatch(actions.initDeleteRecipe(userToken, _id)),
    r_initAddRecipe: (userToken, recipeData) =>
      dispatch(actions.initAddRecipe(userToken, recipeData)),
    r_openRecipeViewModal: (recipeIdToView) =>
      dispatch(actions.openRecipe(recipeIdToView)),
    // r_closeRecipeViewModal: () => dispatch(actions.closeRecipe())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
