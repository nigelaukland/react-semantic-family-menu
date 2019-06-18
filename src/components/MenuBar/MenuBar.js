import React from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';

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
      <Menu.Item>
        <Button 
          basic 
          color='red' 
          onClick={props.menuItemClicked}
          name="Add Recipe"
          active={props.menuActiveItem === 'Add Recipe'}
          >Add Recipe
          </Button>
        
        </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default menuBar;