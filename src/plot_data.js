import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './plot_data.css'

const PlotPage = () => {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [column1, setColumn1] = useState('');
  const [column2, setColumn2] = useState('');
  const [plotData, setPlotData] = useState([]);
  const [columnName, setColumnName] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/dataset/')
      .then((response) => {
        setDatasets(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching datasets:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleCompute = () => {
    if (!selectedDataset || !columnName || !operation) {
      alert('Dataset, column name, and operation are required.');
      return;
    }

    axios
      .post(`http://127.0.0.1:8000/dataset/${selectedDataset}/compute/`, {
        column_name: columnName,
        operation: operation,
      })
      .then((response) => {
        setResult(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Failed to compute. Please try again.');
      });
  };

  const handlePlotGeneration = () => {
    if (!selectedDataset || !column1 || !column2) {
      alert('Dataset, column1, and column2 are required.');
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/dataset/${selectedDataset}/plot/?column1=${column1}&column2=${column2}`)
      .then((response) => {
        setPlotData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

return (
  <div className="plot-page">
    <div className="input">
      <select value={selectedDataset} onChange={(e) => setSelectedDataset(e.target.value)}>
        <option value="">Select dataset</option>
        {isLoading ? (
          <option value="" disabled>
            Loading datasets...
          </option>
        ) : error ? (
          <option value="" disabled>
            Failed to load datasets
          </option>
        ) : (
          datasets.map((dataset) => (
            <option key={dataset.name} value={dataset.name}>
              {dataset.name}
            </option>
          ))
        )}
      </select>
      <input
        type="text"
        placeholder="Enter column name"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
      />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="">Select operation</option>
        <option value="min">Min</option>
        <option value="max">Max</option>
        <option value="sum">Sum</option>
      </select>
      <button onClick={handleCompute}>Compute</button>
      <div className='result'><input
          type="text"
          placeholder="Result"
          value={result !== null ? result : ''}
          readOnly
        /></div>
    </div>
    <div className="input-fields">
    <select value={selectedDataset} onChange={(e) => setSelectedDataset(e.target.value)}>
        <option value="">Select dataset</option>
        {isLoading ? (
          <option value="" disabled>
            Loading datasets...
          </option>
        ) : error ? (
          <option value="" disabled>
            Failed to load datasets
          </option>
        ) : (
          datasets.map((dataset) => (
            <option key={dataset.name} value={dataset.name}>
              {dataset.name}
            </option>
          ))
        )}
      </select>
      <input
        type="text"
        placeholder="Enter column 1"
        value={column1}
        onChange={(e) => setColumn1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter column 2"
        value={column2}
        onChange={(e) => setColumn2(e.target.value)}
      />
      <button onClick={handlePlotGeneration}>Plot</button>
    </div>
    <div className="plot-container">
      <Plot
        data={[
          {
            x: plotData.map((point) => point[column1]),
            y: plotData.map((point) => point[column2]),
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ width: 500, height: 450 }}
      />
    </div>
  </div>
);
};

export default PlotPage;
