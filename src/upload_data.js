import React, { useState, useEffect } from 'react';
import './upload_data.css';
import axios from 'axios';

const Data = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    // Fetch datasets from the API
    axios.get('http://127.0.0.1:8000/dataset/')
      .then(response => {
        setDatasets(response.data); // Assuming response.data is an array of objects
      })
      .catch(error => {
        console.error('Error fetching datasets:', error);
      });
  }, []);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name); // Set file name when file is selected
  };

  const handleFileNameChange = (event) => {
    const name = event.target.value;
    setFileName(name);
  };

  const handleUpload = async () => {
    if (file && fileName) {
      try {
        const formData = new FormData();
        formData.append('csv_file', file);
        formData.append('name', fileName);

        const response = await axios.post('http://127.0.0.1:8000/dataset/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Response:', response.data);
        alert('File uploaded successfully!');

        setFile(null);
        setFileName('');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload file. Please try again.');
      }
    } else {
      alert('Please select a file and provide a name.');
    }
  };

  return (
    <div className="data-page">
      <div className="dataset-list">
        {datasets.map(dataset => (
          <input
            key={dataset.name}
            type="text"
            value={dataset.name}
            readOnly
          />
        ))}
      </div>
      <div className="upload-form">
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={handleFileNameChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Data;
