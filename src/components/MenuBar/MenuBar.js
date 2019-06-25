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
        <Menu.Item>
          <Button
            icon
            labelPosition="left"
            color="red"
            name="Login"
            active={props.menuActiveItem === 'Login'}
          >
            <Icon name="user" />
            Login
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default menuBar;
