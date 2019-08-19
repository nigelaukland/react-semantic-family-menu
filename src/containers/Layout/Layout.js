import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import MenuBar from '../../components/MenuBar/MenuBar';
import Recipes from './../Recipes/Recipes';
import MenuHome from './../MenuHome/MenuHome';
import Menus from './../Menus/Menus';
import LoginModal from './../../components/Auth/LoginModal';
import SignupModal from './../../components/Auth/SignupModal';

import { Container } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

class Layout extends Component {
  state = {
    userEmail: '',
    userId: '',
    userToken: null,
    isAuthenticated: false,
    menuActiveItem: 'Home',
    loginModalIsVisible: false,
    loginModalLoading: false,
    loginFormEmail: '',
    loginFormPassword: '',
    signupModalIsVisible: false,
    signupModalLoading: false,
    signupFormEmail: '',
    signupFormPassword: ''
  };
  
  handleMenuItemClick = (e, { name }) =>
  this.setState({ menuActiveItem: name });
  
  handleLoginModalSubmit = (e, data) => {
    console.log(data);
    this.setState({ loginModalLoading: true });
    e.preventDefault();
    // deconstruct the state properties related to the form
    const {
      loginFormEmail,
      loginFormPassword
    } = this.state;

    // build the request body
    let loginData = {};
    loginData.email = loginFormEmail;
    loginData.password = loginFormPassword;
    // POST
    fetch(`${API_URL}/login`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(loginData),
        })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          userEmail: loginData.email,
          userId: data.userId,
          userToken: data.token ? data.token : null,
          loginModalLoading: false,
          loginModalIsVisible: false,
          isAuthenticated: data.token !== null
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  loginFormDataChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleLoginClick = (e, { name }) =>
    this.setState({ loginModalIsVisible: true });

  handleLogoutClick = (e, { name }) =>
    // Need to show some confirmation popup here...
    this.setState({ 
      isAuthenticated: false,
      userEmail: '',
      userId: '',
      userToken: null
     });

  handleLoginModalSignup = () => {
    this.setState({ loginModalIsVisible: false, signupModalIsVisible: true });
  };

  closeLoginModal = () => {
    this.setState({
      loginModalIsVisible: false
    });
  };

  handleSignupModalSubmit = (e, data) => {
    this.setState({ signupModalLoading: true });
    // deconstruct the state properties related to the form
    const {
      signupFormEmail,
      signupFormPassword
    } = this.state;

    // build the request body
    let userData = {};
    userData.email = signupFormEmail;
    userData.password = signupFormPassword;
    // POST
    fetch(`${API_URL}/signup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(userData),
        })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          userEmail: userData.email,
          userId: data.userId,
          userToken: data.token ? data.token : null,
          signupModalLoading: false,
          signupModalIsVisible: false,
          isAuthenticated: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  signupFormDataChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  closeSignupModal = () => {
    this.setState({
      signupModalIsVisible: false
    });
  };

  render() {
    return (
      <Aux>
        <MenuBar
          menuActiveItem={this.state.menuActiveItem}
          menuItemClicked={this.handleMenuItemClick}
          loginClicked={this.handleLoginClick}
          logoutClicked={this.handleLogoutClick}
          isAuthenticated={this.state.userToken !== null} 
          // isAuthenticated={this.state.userToken !== ''}
          userEmail={this.state.userEmail}
          // addRecipeClicked={this.handleAddRecipeClick}
        />
        {this.state.menuActiveItem === 'Home' ? <MenuHome /> : null}
        {this.state.menuActiveItem === 'Menus' ? (
          <Menus isAuthenticated={this.state.isAuthenticated} />
        ) : // <Container>This is the planner and list of available menus</Container>
        null}
        {this.state.menuActiveItem === 'Recipes' ? (
          <Recipes isAuthenticated={this.state.isAuthenticated} />
        ) : null}
        {this.state.menuActiveItem === 'Shopping List' ? (
          <Container>This is the shopping list</Container>
        ) : null}
        {this.state.loginModalIsVisible ? (
          <LoginModal
            closeLoginModal={this.closeLoginModal}
            loginFormDataChange={this.loginFormDataChange}
            onLoginModalSubmit={this.handleLoginModalSubmit}
            loginModalLoading={this.state.loginModalLoading}
            onLoginModalSignup={this.handleLoginModalSignup}
          />
        ) : null}
        {this.state.signupModalIsVisible ? (
          <SignupModal
            newUser={this.state.loginFormEmail}
            closeSignupModal={this.closeSignupModal}
            signupFormDataChange={this.signupFormDataChange}
            onSignupModalSubmit={this.handleSignupModalSubmit}
            signupModalLoading={this.state.signupModalLoading}
          />
        ) : null}
      </Aux>
    );
  }
}

export default Layout;
