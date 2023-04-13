import { render } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Rockets from '../components/Rockets';

// mock Redux store
const store = {
  getState: () => ({}),
  dispatch: () => {},
  subscribe: () => {},
};

// mock useSelector hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

// mock Redux Slice function
jest.mock('../redux/rockets/rocketsSlice', () => ({
  getRocketsRequest: jest.fn(),
}));

describe('Rockets component', () => {
  it('renders the component correctly when not loading', () => {
    useSelector.mockReturnValue({
      rockets: [
        {
          id: 'falcon9',
          rocket_name: 'Falcon 9',
          description: 'A two-stage rocket designed and manufactured by SpaceX.',
          flickr_images: ['https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg'],
          reserved: false,
        },
      ],
      isLoading: false,
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Rockets />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Falcon 9')).toBeInTheDocument();
  });

  it('displays a loading message when loading', () => {
    useSelector.mockReturnValue({
      rockets: [],
      isLoading: true,
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Rockets />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Loading rockets...')).toBeInTheDocument();
  });
});
