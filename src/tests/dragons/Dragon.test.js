import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithProviders from '../utils/testsUtils';
import Dragon from '../../components/Dragons/Dragon';

const dragonSolo = {
  id: 'dragonSoloTest',
  name: 'Dragon Solo Test',
  description: 'Description of the capsule',
  image: 'https://i.imgur.com/9fWdwNv.jpg',
};

const dragonReserved = {
  id: 'dragonReservedTest',
  name: 'Dragon Booking Test',
  description: 'Description of the Booked capsule',
  image: 'https://farm8.staticflickr.com/7647/16581815487_6d56cb32e1_b.jpg',
  reserved: true,
};

let container = null;

/**
 * START: Dragon component tests
 */
describe('Dragon component tests', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = renderWithProviders(<Dragon id={dragonSolo.id} />, {
      preloadedState: {
        dragons: {
          available: [dragonSolo],
          status: { type: 'idle' },
          error: null,
        },
      },
    }).container;
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    // unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  /**
   * START: Dragon render
   */
  describe('Dragon must be rendered', () => {
    test('should render a name', () => {
      expect(screen.getByText(dragonSolo.name)).toBeInTheDocument();
    });
    test('should render a description', () => {
      expect(screen.getByText(dragonSolo.description)).toBeInTheDocument();
    });
    test('should render a [Reserve] button', () => {
      expect(screen.queryByRole('button', { name: 'Reserve' })).toBeInTheDocument();
    });
    test('should render a picture', () => {
      expect(screen.queryByRole('img')).toBeInTheDocument();
    });
    test('should NOT render a cancel button', () => {
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
    });
    test('should NOT render a reserved badge', () => {
      expect(screen.queryByText('Reserved')).not.toBeInTheDocument();
    });
    test('should NOT render a booking... message', () => {
      expect(screen.queryByText('Booking...')).not.toBeInTheDocument();
    });
    test('should NOT render a canceling... message', () => {
      expect(screen.queryByText('Canceling...')).not.toBeInTheDocument();
    });
  });
  /**
   * END: Dragon render
   */

  /**
   * START: Booking a Dragon
   */
  describe('Dragon can be reserved', () => {
    test('should NOT render a reserved badge', () => {
      expect(screen.queryByText('Reserved')).not.toBeInTheDocument();
    });
    test('should render a [Reserve] button', () => {
      expect(screen.queryByRole('button', { name: 'Reserve' })).toBeInTheDocument();
    });

    describe('when [Reserve] button is clicked => then', () => {
      test('should render a Booking... message => then', () => {
        fireEvent.click(screen.queryByRole('button', { name: 'Reserve' }));
        expect(screen.queryByText('Booking...')).toBeInTheDocument();
      });

      test('should render a [Cancel] button => then', () => {
        waitFor(() => {
          expect(screen.queryByRole('button', { name: 'Cancel' })).toBeInTheDocument();
        });
      });

      test('should render a Reserved badge', () => {
        waitFor(() => {
          expect(screen.queryByText('Reserved')).toBeInTheDocument();
        });
      });
    });
  });
  /**
   * END: Booking a Dragon
   */
});
/**
 * END: Dragon component tests
 */

/**
 * START: RESERVED Dragon component tests
 */
describe('\n<RESERVED> Dragon component tests', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = renderWithProviders(<Dragon id={dragonReserved.id} />, {
      preloadedState: {
        dragons: {
          available: [dragonReserved],
          status: { type: 'idle' },
          error: null,
        },
      },
    }).container;
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    // unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  /**
   * START: Reserved Dragon render
   */
  describe('<RESERVED> Dragon must be rendered', () => {
    test('should render a name', () => {
      expect(screen.getByText(dragonReserved.name)).toBeInTheDocument();
    });
    test('should render a description', () => {
      expect(screen.queryByText(dragonReserved.description)).toBeInTheDocument();
    });
    test('should render a [Cancel] button', () => {
      expect(screen.queryByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });
    test('should render a picture', () => {
      expect(screen.queryByRole('img')).toBeInTheDocument();
    });
    test('should render a reserved badge', () => {
      expect(screen.queryByText('Reserved')).toBeInTheDocument();
    });
    test('should NOT render a [Reserve] button', () => {
      expect(screen.queryByRole('button', { name: 'Reserve' })).not.toBeInTheDocument();
    });
    test('should NOT render a booking... message', () => {
      expect(screen.queryByText('Booking...')).not.toBeInTheDocument();
    });
    test('should NOT render a canceling... message', () => {
      expect(screen.queryByText('Canceling...')).not.toBeInTheDocument();
    });
  });
  /**
   * END: Reserved Dragon render
   */

  /**
   * START: Canceling a Dragon
   */
  describe('<RESERVED> Dragon can be canceled', () => {
    test('should render a reserved badge', () => {
      expect(screen.queryByText('Reserved')).toBeInTheDocument();
    });
    test('should render a [Cancel] button', () => {
      expect(screen.queryByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    describe('when [Cancel] button is clicked => then', () => {
      test('should render a Canceling... message => then', () => {
        fireEvent.click(screen.queryByRole('button', { name: 'Cancel' }));
        expect(screen.queryByText('Canceling...')).toBeInTheDocument();
      });

      test('should render a [Reserve] button => then', () => {
        waitFor(() => {
          expect(screen.queryByRole('button', { name: 'Reserve' })).toBeInTheDocument();
        });
      });

      test('should NOT render a Reserved badge', () => {
        waitFor(() => {
          expect(screen.queryByText('Reserved')).not.toBeInTheDocument();
        });
      });
    });
  });
  /**
   * END: Canceling a Dragon
   */
});
/**
 * END: RESERVED Dragon component tests
 */
