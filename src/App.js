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

function ControlPanel() {
  return (
    <div className="controlPanel">
      <div className="switcher">
        <p>Power</p>
        <div className="select">
          <div className="inner"></div>
        </div>
      </div>
      <p className="display">
        
      </p>
      <div className="volumeSlider">
        <input type="range" step="0.01" min="0" max="1" />
      </div>
      <div className="switcher">
        <p>Bank</p>
        <div className="select">
          <div className="inner"></div>
        </div>
      </div>
    </div>
  )
}

function App() {

  return (
    <div id="drumMachine">
      <Pad />
      <ControlPanel />
    </div>
  );
}

export default App;
