import React from 'react';
import { Header, Image, Modal } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

const recipeViewModal = props => {
  return (
    <Modal open onClose={props.closeRecipeViewModal}>
      <Modal.Header>{props.recipe.name}</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src={`${API_URL}${props.recipe.mediumImagePath}`}
        />
        <Modal.Description>
          <Header>{props.recipe.description}</Header>
          <p>{props.recipe.ingredientsRaw}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default recipeViewModal;
