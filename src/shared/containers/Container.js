import React from 'react';
import './Container.css';

function Container(props) {
  return (
    <div
      className={
        'container-fluid mt-lg-3 mt-md-2 pt-md-5 pb-md-4 ' +
        (props.wide ? '' : 'container--narrow')
      }
      id={props.isEditing || props.isDeleting ? 'edit__container' : ''}
    >
      {props.children}
    </div>
  );
}

export default Container;
