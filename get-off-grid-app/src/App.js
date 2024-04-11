import './App.css';
import React, { useState } from 'react';

function App() {
  const [clientName, setClientName] = useState('');
  const [numPanels, setNumPanels] = useState('');
  const [numStrings, setNumStrings] = useState(1);
  const [orientation, setOrientation] = useState('Portrait');
  const [result, setResult] = useState(null);
  
  const handleCalculate = () => {
    const inputData = {
      clientName,
      numPanels,
      numStrings,
      orientation,
    };
    setResult(inputData);

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
    if (numPanels.isNan) {
      if (orientation.equal("Landscape")) {
        if (numPanels % 2 === 0) {
          return numPanels;
        } else {
          return numPanels + 1;
        }
      } else if (orientation.equal("Portrait")) {
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
      return numRails * 5 - 2; //NEED FIXING TUNE ME 
    }
  }

  //Function that calculates the number of splices
  const calSplice = (numRails,numStrings) => {
    if (numRails !== 0 && numRails < 4) {
      return 0;
    } else if (numRails !== 0 && numRails > 2) {
      return numRails * 5 - 2; 
    }
  }


  const handleClear = () => {
    setClientName('');
    setNumPanels('');
    setNumStrings(1);
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
