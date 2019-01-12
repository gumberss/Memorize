import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Constants } from 'expo'

import Card from './components/Card'
import Decks from './views/Decks'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

import Navigator from './components/Navigator';
import middlewares from './middlewares';

const store = createStore(reducers, middlewares)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ height: Constants.statusBarHeight }}>
          <StatusBar translucent />
        </View>
        <Navigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
