const initialState = {
    decks: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_DECK':
            const { decks } = state;
            return Object.assign({}, {decks: decks.concat(action.payload)})
        case 'FETCH_DECKS':
            if(action.payload){
                return Object.assign({}, {decks: [].concat(action.payload)})
            }
            return state;
        default:
            return state;
    }
}