import axios from 'axios';
import { screen } from '@testing-library/react';
import renderWithProviders from '../utils/testsUtils';
import Dragons from '../../components/Dragons/Dragons';

jest.mock('axios');

const dragons = [
  {
    id: 'dragon1',
    name: 'Dragon 1',
    description: 'Description one',
    image: 'https://i.imgur.com/9fWdwNv.jpg',
  },
  {
    id: 'dragon2',
    name: 'Dragon 2',
    description: 'Description two',
    image: 'https://farm8.staticflickr.com/7647/16581815487_6d56cb32e1_b.jpg',
  },
];

const resp = { data: dragons };

describe('fetching and listing dragons tests', () => {
  test('axios should fetch dragons from the API', () => {
    axios.get.mockResolvedValue(resp);
    axios.get('https://api.spacexdata.com/v4/dragons').then(
      ({ data }) => expect(data.length).toBe(2),
    );
  });

  test('if fetchDragons has not been called, should see "There are no Dragons"', () => {
    renderWithProviders(<Dragons />);
    expect(screen.getByText(/There are no Dragons/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading dragons\.\.\./i)).not.toBeInTheDocument();
  });

  test('should render two dragons "Dragon 1" and "Dragon 2"', () => {
    const initialState = {
      available: dragons,
      status: { type: 'idle' },
      error: null,
    };

    renderWithProviders(<Dragons />, { preloadedState: { dragons: initialState } });
    expect(screen.getByText(/Dragon 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Dragon 2/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Dragon/i)).toHaveLength(2);
  });

  test('when status.type is \'loading\' should see "Loading dragons..."', () => {
    const initialState = {
      available: [],
      status: { type: 'loading' },
      error: null,
    };

    renderWithProviders(<Dragons />, { preloadedState: { dragons: initialState } });
    expect(screen.getByText(/Loading dragons/i)).toBeInTheDocument();
  });

  test('when status.type is \'idle\' & available is [] should see "There are no Dragons"', () => {
    const initialState = {
      available: [],
      status: { type: 'idle' },
      error: null,
    };

    renderWithProviders(<Dragons />, { preloadedState: { dragons: initialState } });
    expect(screen.getByText(/There are no Dragons/i)).toBeInTheDocument();
  });

  test('when status.type is \'idle\' & error is not null should see "Something went wrong"', () => {
    const initialState = {
      available: [],
      status: { type: 'idle' },
      error: 'an error has ocurred',
    };

    renderWithProviders(<Dragons />, { preloadedState: { dragons: initialState } });
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/an error has ocurred/i)).toBeInTheDocument();
  });
});
