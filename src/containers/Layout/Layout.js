// react and redux
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// action creators
import * as actions from '../../store/actions/actions';

// components
import Aux from '../../hoc/Auxilliary';
import MenuBar from '../../components/MenuBar/MenuBar';
import Recipes from './../Recipes/Recipes';
import MenuHome from './../MenuHome/MenuHome';
import Menus from './../Menus/Menus';
import LoginModal from './../../components/Auth/LoginModal';
import SignupModal from './../../components/Auth/SignupModal';
import RecipeViewModal from './../../components/RecipeViewModal/RecipeViewModal';
import RecipePickSidebar from './RecipePickSidebar/RecipePickSidebar';

// semantic components
import { Container, Sidebar } from 'semantic-ui-react';

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
    signupFormPassword: '',
    recipePickSidebarIsVisible: false
  };

  // functions to manage local UI state

  handleToggleRecipePicker = () => {
    this.setState({
      recipePickSidebarIsVisible: !this.state.recipePickSidebarIsVisible
    });
  };

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
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        // call the login action
        if (data.token) {
          this.props.r_login(
            loginData.email,
            data.userId,
            data.token ? data.token : null
          );
          // TODO display some more useful information here when login failed!
          // persist in local storage
          const expirationDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
          );
          localStorage.setItem('token', data.token);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('email', loginData.email);
        }

        // set local UI state
        this.setState({
          loginModalLoading: false,
          loginModalIsVisible: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSignupModalSubmit = (e, data) => {
    this.setState({ signupModalLoading: true });
    // deconstruct the state properties related to the form
    const { signupFormEmail, signupFormPassword } = this.state;

    // TODO:  call a central sinup method here

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
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // set logged in status
        this.props.r_login(
          userData.email,
          data.userId,
          data.token ? data.token : null
        );
        // persist in local storage
        const expirationDate = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('email', userData.email);

        this.setState({
          signupModalLoading: false,
          signupModalIsVisible: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount = () => {
    // check for persisted login details
    const token = localStorage.getItem('token');

    if (!token) {
      // logout
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        // logout
      } else {
        const token = localStorage.getItem('token');
        // const expirationDate = localStorage.getItem('expirationDate');
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');

        // store the peristed values in state
        this.props.r_login(email, userId, token);
      }
    }
  };

  render() {
    return (
      // <Sidebar.Pushable as={Segment}>
      <Aux>
        <Sidebar
          visible={this.state.recipePickSidebarIsVisible}
          animation="overlay"
          direction="right"
        >
          <RecipePickSidebar />
        </Sidebar>
        <Sidebar.Pusher>
          <Aux>
            <MenuBar
              loginClicked={this.handleLoginClick}
              onToggleRecipePicker={this.handleToggleRecipePicker}
            />
            {/* This conditionally shows the recipe picker sidebar */}
            {/* {this.state.recipePickSidebarIsVisible ? (
            <RecipePickSidebar
            visible={this.state.recipePickSidebarIsVisible}
            />
            ) : null} */}

            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" exact component={MenuHome} />
              <Route path="/menus" exact component={Menus} />
              <Route path="/recipes" exact component={Recipes} />
              <Route
                path="/shopping-list"
                exact
                render={() => <Container>This is the shopping list</Container>}
              />
              <Route
                render={() => <Container>404 : Page not found!</Container>}
              />
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

            {/* This conditionally shows the recipe Modal */}
            {this.props.r_recipeViewModalIsVisible ? (
              <RecipeViewModal
                recipeData={this.props.r_recipes[1]}
                closeRecipeViewModal={this.props.r_closeRecipeViewModal}
              />
            ) : null}
          </Aux>
        </Sidebar.Pusher>
      </Aux>
      // {/* </Sidebar.Pushable> */}
    );
  }
}

const mapStateToProps = (state) => {
  return {
    r_isAuthenticated: state.auth.isAuthenticated,
    r_userEmail: state.auth.userEmail,
    r_userId: state.auth.userId,
    r_userToken: state.auth.userToken,
    r_recipeViewModalIsVisible: state.recipes.recipeViewModalIsVisible,
    r_recipes: state.recipes.recipes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    r_login: (userEmail, userId, userToken) =>
      dispatch(actions.userLogin(userEmail, userId, userToken)),
    r_closeRecipeViewModal: () => dispatch(actions.closeRecipe())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
