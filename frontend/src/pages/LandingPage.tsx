// src/pages/LandingPage.tsx
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="text-center">
    <h1>Welcome to the Entertainment Agency!</h1>
    <p className="mt-3">
      <Link className="btn btn-primary" to="/entertainers">View Entertainers</Link>
    </p>
  </div>
);

export default LandingPage;
