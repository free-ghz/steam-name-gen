import React from 'react';
import { Segment } from 'semantic-ui-react'

import Generator from './Generator'
import Feeder from './Feeder'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <Segment><h1>CSGO Name Generator III</h1></Segment>
      <Generator></Generator>
      <Feeder></Feeder>
    </div>
  );
}

export default App;
