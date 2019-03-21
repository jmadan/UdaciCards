import React from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base'
import { Provider } from 'react-redux'
import Tabs from './components/TopNavigator'
import Store from './store'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Container>
          <Tabs />
        </Container>
      </Provider>
    );
  }
}