import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import planet from '../assets/planet.png';

const Navigation = () => (
  <>
    <header>
      <div className="logo-divider">
        <img src={planet} alt="Logo" className="logo" />
        Space Traveler&apos;s Hub
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/rockets">
              Rockets
            </NavLink>
          </li>
          <li>
            <NavLink to="/missions">
              Missions
            </NavLink>
          </li>
          <li>
            <NavLink to="/dragons">
              Dragons
            </NavLink>
          </li>
          <li>|</li>
          <li>
            <NavLink to="/">
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <section>
      <Outlet />
    </section>
  </>
);

export default Navigation;
