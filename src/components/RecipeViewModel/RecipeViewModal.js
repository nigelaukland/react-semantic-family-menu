import React from 'react';
import { Header, Image, Modal } from 'semantic-ui-react';

const recipeViewModal = props => {
  return (
    <Modal open onClose={props.closeRecipeViewModal}>
      <Modal.Header>{props.recipe.name}</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
        />
        <Modal.Description>
          <Header>{props.recipe.description}</Header>
          <p>{props.recipe.ingredientsRaw}</p>
          <p></p>
          <p>{props.recipe._id}</p>
          <p>{props.recipe.mediumImagePath}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default recipeViewModal;
