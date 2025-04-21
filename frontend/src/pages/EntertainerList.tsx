// src/pages/EntertainerList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Entertainer = {
  entertainerID: number;
  entStageName: string;
  bookingCount: number;
  lastBookingDate: string | null;
};

const EntertainerList = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);

  useEffect(() => {
    axios.get('https://final-horne-backend-ebdnh6abf4evhkeb.westus-01.azurewebsites.net/api/entertainers')
      .then(res => setEntertainers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Entertainers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Stage Name</th>
            <th>Booking Count</th>
            <th>Last Booked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map(e => (
            <tr key={e.entertainerID}>
              <td>{e.entStageName}</td>
              <td>{e.bookingCount}</td>
              <td>{e.lastBookingDate ? new Date(e.lastBookingDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <Link className="btn btn-sm btn-info" to={`/entertainers/${e.entertainerID}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/entertainers/new" className="btn btn-primary mt-3">Add Entertainer</Link>
    </div>
  );
};

export default EntertainerList;
