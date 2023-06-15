import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Form from './Form';

const mockStore = configureStore([]);

describe('Form', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({});
    component = render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  });
  it('should render without errors', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    // Your assertions here
  });
  it('should call the submit function when the form is submitted', () => {
    const submitButton = component.getByText('Submit');
    fireEvent.click(submitButton);
    // Add your assertions for the submit function being called with the correct data
  });
});
