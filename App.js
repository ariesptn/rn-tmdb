import React from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux'
import store from './store'
import RootNav from './navigations/RootNavigator.js'

export default class App extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
          <RootNav />
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
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
