import { getDecks, ClearAll } from '../utils/storage'

export const NewDeckAction = deck => dispatch => {
    dispatch({
        type: 'NEW_DECK',
        payload: deck
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