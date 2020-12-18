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
import homePageReducer from './GuestManager/store/homePageReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const appReducer = combineReducers({
  authR: authReducer,
  bannerR: bannerReducer,
  navR: navigationReducer,
  userR: userDetailsReducer,
  loadR: loaderReducer,
  homeR: homePageReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
      // for all keys defined in your persistConfig(s)
      storage.removeItem('persist:root')
      // storage.removeItem('persist:otherKey')
      state = undefined;
      console.log('rootreducer')
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer
);

let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
