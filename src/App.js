import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Profile from './components/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        index: '/rockets',
        element: <Rockets />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/missions',
        element: <Missions />,
      },
    ],
  },
]);

const App = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
);

export default App;
