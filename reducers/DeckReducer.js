
const initialState = {
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_DECK':
            return Object.assign({}, state, {[action.payload.title]: action.payload})
        case 'FETCH_DECKS':
            // const deckObj = action.payload
            if(Object.keys(action.payload).length){
                return action.payload    
            }
            return null
        case 'NEW_CARD':
            const { deck, card } = action.payload
            const newCard = {id: card.id, question: card.question, answer: card.answer}
            const { question } = card
            return {...state, [deck.title]: {...state[deck.title], questions: {...state[deck.title].questions, [question]: newCard}}}
        case 'CLEAR_DECKS':
            return Object.assign({}, {decks: null})
        default:
            return state;
    }
}