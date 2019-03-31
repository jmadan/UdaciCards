import { saveCardToDeck } from '../utils/storage'

export const NewCardAction = (deck, card) => dispatch => {

    saveCardToDeck({deckTitle: deck.title, card: {id: card.id, question: card.question, answer: card.answer}})
    .then(result => {
        dispatch({
            type: 'NEW_CARD',
            payload: result
        })
    })
}