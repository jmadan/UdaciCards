import { AsyncStorage } from 'react-native';

const KEY = '@Udacity:UdaciCard';

export const FetchDecks = async () => {
    try{
        const value = await AsyncStorage.getItem(KEY);
        if (value !== null) {
          return value;
        } else {
            console.log('I am null while fetching')
        }
    } catch (error) {
    // Error retrieving data
    }
}

export const CreateDeck = async (entry) => {
    console.log(entry)
    try{
        const value = await AsyncStorage.getItem(KEY);
        if (value !== null) {
            value.push(entry)
            await AsyncStorage.setItem(KEY, JSON.stringify({decks: value}))
            console.log('after storage',value);
        } else {
            let valueArray = [];
            valueArray.push(entry);
            let result = await AsyncStorage.setItem(KEY, JSON.stringify({decks: valueArray}))
            console.log('result after first save: ', result)
        }
    } catch (error) {
        return error;
    }
}

export const CreateCard = async (entry) => {
    try{
        const value = await AsyncStorage.getItem(KEY);
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
    } catch (error) {
    // Error retrieving data
    }
}
