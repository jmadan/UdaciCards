import { AsyncStorage } from 'react-native';

export const getDecks = async () => {
    try{
        const decks = {}
        const keys = await AsyncStorage.getAllKeys()
        const result = await AsyncStorage.multiGet(keys)
        result.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            decks[key] = JSON.parse(value)
          });
        return decks
    } catch (error) {
    // Error retrieving data
    }
}

export const getDeck = async (title) => {
    try{
        const deck = await AsyncStorage.getItem(title);
        if (deck !== null) {
          return deck;
        } else {
            console.log('I am null while fetching')
            return null
        }
        return deck
    } catch (error) {
        console.log(error)
        return error
    }
}

export const saveDeckTitle = async (entry) => {
    try{
        await AsyncStorage.setItem(entry.title, JSON.stringify(entry))
    } catch (error) {
        return error;
    }
}

export const saveCardToDeck = async (entry) => {
    const { card, deckTitle } = entry
    try{
        const value = await AsyncStorage.getItem(deckTitle);
        if (value !== null) {
            let deck = JSON.parse(value)
            if(deck.questions){
                deck.questions = Object.assign({}, deck.questions, {[card.question]: card})
            } else {
                deck.questions = {[card.question]: card}
            }
            await AsyncStorage.mergeItem(deckTitle, JSON.stringify(deck))
        }
    } catch (error) {
        console.log(error)
    // Error retrieving data
    }
}

export const ClearAll = async () => {
    try{
        console.log('I am cleaning....')
        await AsyncStorage.clear(err => console.log(err));
    } catch (error) {
        console.log(error)
    }
}
