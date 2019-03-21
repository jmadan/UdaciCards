import { combineReducers } from 'redux';
import decks from './DeckReducer';

const reducer = combineReducers({decks});

export default reducer;
