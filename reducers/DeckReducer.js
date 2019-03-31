
const initialState = {
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_DECK':
        case 'FETCH_DECKS':
        case 'NEW_CARD':
            return Object.assign({}, action.payload)
        case 'CLEAR_DECKS':
            return Object.assign({}, {decks: null})
        default:
            return state;
    }
}