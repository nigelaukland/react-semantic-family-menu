import React from 'react';
import DayMenu from './DayMenu/DayMenu';
import Aux from './../../hoc/Auxilliary';

const Menu = props => {
  return (
      props.currentMenu.meals.map((meal, index) => (
        <Aux key={index}>
        <DayMenu dayMenu={meal} />
        </Aux>
      ))
  );
};

export default Menu;