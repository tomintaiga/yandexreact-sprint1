import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app'

// ##############
// Init store

import { compose, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

// ##############

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <App/>
    </Provider>
  </StrictMode>
)
