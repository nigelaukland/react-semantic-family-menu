import React, { Component } from 'react';
import { Container, Divider, Grid, Dimmer, Loader } from 'semantic-ui-react';
import Menu from './../../components/Menu/Menu';
import Aux from './../../hoc/Auxilliary';

const API_URL = 'http://localhost:50001';

class MenuHome extends Component {

  state = {
    currentMenu: {},
    menuLoading: true
  }

  componentWillMount() {
    this.getCurrentMenu();
  }

  getCurrentMenu = () => {
    fetch(`${API_URL}/menu/current`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({ currentMenu: data, menuLoading: false });
    });
  };

  render() {
    return (
      <Container>
        { this.state.menuLoading ? (
         <Dimmer active inverted>
          <Loader inverted>Loading menu</Loader>
        </Dimmer>
        ) : (
        <Aux>
          <Divider horizontal>{this.state.currentMenu.startDate}</Divider>
          <Grid columns='4'>
            <Menu 
            currentMenu={this.state.currentMenu}
            />
          </Grid>
          </Aux> 
        )}
      </Container>
    );
  }
}

export default MenuHome;
