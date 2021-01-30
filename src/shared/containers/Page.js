import React, { useEffect } from 'react';
import Container from './Container';

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Lottery App`;
    window.scrollTo(0, 0);
  }, [props.title]);

  return (
    <Container
      wide={props.wide}
      isEditing={props.isEditing}
      isDeleting={props.isDeleting}
    >
      {props.children}
    </Container>
  );
}

export default Page;
