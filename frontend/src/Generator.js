import React from 'react';
import { Input, Segment, Icon, Button, Divider } from 'semantic-ui-react'
import Name from './Name'

function Generator() {

  const [names, setNames] = React.useState([]);
  const [quality, setQuality] = React.useState(4);
  const [waiting, setWaiting] = React.useState(false);

  let generateNames = () => {
    setWaiting(true)
    fetch('http://localhost:3001/suggestions?quality=' + quality)
    .then(res => res.json())
    .then((res) => {
        setNames(res)
        setWaiting(false)
    }, (err) => {
        console.log("error", err)
        setWaiting(false)
    })
  }


  return (
    <Segment>
        <h2>Gernreatorz</h2>
        <Input label='Quality (1-10)' placeholder='Quailty--- enter here' defaultValue='4' onInput={e => setQuality(e.target.value)}/>
        {waiting ? (
            <Button icon labelPosition='right' color='teal' floated='right' loading>
                <Icon name='shop' />
                Generate
            </Button>
        ) : (
            <Button icon labelPosition='right' color='teal' floated='right' onClick={generateNames}>
                <Icon name='shop' />
                Generate
            </Button>
        ) }
        <Divider />
        {
            names.map((name, index) => {
                return (<Name name={name} key={index} />)
            })
        }
    </Segment>
  );
}

export default Generator;
