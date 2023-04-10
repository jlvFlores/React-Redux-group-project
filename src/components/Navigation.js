import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getRocketsRequest } from '../store/rockets/rocketsSlice';
import planet from '../assets/planet.png';

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRocketsRequest());
  }, [dispatch]);

  return (
    <>
      <header>
        <div className="logo-divider">
          <img src={planet} alt="Logo" className="logo" />
          Space Traveler&apos;s Hub
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                Rockets
              </NavLink>
            </li>
            <li>
              <NavLink to="/missions">
                Missions
              </NavLink>
            </li>
            <li>|</li>
            <li>
              <NavLink to="/profile">
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
};

export default Navigation;
