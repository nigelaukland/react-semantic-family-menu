// react and redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import MenuList from './../../components/MenuList/MenuList';

// semantic components
import { Container, List, Menu, Button } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

class Menus extends Component {
  state = {
    menus: []
  };

  componentDidMount() {
    this.getMenus();
  }

  getMenus = () => {
    fetch(`${API_URL}/menus`, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ menus: data });
      });
  };

  handleEditMenu = (e, _id) => {
    // stop the click event from also triggering the click event listener on the parent div
    e.stopPropagation();
    console.log(`Editing menu ${_id}`);
  };

  handleViewMenu = (e, _id) => {
    console.log(`Viewing menu ${_id}`);
    // grab the first (and hopefully only!) recipe from the array of recipes
    // const recipeToView = this.state.menus.find(menu => {
    //   return menu._id === _id;
    // });

    // update the state to display the recipe in the modal
    // this.setState({ recipeTarget: recipeToView });
    // this.setState({ recipeViewModalIsVisible: true });
  };

  handleDeleteMenu = (e, _id) => {
    // stop the click event from also triggering the click event listener on the parent div
    e.stopPropagation();
    console.log(`Deleting menu ${_id}`);
    fetch(`${API_URL}/menu/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `BEARER ${this.props.r_userToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // remove the menu from the state, using the spread operator to copy the original menus and then
        // filter to compare and subsequently filter the elements
        const nextMenus = [...this.state.menus].filter(menu => {
          return menu._id !== data.menu._id;
        });
        this.setState({ menus: nextMenus });
      });
  };

  // handleAddRecipeClick = (e, { name }) =>
  //   this.setState({ recipeAddModalIsVisible: true });

  render() {
    return (
      <Container>
        <Menu secondary>
          <Menu.Item>
            {this.props.r_isAuthenticated ? (
              <Button basic color="red" name="Add Menu">
                New Menu
              </Button>
            ) : (
              <Button basic disabled color="red" name="Login to edit menus">
                Login to edit menus
              </Button>
            )}
          </Menu.Item>
        </Menu>
        <List selection animated relaxed celled>
          <MenuList
            isAuthenticated={this.props.r_isAuthenticated}
            menus={this.state.menus}
            onClickDeleteMenu={this.handleDeleteMenu}
            onClickEditMenu={this.handleEditMenu}
            onClickViewMenu={this.handleViewMenu}
          />
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    r_isAuthenticated: state.auth.isAuthenticated,
    r_userToken: state.auth.userToken
  };
};

export default connect(mapStateToProps)(Menus);
