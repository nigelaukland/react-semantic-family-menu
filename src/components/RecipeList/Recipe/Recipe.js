import React from 'react';
import { List, Image, Button } from 'semantic-ui-react';

const recipe = props => {
  return (
    <List.Item onClick={props.onClickViewRecipe}>
      <Image
        size="mini"
        src="https://www.theideaskitchen.co.uk/wp-content/uploads/2018/09/icon-vegetarian.png"
      />
      <List.Content>
        <List.Header>{props.name}</List.Header>
        <List.Description>{props.description}</List.Description>
      </List.Content>
      <List.Content floated="right">
        <Button basic onClick={props.onClickEditRecipe}>Edit</Button>
        <Button basic color='red' onClick={props.onClickDeleteRecipe}>Delete</Button>
      </List.Content>
    </List.Item>
  );
};

export default recipe;
