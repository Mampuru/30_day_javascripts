import './App.css';
import React, { useState } from 'react';

function App() {
  const [clientName, setClientName] = useState('');
  const [numPanels, setNumPanels] = useState('');
  const [numStrings, setNumStrings] = useState('');
  const [orientation, setOrientation] = useState('portrait');
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



  const handleClear = () => {
    setClientName('');
    setNumPanels('');
    setNumStrings('');
    setOrientation('portrait');
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
              value="portrait"
              checked={orientation === 'portrait'}
              onChange={() => setOrientation('portrait')}
            />
            Portrait
          </label>
          <label>
            <input
              type="radio"
              value="landscape"
              checked={orientation === 'landscape'}
              onChange={() => setOrientation('landscape')}
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
