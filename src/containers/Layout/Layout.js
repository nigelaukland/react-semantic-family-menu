// react and redux
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// action creators
import * as actions from './../../store/actions';

// components
import Aux from '../../hoc/Auxilliary';
import MenuBar from '../../components/MenuBar/MenuBar';
import Recipes from './../Recipes/Recipes';
import MenuHome from './../MenuHome/MenuHome';
import Menus from './../Menus/Menus';
import LoginModal from './../../components/Auth/LoginModal';
import SignupModal from './../../components/Auth/SignupModal';

// semantic components
import { Container } from 'semantic-ui-react';

const API_URL = 'http://localhost:50001';

class Layout extends Component {
  // local UI state
  state = {
    loginModalIsVisible: false,
    loginModalLoading: false,
    loginFormEmail: '',
    loginFormPassword: '',
    signupModalIsVisible: false,
    signupModalLoading: false,
    signupFormEmail: '',
    signupFormPassword: ''
  };

  // functions to manage local UI state

  loginFormDataChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleLoginClick = (e, { name }) =>
    this.setState({ loginModalIsVisible: true });

  handleLoginModalSignup = () => {
    this.setState({ loginModalIsVisible: false, signupModalIsVisible: true });
  };

  closeLoginModal = () => {
    this.setState({
      loginModalIsVisible: false
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

  // manage central state

  handleLoginModalSubmit = (e, data) => {
    console.log(data);
    this.setState({ loginModalLoading: true });
    e.preventDefault();
    // deconstruct the state properties related to the form
    const { loginFormEmail, loginFormPassword } = this.state;

    // build the request body
    let loginData = {};
    loginData.email = loginFormEmail;
    loginData.password = loginFormPassword;
    // POST
    fetch(`${API_URL}/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(loginData)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);

        // call the login action
        if (data.token !== null) {
          this.props.r_login(
            loginData.email,
            data.userId,
            data.token ? data.token : null
          );
        }

        // set local UI state
        this.setState({
          loginModalLoading: false,
          loginModalIsVisible: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSignupModalSubmit = (e, data) => {
    this.setState({ signupModalLoading: true });
    // deconstruct the state properties related to the form
    const { signupFormEmail, signupFormPassword } = this.state;

    // build the request body
    let userData = {};
    userData.email = signupFormEmail;
    userData.password = signupFormPassword;
    // POST
    fetch(`${API_URL}/signup`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(userData)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // set logged in status
        this.props.r_login(
          userData.email,
          data.userId,
          data.token ? data.token : null
        );
        this.setState({
          signupModalLoading: false,
          signupModalIsVisible: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Aux>
        <MenuBar loginClicked={this.handleLoginClick} />
        <Switch>
          <Route path="/home" exact component={MenuHome} />
          <Route path="/menus" exact component={Menus} />
          <Route path="/recipes" exact component={Recipes} />
          <Route
            path="/shopping-list"
            exact
            render={() => <Container>This is the shopping list</Container>}
          />
          <Route render={() => <Container>404 : Page not found!</Container>} />
        </Switch>

        {/* This conditionally shows the login Modal */}
        {this.state.loginModalIsVisible ? (
          <LoginModal
            closeLoginModal={this.closeLoginModal}
            loginFormDataChange={this.loginFormDataChange}
            onLoginModalSubmit={this.handleLoginModalSubmit}
            loginModalLoading={this.state.loginModalLoading}
            onLoginModalSignup={this.handleLoginModalSignup}
          />
        ) : null}

        {/* This conditionally shows the signup Modal */}
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

const mapStateToProps = state => {
  return {
    r_isAuthenticated: state.auth.isAuthenticated,
    r_userEmail: state.auth.userEmail,
    r_userId: state.auth.userId,
    r_userToken: state.auth.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    r_login: (userEmail, userId, userToken) => dispatch(actions.userLogin(userEmail, userId, userToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
