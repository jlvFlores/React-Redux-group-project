import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
 mission-setup
import Navigation from './components/navigation';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="profile" element={<Profile />} />
            <Route to="/rockets">Rockets</Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
import Navigation from './components/Navigation';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Dragons from './components/Dragons';
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
      {
        path: '/dragons',
        element: <Dragons />,
      },
    ],
  },
]);

export default App;
