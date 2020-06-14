import React from 'react';
import { Input, Segment, Icon, Button, Divider } from 'semantic-ui-react'

function Feeder() {
  return (
    <Segment>
        <h2>Feed a him</h2>
        <Input
            action={{
                color: 'red',
                labelPosition: 'right',
                icon: 'eye',
                content: 'Feed',
            }}
            defaultValue=''
            className='feed'
            placeholder='Fatal1ty'
        />
    </Segment>
  );
}

export default Feeder;
