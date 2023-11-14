import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => (
  <main>
    <nav className="nav">
      <h2>Space Traveller's Hub</h2>
      <ul className="nav-list">
        <li className="nav-link">
          <NavLink to="/rockets" activeClassName="active-link">
            Rockets
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/missions" activeClassName="active-link">
            Missions
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/myprofile" activeClassName="active-link">
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  </main>
);

export default Navbar;
