import React from 'react';
import { Modal, Form, Header } from 'semantic-ui-react';

const signupModal = props => {
  return (
    <Modal size="tiny" open onClose={props.closeSignupModal}>
      <Header as="h2" color="red" textAlign="center">
        Create a new account
      </Header>
      <Modal.Content>
        <Form
          encType="multipart/form-data"
          loading={props.signupModalLoading}
          size="large"
          onSubmit={props.onSignupModalSubmit}
        >
          <Form.Input
            name="signupFormEmail"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            onChange={props.signupFormDataChange}
          />
          <Form.Input
            name="signupFormPassword"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={props.signupFormDataChange}
          />
          <Form.Button 
            fluid 
            color="red" 
            size="large" 
            type="submit"
          >
            Signup
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default signupModal;
