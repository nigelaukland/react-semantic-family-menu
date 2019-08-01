import React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';

const menuBar = props => {
  return (
    <Menu color="red">
      <Menu.Item
        name="Home"
        active={props.menuActiveItem === 'Home'}
        onClick={props.menuItemClicked}
      />
      <Menu.Item
        name="Menus"
        active={props.menuActiveItem === 'Menus'}
        onClick={props.menuItemClicked}
      />
      <Menu.Item
        name="Recipes"
        active={props.menuActiveItem === 'Recipes'}
        onClick={props.menuItemClicked}
      />
      <Menu.Item
        name="Shopping List"
        active={props.menuActiveItem === 'Shopping List'}
        onClick={props.menuItemClicked}
      />
      <Menu.Menu position="right">
        {!props.isAuthenticated ? (
          <Menu.Item>
            <Button
              icon
              labelPosition="left"
              color="red"
              name="Login"
              onClick={props.loginClicked}
            >
              <Icon name="user" />
              Login / Signup
            </Button>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Button
              icon
              labelPosition="left"
              color="red"
              name="Logout"
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
