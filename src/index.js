import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import authReducer from './GuestManager/store/authReducer'
import bannerReducer from './GuestManager/store/bannerReducer'
import navigationReducer from './GuestManager/store/navigationReducer'
import userDetailsReducer from './GuestManager/store/userDetailsReducer'
import loaderReducer from './GuestManager/store/loaderReducer'

const rootReducer = combineReducers({
  authR: authReducer,
  bannerR: bannerReducer,
  navR: navigationReducer,
  userR: userDetailsReducer,
  loadR: loaderReducer
})

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
