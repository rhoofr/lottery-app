import React from 'react';
import { Link } from 'react-router-dom';
import { getYear } from '../../utils/date';

function Footer() {
  return (
    <footer className='text-center small text-muted py-3'>
      <p>
        <Link to='/' className='mx-1'>
          Results
        </Link>{' '}
        |{' '}
        <Link className='mx-1' to='/numbersplayed'>
          Numbers Played
        </Link>{' '}
        |{' '}
        <Link className='mx-1' to='/winningnumbers'>
          Winning Numbers
        </Link>{' '}
        |{' '}
        <Link className='mx-1' to='/newnumbers'>
          New Ticket
        </Link>{' '}
        |{' '}
        <Link className='mx-1' to='/upcoming'>
          Upcoming Jackpots
        </Link>{' '}
        |{' '}
        <Link className='mx-1' to='/checkresults'>
          Check Results
        </Link>
      </p>
      <p className='m-0'>
        Copyright &copy; {getYear()} HoofSoft Development. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
