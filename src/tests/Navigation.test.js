import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Navigation from "../components/Navigation";

// mock Redux store
const store = {
  getState: () => ({}),
  dispatch: () => {},
  subscribe: () => {},
};

// mock Redux Slice functions
jest.mock('../redux/rockets/rocketsSlice', () => ({
  getRocketsRequest: jest.fn(),
}));
jest.mock('../redux/dragons/dragonsSlice', () => ({
  fetchDragons: jest.fn(),
}));

test('Should render the Navigation component', () => {
  const { getByAltText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    </Provider>
  );
  const logoElement = getByAltText(/Logo/i);
  expect(logoElement).toBeInTheDocument();
});