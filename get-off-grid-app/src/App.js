import './App.css';
import React, { useState, useRef } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

function App() {
  const [clientName, setClientName] = useState('');
  const [numPanels, setNumPanels] = useState('');
  const [numStrings, setNumStrings] = useState(1);
  const [orientation, setOrientation] = useState('Portrait');
  const [result, setResult] = useState(null);
  const [endClamp, setEndClamp] = useState(null);
  const [rail, setRails] = useState(null);
  const [centreClamp, setCentreClamps] = useState(null);
  const [roofHook, setRoofHooks] = useState(null);
  const [splice, setSplice] = useState(null);
  const outputCardRef = useRef(null);


  const styles = StyleSheet.create({
    card: {
      width: '45%',
      margin: '1%',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    downloadButton: {
      padding: '10px',
      cursor: 'pointer',
      backgroundColor: 'blue',
      color: 'yellow',
      border: 'none',
      borderRadius: '4px',
      marginTop: '20px',
    },
  });

  const handleCalculate = () => {
    const inputData = {
      clientName,
      numPanels,
      numStrings,
      orientation,
    };

    const endClamps = calEndClamps(numStrings);
    const rails = calRails();
    const centreClamps = calCenterClamps();
    const splices = calSplice(rails);
    const roofHooks = calRoofHooks(rails, splices);

    setResult(inputData);
    setEndClamp(endClamps);
    setRails(rails);
    setCentreClamps(centreClamps);
    setRoofHooks(roofHooks);
    setSplice(splices)
  };

  //Function that calcualtes the number of end clamps
  const calEndClamps = (numStrings) => {
    return 4 * numStrings;
  }

  //Function to calculate the number of center clamps
  const calCenterClamps = () => {
    var numCenterClamp = 0;
    if (numPanels !== 0) {
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
        if (numPanels % 4 === 0) {
          return numPanels / 2;
        } else if (numPanels % 4 === 2 || numPanels % 4 === 3) {
          let x = Math.round(numPanels / 4);
          return x * 2;
        } else if (numPanels % 4 === 1) {
          let y = Math.round(numPanels / 4 * 2);
          return y + 1;
        } else {

        }
      }
    }
    return 0;
  }

  //Function to calculates number of roof hooks
  const calRoofHooks = (numRails, numSpice) => {
    if (numRails !== 0 && numRails === 2) {
      return numRails * 5;
    } else if (numRails !== 0 && numRails > 2) {
      return numRails * 5 - numSpice;
    }
  }

  //Function that calculates the number of splices
  const calSplice = (numRails) => {
    if (numRails !== 0 && numRails < 4) {
      return 0;
    } else if (numRails !== 0 && numRails > 2) {
      let x = Math.round(numRails / 4);
      return x * 2;   //NEED FIXING TUNE ME  [handle more then 1 string]
    }
  }

  const MyDocument = () => (
    <Document>
      <Page size="A4">
        <View style={styles.card}>
          <Text>Invoice</Text>
          <Text>Client Name: {result.clientName}</Text>
          <Text>Number of Panels: {result.numPanels}</Text>
          <Text>Number of Strings: {result.numStrings}</Text>
          <Text>Orientation: {result.orientation}</Text>

          <Text>No. Components</Text>
          <Text>{rail} x  Rails</Text>
          <Text>{endClamp} x  End Clamps</Text>
          <Text>{centreClamp} x  Centre Clamps</Text>
          <Text>{splice} x  Splices</Text>
          <Text>{roofHook} x  Roof Hooks</Text>
          <Text>{result.numPanels} x  Panels</Text>

        </View>
      </Page>
    </Document>
  );

  const handleClear = () => {
    setClientName('');
    setNumPanels('');
    setNumStrings(1);
    setOrientation('Portrait');
    setResult(null);
    setEndClamp("");
    setRails("");
    setCentreClamps("");
    setRoofHooks("");
    setSplice("");
  };

  return (
    <div className="calculator-container">
      <div className="card input-card">
        <h1>GOG Component Calculator</h1>
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
              type="number"
              value={numPanels}
              onChange={(e) => setNumPanels(e.target.value)}
            />
          </label>
          <label>
            Number of Strings:
            <input
              className="textbox"
              type="number"
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
        <div className="card output-card" ref={outputCardRef}>
          <h3>Quote</h3>
          <p>Client Name: {result.clientName}</p>
          <p>Number of Panels: {result.numPanels}</p>
          <p>Number of Strings: {result.numStrings}</p>
          <p>Orientation: {result.orientation}</p>

          <h3>No. Components</h3>
          <p>{rail} x  Rails</p>
          <p>{endClamp} x  End Clamps</p>
          <p>{centreClamp} x  Centre Clamps</p>
          <p>{splice} x  Splices</p>
          <p>{roofHook} x  Roof Hooks</p>
          <p>{result.numPanels} x  Panels</p>

          <PDFDownloadLink document={<MyDocument />} fileName="output-card.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default App;
