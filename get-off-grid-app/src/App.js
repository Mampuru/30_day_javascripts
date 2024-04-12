import './App.css';
import React, { useState } from 'react';

function App() {
  const [clientName, setClientName] = useState('');
  const [numPanels, setNumPanels] = useState('');
  const [numStrings, setNumStrings] = useState(1);
  const [orientation, setOrientation] = useState('Portrait');
  const [result, setResult] = useState(null);
  const [endClamp, setEndClamp] = useState(null);
  const [rail, setRails] = useState(null);
  
  const handleCalculate = () => {
    const inputData = {
      clientName,
      numPanels,
      numStrings,
      orientation,
    };
    setResult(inputData);
    const endClamps = calEndClamps(numStrings);
    setEndClamp(endClamps);
    const rails = calRails();
    setRails(rails)
  };

  //Function that calcualtes the number of end clamps
  const calEndClamps = (numStrings) => {
    return 4 * numStrings;
  }

  //Function to calculate the number of center clamps
  const calCenterClamps = () => {
    var numCenterClamp = 0;
    if (numPanels.isNan) {
      return numCenterClamp = numPanels * 2 - 2
    }
    return numCenterClamp;
  }

  //Function to calculate the number of rails
  const calRails = () => {
    if (numPanels !== 0) {
      if (orientation === "Landscape") {
        if (numPanels % 2 === 0) {
          return numPanels;
        } else {
          return parseInt(numPanels, 10) + 1;
        }
      } else if (orientation === "Portrait") {
        //NEED FIXING TUNE ME 
        if (numPanels % 4 === 0) {
          return numPanels;
        } else {
          return numPanels + 1;
        }
      }
    }
    return 0;
  }

  //Function to calculates number of roof hooks
  const calRoofHooks = (numRails) => {
    if (numRails !== 0 && numRails === 2) {
      return numRails * 5;
    } else if (numRails !== 0 && numRails > 2) {
      return numRails * 5 - 2; //NEED FIXING TUNE ME [only works for 1 String {Array of panel}]
    }
  }

  //Function that calculates the number of splices
  const calSplice = (numRails,numStrings) => {
    if (numRails !== 0 && numRails < 4) {
      return 0;
    } else if (numRails !== 0 && numRails > 2) {
      let x = Math.round(numRails / 4);
      return x * 2;   //NEED FIXING TUNE ME  [handle more then 1 string]
    }
  }

  const handleClear = () => {
    setClientName('');
    setNumPanels('');
    setNumStrings(1);
    setOrientation('Portrait');
    setResult(null);
    setEndClamp("");
    setRails("");
  };

  return (
    <div className="calculator-container">
      <div className="card input-card">
        <h1>Get-OFF-Grid Component Calculator</h1>
        <div className="input-group">
          <label>
            Client Name:
            <input
              className="textbox"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </label>
          <label>
            Number of Panels:
            <input
              className="textbox"
              type="text"
              value={numPanels}
              onChange={(e) => setNumPanels(e.target.value)}
            />
          </label>
          <label>
            Number of Strings:
            <input
              className="textbox"
              type="text"
              value={numStrings}
              onChange={(e) => setNumStrings(e.target.value)}
            />
          </label>
          <label>
            Orientation:
            <label>
              <input
                className="radioButton"
                type="radio"
                value="Portrait"
                checked={orientation === 'Portrait'}
                onChange={() => setOrientation('Portrait')}
              />
              Portrait
            </label>
            <label>
              <input
                className="radioButton"
                type="radio"
                value="Landscape"
                checked={orientation === 'Landscape'}
                onChange={() => setOrientation('Landscape')}
              />
              Landscape
            </label>
          </label>
        </div>
        <div className="button-group">
          <button onClick={handleCalculate}>Calculate</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
      {result && (
        <div className="card output-card">
          <h3>Invoice</h3>
          <p>Client Name: {result.clientName}</p>
          <p>Number of Panels: {result.numPanels}</p>
          <p>Number of Strings: {result.numStrings}</p>
          <p>Orientation: {result.orientation}</p>

          <h3>No. Components</h3>
          <p>{rail} x  Rails</p>
          <p>{endClamp} x  End Clamps</p>
          <p>{result.clientName} x  Center Clamps</p>
          <p>{result.clientName} x  Splices</p>
          <p>{result.clientName} x  Roof Hooks</p>
          <p>{result.numPanels} x  Panels</p>
        </div>
      )}
    </div>
  );
}

export default App;
