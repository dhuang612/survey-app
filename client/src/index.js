import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';
//stand in dummy so that redux doesnt crash with an error
const store = createStore(reducers, {}, applyMiddleware());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.querySelector('#root')
);

/*

we render store and provider here
provider = bonding layer between react and redux
*/
