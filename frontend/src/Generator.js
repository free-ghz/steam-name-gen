import React from 'react';
import { Input, Segment, Icon, Button, Divider } from 'semantic-ui-react'
import Name from './Name'

let names = [
    { name: 'Fatal1ty', canon: true},
    { name: 'Olofmesa', canon: false},
    { name: 'Sonic Hedgefund Man', canon: false}
]

function Generator() {
  return (
    <Segment>
        <h2>Gernreatorz</h2>
        <Input label='Quality (1-10)' placeholder='Quailty--- enter here' value='4' />
        <Button icon labelPosition='right' color='teal' floated='right'>
            <Icon name='shop' />
            Generate
        </Button>
        <Divider />
        {
            names.map(name => {
                return (<Name name={name} />)
            })
        }
    </Segment>
  );
}

export default Generator;
