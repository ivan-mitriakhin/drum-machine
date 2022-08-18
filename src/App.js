import './App.css';
import React from 'react';

function Button(props) {
  
  return (
    <div className="drumPad">
      {props.keyTrigger}
    </div>
  );
}

function Pad() {
  return (
    <div className="pad">
      <Button keyTrigger='Q'/>
      <Button keyTrigger='W'/>
      <Button keyTrigger='E'/>
      <Button keyTrigger='A'/>
      <Button keyTrigger='S'/>
      <Button keyTrigger='D'/>
      <Button keyTrigger='Z'/>
      <Button keyTrigger='X'/>
      <Button keyTrigger='C'/>
    </div>
  );
}

function App() {

  return (
    <div id="drumMachine">
      <Pad />
    </div>
  );
}

export default App;
