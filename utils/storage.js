import { AsyncStorage } from 'react-native';

export const getDecks = async () => {
    try{
        const decks = {}
        // const value = await AsyncStorage.getItem(KEY);
        // if (value !== null) {
        //     console.log(JSON.parse(value))
        //   return value;
        // } else {
        //     console.log('I am null while fetching')
        //     return null
        // }
        const keys = await AsyncStorage.getAllKeys()
        const result = await AsyncStorage.multiGet(keys)
        result.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            decks[key] = JSON.parse(value)
          });
          console.log('finaldecks -------- ',decks)
        return decks
    } catch (error) {
    // Error retrieving data
    }
}

export const getDeck = async (id) => {
    try{
        const deck = await AsyncStorage.getItem(id);
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
    console.log(entry)
    try{
        await AsyncStorage.setItem(entry.id, JSON.stringify(entry))
    } catch (error) {
        return error;
    }
}

export const saveCardToDeck = async (entry) => {
    const { cards, deckId } = entry
    try{
        const value = await AsyncStorage.getItem(deckId);
        if (value !== null) {
            let deck = JSON.parse(value)
            if(deck.cards){
                deck.cards = Object.assign({}, deck.cards, {[cards.id]: cards})
            } else {
                deck.cards = {[cards.id]: cards}
            }
            await AsyncStorage.mergeItem(deckId, JSON.stringify(deck))
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
