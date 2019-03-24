import { FetchDecks, ClearAll } from '../utils/storage'

export const NewCardAction = (deckId, card) => dispatch => {
    console.log(deckId, card)
    dispatch({
        type: 'NEW_CARD',
        payload: {deckId, card}
    })
}