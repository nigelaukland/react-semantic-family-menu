import React from 'react';
import { Divider } from 'semantic-ui-react';
import DayMenu from './DayMenu/DayMenu';
import Aux from './../../hoc/Auxilliary';

const Menu = props => {
  return (
      props.currentMenu.meals.map((meal, index) => (
        <Aux key={index}>
        <Divider horizontal>{props.currentMenu.startDate}</Divider>
        <DayMenu dayMenu={meal} />
        </Aux>
      ))
  );
};

export default Menu;
