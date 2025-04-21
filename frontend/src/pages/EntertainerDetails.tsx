import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

type Entertainer = {
  entertainerID: number;
  entStageName: string;
  entSSN?: string;
  entStreetAddress?: string;
  entCity?: string;
  entState?: string;
  entZipCode?: string;
  entPhoneNumber?: string;
  entWebPage?: string;
  entEMailAddress?: string;
  dateEntered?: string;
};

const fieldLabels: Record<keyof Entertainer, string> = {
  entertainerID: 'ID',
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

const EntertainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`https://final-horne-backend-ebdnh6abf4evhkeb.westus-01.azurewebsites.net/api/entertainers/${id}`)
      .then(res => setEntertainer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this entertainer?")) {
      axios.delete(`https://final-horne-backend-ebdnh6abf4evhkeb.westus-01.azurewebsites.net/api/entertainers/${id}`)
        .then(() => navigate('/entertainers'))
        .catch(err => console.error(err));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!entertainer) return;
    setEntertainer({ ...entertainer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`https://final-horne-backend-ebdnh6abf4evhkeb.westus-01.azurewebsites.net/api/entertainers/${id}`, entertainer)
      .then(() => {
        setIsEditing(false);
        alert('Updated successfully!');
      })
      .catch(err => console.error(err));
  };

  if (!entertainer) return <div>Loading...</div>;

  return (
    <div className="card shadow-sm bg-white p-4">
      <h2 className="text-center mb-4">Entertainer Details</h2>
      <div className="row">
        {Object.entries(entertainer).map(([key, value]) => (
          <div key={key} className="col-md-6 mb-3">
            <label className="form-label fw-semibold">{fieldLabels[key as keyof Entertainer]}:</label>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={value ?? ''}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <div className="form-control-plaintext">{value}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn btn-success me-2">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn btn-primary me-2">Edit</button>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EntertainerDetails;
