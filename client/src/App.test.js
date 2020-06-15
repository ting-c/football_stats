import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";

describe('App test', () => {

 const wait = async (ms = 0) => {
		await act(() => {
			return new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		});
 };

  it('renders spinner when loading', async () => {
    const history = createMemoryHistory();
    history.push('/player/1');
    const component = render(
      <Router history={history} >
        <App />
      </Router>  
    )

    await wait();

    expect(component.getByTestId("spinner")).toBeInTheDocument();
  });
});
