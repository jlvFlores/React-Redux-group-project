import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

// import your setupStore as a basic setup
import setupStore from '../../redux/store';

const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => (<Provider store={store}>{children}</Provider>);

  Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

  // Return an object with the store and all of RTL's query functions
  return ({ store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) });
};

export default renderWithProviders;
