import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Header } from 'native-base'
import { Provider } from 'react-redux'
import Tabs from './components/TopNavigator'
import Store from './store'
import { Constants } from 'expo'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Container>
          <Header style={{height: Constants.statusBarHeight}}>
            <StatusBar translucent />
          </Header>
          <Tabs />
        </Container>
      </Provider>
    );
  }
}