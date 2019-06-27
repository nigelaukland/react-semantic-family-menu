import React from 'react';

import DayMenu from './DayMenu/DayMenu';

const Menu = props => {

  return (
  <DayMenu dayMenu={props.currentMenu.meals[0]} />
  );
};

export default Menu;
