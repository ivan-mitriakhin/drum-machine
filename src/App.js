import './App.css';
import React from 'react';
import { bankOne, bankTwo } from './banksConst.js';

function Button(props) {
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => { document.removeEventListener('keydown', handleKeyPress) };
  });

  const handleKeyPress = (event) => {
    if (event.keyCode === props.keyCode) {
      playSound();
    }
  }

  const playSound = () => {
    const sound = document.getElementById(props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    activateButton(sound);
    deactivateButton(sound);
    props.updateDisplay(props.clipId)
  }

  const activateButton = (sound) => {
    sound.parentElement.style.backgroundColor = 'blue';
  }

  const deactivateButton = (sound) => {
    setTimeout(() => { 
      sound.parentElement.style.backgroundColor = 'rgb(27, 26, 26)' 
    }, 100);
  }
  
  return (
    <div className="drumPad" id={props.clipId} onClick={playSound}>
      <audio className="clip" id={props.keyTrigger} src={props.clip}/>
      {props.keyTrigger}
    </div>
  );
}

function Pad(props) {
  let buttons;
  if (props.power) {
    buttons = props.currentPadBank.map((drumObj) => {
      return <Button
                clip={drumObj.src}
                clipId={drumObj.id}
                keyCode={drumObj.keyCode}
                keyTrigger={drumObj.keyTrigger}
                power={props.power}
                updateDisplay={props.updateDisplay}
              />
    });
  } else {
    buttons = props.currentPadBank.map((drumObj) => {
      return <Button
                clip='#'
                clipId={drumObj.id}
                keyCode={drumObj.keyCode}
                keyTrigger={drumObj.keyTrigger}
                power={props.power}
                updateDisplay={props.updateDisplay}
              />
    });
  }

  return (
    <div className="pad">
      {buttons}
    </div>
  );
}

function ControlPanel(props) {

  return (
    <div className="controlPanel">
      <div className="switcher">
        <p>Power</p>
        <div className="select" onClick={props.powerControl}>
          <div className="inner" style={props.powerSlider}></div>
        </div>
      </div>
      <p className="display">
        <span>{props.display}</span>
      </p>
      <div className="volumeSlider">
        <input type="range" step="0.01" min="0" max="1" onChange={props.adjustVolume} value={props.sliderVal}/>
      </div>
      <div className="switcher">
        <p>Bank</p>
        <div className="select" onClick={props.selectBank}>
          <div className="inner" style={props.bankSlider}></div>
        </div>
      </div>
    </div>
  )
}

function App() {
  let [power, setPower] = React.useState(true);
  let [display, setDisplay] = React.useState(String.fromCharCode(160));
  let [currentPadBank, setCurrentPadBank] = React.useState(bankOne);
  let [currentPadBankId, setCurrentPadBankId] = React.useState("Basement Kit");
  let [sliderVal, setSliderVal] = React.useState(0.3);

  const powerSlider = power ? { float: 'right' } : { float: 'left' };
  const bankSlider = currentPadBank === bankOne ? { float: 'left' } : { float: 'right' };
  const clips = [].slice.call(document.getElementsByClassName('clip'));
  clips.forEach(sound => {
    sound.volume = sliderVal;
  });

  const powerControl = () => {
    setPower(!power);
    setDisplay(String.fromCharCode(160));
  }
  
  const selectBank = () => {
    if (power) {
      if (currentPadBankId === "Basement Kit") {
        setCurrentPadBank(bankTwo);
        setCurrentPadBankId("Modern Kit");
        setDisplay("Modern Kit");
      } else {
        setCurrentPadBank(bankOne);
        setCurrentPadBankId("Basement Kit");
        setDisplay("Basement Kit");
      }
    }
  }

  const displayClipName = (name) => {
    if (power) {
      setDisplay(name);
    }
  }

  const adjustVolume = (event) => {
    if (power) {
      setSliderVal(event.target.value);
      setDisplay('Volume: ' + Math.round(event.target.value * 100));
      setTimeout(() => clearDisplay(), 1000);
    }
  }

  const clearDisplay = () => {
    setDisplay(String.fromCharCode(160));
  }

  return (
    <div id="drumMachine">
      <Pad 
        power={power}
        currentPadBank={currentPadBank}
        clipVolume={sliderVal}
        updateDisplay={displayClipName}
      />
      <ControlPanel 
        powerControl={powerControl} 
        powerSlider={powerSlider} 
        display={display} 
        adjustVolume={adjustVolume}
        sliderVal={sliderVal}
        selectBank={selectBank}
        bankSlider={bankSlider}
      />
    </div>
  );
}

export default App;
