import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../shared/containers/Page';

function NotFound() {
  return (
    <Page title='Page not found'>
      <div className='text-center'>
        <h2>Page cannot be found.</h2>
        <p className='lead text-muted'>
          You can always visit the <Link to='/'>home page</Link> to get a fresh
          start.
        </p>
      </div>
    </Page>
  );
}

export default NotFound;
