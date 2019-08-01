import React, { Component } from 'react';
import { Container, Divider, Dimmer, Loader, Button } from 'semantic-ui-react';
import Menu from './../../components/Menu/Menu';
import Aux from './../../hoc/Auxilliary';

const API_URL = 'http://localhost:50001';

class MenuHome extends Component {
  state = {
    currentMenu: {},
    menuLoading: true,
    addDayLoading: false
  };

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

  onClickAddDay = () => {
    this.setState({ addDayLoading: true })
    const newMenu = { ...this.state.currentMenu };
    newMenu.meals.push(this.state.currentMenu.meals[0]);
    console.log(newMenu);
    this.setState({ currentMenu: newMenu });  
    this.setState({ addDayLoading: false });
  };

  render() {
    return (
      <Container>
        {this.state.menuLoading ? (
          <Dimmer active inverted>
            <Loader inverted>Loading menu</Loader>
          </Dimmer>
        ) : (
          <Aux>
            <Menu currentMenu={this.state.currentMenu} />
            <Divider horizontal>Add one more day</Divider>
            <Button loading={this.state.addDayLoading} onClick={this.onClickAddDay}  size='large' color='red' basic fluid>Click here to add another day</Button>
          </Aux>
        )}
      </Container>
    );
  }
}

export default MenuHome;
