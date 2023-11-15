import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => (
  <main>
    <nav className="nav">
      <div className="nav-container">
        <img src="/planet.png" alt="" className="space-img" />
        <h3>Space Travellers Hub</h3>
      </div>

      <ul className="nav-list">
        <li>
          <NavLink to="/rockets" className="nav-link">
            Rockets
          </NavLink>
        </li>
        <li>
          <NavLink to="/missions" className="nav-link">
            Missions
          </NavLink>
        </li>
        <li>
          <NavLink to="/myprofile" className="nav-link">
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  </main>
);

export default Navbar;
