import React from 'react';
import {
  Button,
  Modal,
  Form,
  Image,
  TextArea,
  ModalContent
} from 'semantic-ui-react';

const recipeAddModal = props => {
  return (
    <Modal size='large' open onClose={props.closeRecipeAddModal}>
      <Modal.Header>Add Recipe</Modal.Header>
      <ModalContent>
        <Form encType='multipart/form-data' onSubmit={props.onRecipeAddModalSubmit}>
          <Form.Input
            name='recipeFormName'
            fluid
            label='Recipe name'
            placeholder='Short and snappy'
            onChange={props.recipeFormDataChange}
          />
          <Form.Input
            name='recipeFormDescription'
            fluid
            label='Recipe description'
            placeholder='A tasty description'
            onChange={props.recipeFormDataChange}
          />
          <Form.Field
            control={TextArea}
            name='recipeFormIngredients'  
            label='Ingredients'
            placeholder='e.g. 500g of tasty goodness'
            onChange={props.recipeFormDataChange}
          />
          <Form.Input
            name='recipeFormImage'
            type='file'
            fluid
            label='Recipe image'
            placeholder='Select image...'
            onChange={props.recipeFormImageChange}
          />
          <Button floated='right' color='red' type='submit'>
            Submit
          </Button>
          <Button
            onClick={props.closeRecipeAddModal}
            floated='right'
            basic
            color='red'
            type='button'
          >
            Cancel
          </Button>
        </Form>
      </ModalContent>
      <ModalContent image>
        <Image
          floated='left'
          wrapped
          size='small'
          src={props.recipeFormImage}
          // src='https://react.semantic-ui.com/images/wireframe/image.png'
        />
      </ModalContent>
    </Modal>
  );
};

export default recipeAddModal;
