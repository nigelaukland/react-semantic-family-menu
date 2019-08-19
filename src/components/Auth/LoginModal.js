import React from 'react';
import { Modal, Form, Header } from 'semantic-ui-react';

const loginModal = props => {
  return (
    <Modal  size="tiny" open onClose={props.closeLoginModal}>
      <Header as="h2" color="red" textAlign="center">
        Log-in to your account
      </Header>
      <Modal.Content>
        <Form loading={props.loginModalLoading} size="large" onSubmit={props.onLoginModalSubmit}>
          <Form.Input
            name="loginFormEmail"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            onChange={props.loginFormDataChange}
            autoFocus
          />
          <Form.Input
            name="loginFormPassword"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={props.loginFormDataChange}
          />
          <Form.Button color="red" fluid size="large" type="submit">
            Login
          </Form.Button>
          <Form.Button
            basic
            color="red"
            fluid
            size="large"
            onClick={props.onLoginModalSignup}
            type="button"
          >
            New to us? Signup
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default loginModal;
