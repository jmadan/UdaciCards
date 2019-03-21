import { FetchDecks } from '../utils/storage'

export const NewDeck = deck => dispatch => {
    dispatch({
        type: 'NEW_DECK',
        payload: deck
    })
}

export const FetchDecksAction = () => dispatch => {
    FetchDecks().then(result => {
        const response = JSON.parse(result)
        dispatch({
            type: 'FETCH_DECKS',
            payload: response.decks.map(d => d)
        })
    })
}