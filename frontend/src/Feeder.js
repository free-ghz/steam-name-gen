import React from 'react';
import { Input, Segment, Label } from 'semantic-ui-react'

function Feeder() {
  const [input, setInput] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [waiting, setWaiting] = React.useState(false)
  const [label, setLabel] = React.useState('')

  const feedTheGenerator = () => {
      setWaiting(true)
      fetch('http://localhost:3001/sources?password=' + password, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input})
      }).then((response) => {
        console.log(response)
        if (response.status !== 200) {
            setLabel('Didnt like ' + input + '...')
        } else {
            setLabel('Thanks for ' + input + '!')
        }
        setInput('')
        setWaiting(false)
      })
  }

  return (
    <Segment>
        <h2>Feed a him</h2>
        <Input placeholder='Fatal1ty' className='feed' onInput={e => setInput(e.target.value)} value={input}/>
        <Input
            action={{
                color: 'red',
                labelPosition: 'right',
                icon: 'eye',
                content: 'Feed',
                onClick: () => feedTheGenerator(),
                loading: waiting
            }}
            defaultValue=''
            placeholder='passowrd'
            onInput={e => setPassword(e.target.value)}
        />
        { label === '' ? '' : (
            <Label pointing='left'>{ label }</Label>
            )
        }
    </Segment>
  );
}

export default Feeder;
