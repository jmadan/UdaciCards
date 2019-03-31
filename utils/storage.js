import { AsyncStorage } from 'react-native';

export const getDecks = async () => {
    try {
        const result = await AsyncStorage.getItem("decks")
        return await JSON.parse(result) || {}
    }
    catch(err){
        console.log(err)
    }
}

export const getDeck = async (title) => {
    try{
        const decks = await getDecks()
        return decks[title]
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteDeck = async (entryId) => {
    try{
        await AsyncStorage.removeItem(entryId)
    } catch (error) {
        return error;
    }
}

export const saveDeckTitle = async (entry) => {
    try{
        const decks = await getDecks() || {}
        const { title } = entry
        decks[title] = Object.assign({}, entry)
        await AsyncStorage.setItem("decks", JSON.stringify(decks))
        return decks
    } catch (error) {
        return error;
    }
}

export const saveCardToDeck = async (entry) => {
    const { card, deckTitle } = entry
    const decks = await getDecks()
    if(decks[deckTitle].questions){
        decks[deckTitle].questions = [...decks[deckTitle].questions, card]
    } else {
        decks[deckTitle] = {...decks[deckTitle], questions: [].concat(card)}
    }
    try{
        await AsyncStorage.setItem("decks", JSON.stringify(decks))
        return decks
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
