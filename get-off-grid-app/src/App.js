import './App.css';
import React, { useState, useRef } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

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
    page: {
      flexDirection: 'column',
      padding: '20px',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    logo: {
      width: '100px',
    },
    title: {
      fontSize: '18px',
      marginBottom: '10px',
    },
    section: {
      marginBottom: '20px',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: '14px',
      width: '45%',
      fontWeight: "bold",
    },
    value: {
      fontSize: '14px',
      width: '45%',
    },
    dateTime: {
      fontSize: '12px',
      textAlign: 'right',
      marginBottom: '10px',
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

  const MyDocument = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            {/* Logo */}
            <Image style={styles.logo} src="/path/to/logo.png" />

            {/* Date and Time */}
            <Text style={styles.dateTime}>{currentDate} {currentTime}</Text>
          </View>

          {/* Invoice Title */}
          <Text style={styles.title}>Invoice</Text>

          {/* Client Details Section */}
          <View style={styles.section}>
            <Text style={styles.title}>Client Details</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Client Name:</Text>
              <Text style={styles.value}>{result.clientName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Number of Panels:</Text>
              <Text style={styles.value}>{result.numPanels}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Number of Strings:</Text>
              <Text style={styles.value}>{result.numStrings}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Orientation:</Text>
              <Text style={styles.value}>{result.orientation}</Text>
            </View>
          </View>

          {/* No. Components Section */}
          <View style={styles.section}>
            <Text style={styles.title}>No. Components</Text>

            <View style={styles.row}>
              <Text style={styles.label}>{rail} x Rails</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{endClamp} x End Clamps</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{centreClamp} x Centre Clamps</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{splice} x Splices</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{roofHook} x Roof Hooks</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{result.numPanels} x Panels</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

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
          <h3>Client Details</h3>
          <div style={styles.row}>
            <label style={styles.label}>Client Name: </label>
            <label style={styles.value}>{result.clientName}</label>
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Number of Panels:</label>
            <label style={styles.value}>{result.numPanels}</label>
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Number of Strings: </label>
            <label style={styles.value}>{result.numStrings}</label>
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Orientation: </label>
            <label style={styles.value}>{result.orientation}</label>
          </div>

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
