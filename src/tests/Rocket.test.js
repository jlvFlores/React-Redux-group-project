import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Rocket from '../components/Rocket';

// mock Redux configureStore
const mockStore = configureStore([]);

describe('Rocket component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rockets: {
        rockets: [
          {
            id: 1,
            rocket_name: 'Falcon 1',
            description: 'A small rocket designed for the lofting of payloads into low Earth orbit.',
            flickr_images: ['https://www.spaceflightinsider.com/wp-content/uploads/2019/02/Dragon-1-C2.jpg'],
            reserved: false,
          },
        ],
        isLoading: false,
      },
    });
  });

  it('should render the component', () => {
    const rocket = store.getState().rockets.rockets[0];
    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <Rocket
          id={rocket.id}
          rocketName={rocket.rocket_name}
          description={rocket.description}
          image={rocket.flickr_images[0]}
          reserved={rocket.reserved}
        />
      </Provider>,
    );
    expect(getByAltText(rocket.rocket_name)).toBeInTheDocument();
    expect(getByText(rocket.rocket_name)).toBeInTheDocument();
    expect(getByText(rocket.description)).toBeInTheDocument();
    expect(getByText('Reserve Rocket')).toBeInTheDocument();
  });

  it('should display the correct texts and call reserveRocket when the Reserve Rocket button is clicked', () => {
    const rocket = store.getState().rockets.rockets[0];
    const { getByText } = render(
      <Provider store={store}>
        <Rocket
          id={rocket.id}
          rocketName={rocket.rocket_name}
          description={rocket.description}
          image={rocket.flickr_images[0]}
          reserved={false}
        />
      </Provider>,
    );
    expect(getByText('Reserve Rocket')).toBeInTheDocument();
    fireEvent.click(getByText('Reserve Rocket'));
    const mockReserveRocketAction = {
      type: 'rockets/reserveRocket',
      payload: rocket.id,
    };
    expect(store.getActions()).toEqual([mockReserveRocketAction]);
  });

  it('should display the correct texts and call reserveRocket when the Cancel Reservation button is clicked', () => {
    const rocket = store.getState().rockets.rockets[0];
    const { getByText } = render(
      <Provider store={store}>
        <Rocket
          id={rocket.id}
          rocketName={rocket.rocket_name}
          description={rocket.description}
          image={rocket.flickr_images[0]}
          reserved
        />
      </Provider>,
    );
    expect(getByText('Reserved')).toBeInTheDocument();
    expect(getByText('Cancel Reservation')).toBeInTheDocument();
    fireEvent.click(getByText('Cancel Reservation'));
    const mockReserveRocketAction = {
      type: 'rockets/reserveRocket',
      payload: rocket.id,
    };
    expect(store.getActions()).toEqual([mockReserveRocketAction]);
  });
});
