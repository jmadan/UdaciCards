import { getDecks, deleteDeck, ClearAll, saveDeckTitle } from '../utils/storage'

export const NewDeckAction = deck => dispatch => {
    console.log(deck)
    saveDeckTitle(deck).then(result => {
        dispatch({
            type: 'NEW_DECK',
            payload: result
        })
    })
}

export const FetchDecksAction = () => dispatch => {
    getDecks().then(result => {
        dispatch({
            type: 'FETCH_DECKS',
            payload: result
        })
    })
}

export const DeleteDeckAction = (deckId) => dispatch => {
    deleteDeck(deckId).then(result => {
        dispatch({
            type: 'DELETE_DECK',
            payload: deckId
        })
    })
}

export const ClearDecksAction = () => dispatch => {
    ClearAll()
    // .then(result => {
        // const response = JSON.parse(result)
        dispatch({
            type: 'CLEAR_DECKS',
            payload: null
        })
    // })
}