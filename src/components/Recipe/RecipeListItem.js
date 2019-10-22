import React from 'react';
import { List, Image, Button } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

const recipePickItem = props => {
  return (
    <List.Item onClick={!props.pickMode ? props.onClickViewRecipe : null }>
      <Image size="mini" src={`${API_URL}${props.tinyImagePath}`} />
      <List.Content>
        <List.Header>{props.name}</List.Header>
        <List.Description>{props.description}</List.Description>
      </List.Content>
      {props.pickMode ? (
        <List.Content floated="right">
        <Button basic onClick={props.onClickViewRecipe}> 
        {/* // todo - need to add a handler */}
          View
        </Button>
        <Button basic>
          Add to menu
        </Button>
        </List.Content>
      ) : null}
      {props.isAuthenticated && !props.pickMode ? (
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

export default recipePickItem;
