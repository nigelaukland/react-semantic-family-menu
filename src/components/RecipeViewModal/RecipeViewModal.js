import React from 'react';
import { Header, Image, Modal } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

const recipeViewModal = props => {
  return (
    <Modal open onClose={props.closeRecipeViewModal}>
      <Modal.Header>{props.recipeData.name}</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src={`${API_URL}${props.recipeData.mediumImagePath}`}
        />
        <Modal.Description>
          <Header>{props.recipeData.description}</Header>
          <p>{props.recipeData.ingredientsRaw}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default recipeViewModal;
