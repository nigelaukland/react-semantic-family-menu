import React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const menuBar = props => {
  return (
    <Menu color="red">
      {/* Need the exact prop, to ensure that the exact path is used for active styling */}
      {/* Need the as={} to ensure that the right router component is rendered: https://react.semantic-ui.com/augmentation */}
      <Menu.Item name="Home" as={NavLink} exact to="/home" />
      <Menu.Item name="Menus" as={NavLink} exact to="/menus" />
      <Menu.Item name="Recipes" as={NavLink} exact to="/recipes" />
      <Menu.Item name="Shopping List" as={NavLink} exact to="/shopping-list" />
      <Menu.Menu position="right">
        {!props.isAuthenticated ? (
          <Menu.Item>
            <Button
              name="Login"
              icon
              labelPosition="left"
              color="red"
              onClick={props.loginClicked}
            >
              <Icon name="user" />
              Login / Signup
            </Button>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Button
              name="Logout"
              icon
              labelPosition="left"
              color="red"
              onClick={props.logoutClicked}
            >
              <Icon name="user" />
              Logout {props.userEmail}
            </Button>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default menuBar;
