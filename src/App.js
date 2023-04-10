import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import NavLink from './components/NavLink';
const router = createBrowserRouter([
  {
    path: '/',
    element: <NavLink />,
  },
  
]);
const App = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
);

export default App;
