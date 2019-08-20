import React from 'react';
import { List, Image, Button } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

const recipeListItem = props => {
  return (
    <List.Item onClick={props.onClickViewRecipe}>
      <Image size="mini" src={`${API_URL}${props.tinyImagePath}`} />
      <List.Content>
        <List.Header>{props.name}</List.Header>
        <List.Description>{props.description}</List.Description>
      </List.Content>
      {props.isAuthenticated ? (
        <List.Content floated="right">
          <Button basic onClick={props.onClickEditRecipe}>
            Edit
          </Button>
          <Button basic color="red" onClick={props.onClickDeleteRecipe}>
            Delete
          </Button>
        </List.Content>
      ) : null}
    </List.Item>
  );
};

export default recipeListItem;
