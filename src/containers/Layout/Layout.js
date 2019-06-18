import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import MenuBar from '../../components/MenuBar/MenuBar';
import Recipes from './../Recipes/Recipes';
import { Container } from 'semantic-ui-react';

class Layout extends Component {
  state = {
    menuActiveItem: 'Recipes'
  };

  handleMenuItemClick = (e, { name }) =>
    this.setState({ menuActiveItem: name });

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
            <Recipes />
        ) : null}
        {this.state.menuActiveItem === 'Shopping List' ? (
          <Container>This is the shopping list</Container>
        ) : null}
      </Aux>
    );
  }
}

export default Layout;
