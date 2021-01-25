import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          RESULTS
        </NavLink>
      </li>

      <li>
        <NavLink to={'/numbersplayed'}>NUMBERS PLAYED</NavLink>
      </li>
      <li>
        <NavLink to={'/winningnumbers'}>WINNING NUMBERS</NavLink>
      </li>
      <li>
        <NavLink to={'/newnumbers'}>NEW NUMBERS</NavLink>
      </li>
      <li>
        <NavLink to={'/upcoming'}>UPCOMING JACKPOTS</NavLink>
      </li>
      <li>
        <NavLink to={'/checkresults'}>CHECK RESULTS</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
