import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  entStageName: '',
  entSSN: '',
  entStreetAddress: '',
  entCity: '',
  entState: '',
  entZipCode: '',
  entPhoneNumber: '',
  entWebPage: '',
  entEMailAddress: '',
  dateEntered: '',
};

const fieldLabels: Record<string, string> = {
  entStageName: 'Stage Name',
  entSSN: 'SSN',
  entStreetAddress: 'Street Address',
  entCity: 'City',
  entState: 'State',
  entZipCode: 'Zip Code',
  entPhoneNumber: 'Phone Number',
  entWebPage: 'Web Page',
  entEMailAddress: 'Email Address',
  dateEntered: 'Date Entered',
};

const AddEntertainer = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('https://final-horne-backend-ebdnh6abf4evhkeb.westus-01.azurewebsites.net/api/entertainers', form)
      .then(() => {
        alert('Entertainer added!');
        navigate('/entertainers');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card shadow-sm bg-white p-4">
      <h2 className="text-center mb-4">Add New Entertainer</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="col-md-6 mb-3">
              <label className="form-label fw-semibold">{fieldLabels[key] ?? key}:</label>
              <input
                className="form-control"
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                required={key === 'entStageName'}
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEntertainer;
