import React from 'react';

import { Card, Image } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

const recipeCard = (props) => {
  return (
    <Card 
      link
      onClick={props.onClickRecipeCard} 
      >
    <Card.Content>
      <Image
        floated='left'
        size='tiny'
        bordered
        src={`${API_URL}${props.recipe.mediumImagePath}`}
      />
      <Card.Header>{props.recipe.name}</Card.Header>
      <Card.Meta>Two portions</Card.Meta>
      <Card.Description>{props.recipe.description}</Card.Description>
    </Card.Content>
  </Card>
  );
};

export default recipeCard;