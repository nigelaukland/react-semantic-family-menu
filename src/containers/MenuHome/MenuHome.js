// react and redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Menu from './../../components/Menu/Menu';
import Aux from './../../hoc/Auxilliary';
import RecipeViewModal from './../../components/RecipeViewModal/RecipeViewModal';

// semantic components
import { Container, Divider, Dimmer, Loader, Button } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

class MenuHome extends Component {
  state = {
    currentMenu: {},
    menuLoading: true,
    addDayLoading: false,
    recipeViewModalIsVisible: false,
    recipeTarget: ''
  };

  componentWillMount() {
    this.getCurrentMenu();
  }

  getCurrentMenu = () => {
    fetch(`${API_URL}/menu/current`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ currentMenu: data, menuLoading: false });
      });
  };

  onClickAddDay = () => {
    this.setState({ addDayLoading: true });
    const newMenu = { ...this.state.currentMenu };
    newMenu.meals.push(this.state.currentMenu.meals[0]);
    console.log(newMenu);
    this.setState({ currentMenu: newMenu });
    this.setState({ addDayLoading: false });
  };

  closeRecipeViewModal = () => {
    this.setState({
      recipeViewModalIsVisible: false
    });
  };

  render() {
    return (
      <Container>
        {this.state.menuLoading ? (
          <Dimmer active inverted>
            <Loader inverted>Loading menu</Loader>
          </Dimmer>
        ) : (
          <Aux>
            <Menu currentMenu={this.state.currentMenu} />
            <Divider horizontal>Add one more day</Divider>
            {this.props.isAuthenticated ? (
              <Button
                loading={this.state.addDayLoading}
                onClick={this.onClickAddDay}
                size="large"
                color="red"
                basic
                fluid
              >
                Click here to add another day
              </Button>
            ) : (
              <Button
                loading={this.state.addDayLoading}
                onClick={this.onClickAddDay}
                disabled
                size="large"
                color="red"
                basic
                fluid
              >
                Login to edit current menu
              </Button>
            )}
          </Aux>
        )}
        {this.state.recipeViewModalIsVisible ? (
          <RecipeViewModal
            recipe={this.state.recipeTarget}
            closeRecipeViewModal={this.closeRecipeViewModal}
          />
        ) : null}
      </Container>
    );
  }
}

export default connect()(MenuHome);
