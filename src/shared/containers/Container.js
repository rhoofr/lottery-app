import React from 'react';

function Container(props) {
  return (
    <div
      className={
        'container-fluid pt-md-5 pb-md-4 ' +
        (props.wide ? '' : 'container--narrow')
      }
    >
      {props.children}
    </div>
  );
}

export default Container;
