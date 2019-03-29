import React from 'react'
import { Root } from "native-base";
import Deck from './deck/Decks'
import NewDeck from './deck/NewDeck'
import DeckDetail from './deck/DeckDetail'
import NewCard from './card/NewCard'
import Quiz from './quiz/Quiz'

import { createAppContainer, createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';

const DeckStack = createStackNavigator({
  Decks: {
    screen: Deck,
    navigationOptions: {
      title: 'udacicards'
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    // navigationOptions: {
    //   title: 'Deck View'
    // }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})

const MainNavigator = createMaterialTopTabNavigator({
  Decks: DeckStack,
  New: {screen: NewDeck},
});



const App = createAppContainer(MainNavigator);

export default () => <Root><App /></Root>;