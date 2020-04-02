import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import config from './config';
import ReduxThunk from 'redux-thunk';
import RouterComponent from './src/Router';
import rootReducer from './src/reducers';

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  
  constructor(props)  {
    super(props);
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId
    });
  };

  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  };
};

export default App;
