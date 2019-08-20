import React from 'react';
import { List, Image, Button } from 'semantic-ui-react';

// const API_URL = 'http://localhost:50001';

const menuListItem = props => {
  return (
    <List.Item onClick={props.onClickViewMenu}>
      <Image
        size='mini'
        src='https://www.maxpixel.net/static/photo/2x/Dish-Restaurant-Eating-Kitchen-Eat-Dinner-Meal-1724294.png'
      />
      <List.Content>
        <List.Header>{props.name}</List.Header>
        <List.Description>{props.startDate}</List.Description>
      </List.Content>
      { props.isAuthenticated ? (
      <List.Content floated='right'>
        <Button basic onClick={props.onClickEditMenu}>Edit</Button>
        <Button basic color='red' onClick={props.onClickDeleteMenu}>Delete</Button>
      </List.Content>
      ) : null }
    </List.Item>
  );
};

export default menuListItem;
