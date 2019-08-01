import React from 'react';

import MenuListItem from './MenuListItem';
import Aux from '../../hoc/Auxilliary';

const menuList = props => {
  return (
    <Aux>
      {props.menus.map(menu => (
        <MenuListItem
          isAuthenticated={props.isAuthenticated}
          key={menu._id}
          name={menu.name}
          startDate={menu.startDate}
          onClickEditMenu={(e) => {
            props.onClickEditMenu(e, menu._id);
          }}
          onClickViewMenu={(e) => {
            props.onClickViewMenu(e, menu._id);
          }}
          onClickDeleteMenu={(e) =>
            props.onClickDeleteMenu(e, menu._id)
          }
        />
      ))}
    </Aux>
  );
};

export default menuList;
