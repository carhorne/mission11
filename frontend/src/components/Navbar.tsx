// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">Entertainment Agency</Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/entertainers">Entertainers</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
