
const initialState = {
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_DECK':
            return Object.assign({}, state, {[action.payload.id]: action.payload})
        case 'FETCH_DECKS':
            // const deckObj = action.payload
            if(Object.keys(action.payload).length){
                return action.payload    
            }
            return null
        case 'ADD_CARD':
            const { deck, question, answer, cardId } = action.payload
            const newCard = {question, answer}
            return {...state, [deck.id]: {...state[deck.id], cards: {...state[deck.id].cards, cardId: newCard}}}
        case 'CLEAR_DECKS':
            return Object.assign({}, {decks: null})
        default:
            return state;
    }
}