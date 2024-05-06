import React from 'react';
import { NavLink } from 'react-router-dom';

export const Menu: React.FC = React.memo((): JSX.Element => {
  return (
    <div>
      <nav>
        <ul>
            <li><NavLink to={'/'}>Show</NavLink></li>
            <li><NavLink to={'addPosts'}>Form</NavLink></li>
           
        </ul>
      </nav>
    </div>
  );
});
