import { FetchDecks, ClearAll } from '../utils/storage'

export const NewCardAction = (deck, card) => dispatch => {
    dispatch({
        type: 'NEW_CARD',
        payload: {deck, card}
    })
}