import './App.css';
import React, { useState } from 'react';

function App() {
  const [clientName, setClientName] = useState('');
  const [numPanels, setNumPanels] = useState('');
  const [numStrings, setNumStrings] = useState('');
  const [orientation, setOrientation] = useState('Portrait');
  const [result, setResult] = useState(null);
  //Constant value 
  const ENDCLAMP = 4;


  const handleCalculate = () => {
    const inputData = {
      clientName,
      numPanels,
      numStrings,
      orientation,
    };
    setResult(inputData);

  };

  //function to calculate the number of center clamps
  const centerClampCal = () => {
    var numCenterClamp = 0;
    if (numPanels.isNan) {
      return numCenterClamp = numPanels * 2 - 2
    }
    return numCenterClamp;
  }

  const railsCal = () => {
    if (numPanels.isNan) {
      if (orientation.equal("Landscape")) {
        if (numPanels % 2 === 0) {
          return numPanels + 1;
        } else {
          return numPanels;
        }
      } else if (orientation.equal("Portrait")) {
        //Needs fixing 
        if (numPanels % 4 === 0) {
          return numPanels + 1;
        } else {
          return numPanels;
        }
      }
    }

    return 0;
  }

  const handleClear = () => {
    setClientName('');
    setNumPanels('');
    setNumStrings('');
    setOrientation('Portrait');
    setResult(null);
  };

  return (
    <div>
      <h1>Get-OFF-Grid Component Calculator</h1>
      <div>
        <label>
          Client Name:
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Number of Panels:
          <input
            type="text"
            value={numPanels}
            onChange={(e) => setNumPanels(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Number of Strings:
          <input
            type="text"
            value={numStrings}
            onChange={(e) => setNumStrings(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Orientation:
          <label>
            <input
              type="radio"
              value="Portrait"
              checked={orientation === 'Portrait'}
              onChange={() => setOrientation('Portrait')}
            />
            Portrait
          </label>
          <label>
            <input
              type="radio"
              value="Landscape"
              checked={orientation === 'Landscape'}
              onChange={() => setOrientation('Landscape')}
            />
            Landscape
          </label>
        </label>
      </div>
      <div>
        <button onClick={handleCalculate}>Calculate</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {result && (
        <div>
          <h3>Invoice</h3>
          <p>Client Name: {result.clientName}</p>
          <p>Number of Panels: {result.numPanels}</p>
          <p>Number of Strings: {result.numStrings}</p>
          <p>Orientation: {result.orientation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
