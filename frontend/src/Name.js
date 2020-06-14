import React from 'react';
import { Icon, Segment } from 'semantic-ui-react'

function Name(props) {

  let icon = props.name.canon ? 'recycle' : 'thumbs up';
  let color = props.name.canon ? 'red' : 'teal';

  return (
    <Segment>
        <Icon name={ icon } color={ color } />
        { props.name.name }
    </Segment>
  );
}

export default Name;
