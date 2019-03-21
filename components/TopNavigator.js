import React from 'react'
import { Root } from "native-base";
import Deck from './deck/Decks'
import NewDeck from './deck/NewDeck'
import { createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';


const MainNavigator = createMaterialTopTabNavigator({
  Decks: {screen: Deck},
  New: {screen: NewDeck},
});

const App = createAppContainer(MainNavigator);

export default () => <Root><App /></Root>;