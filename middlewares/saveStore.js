import { AsyncStorage } from 'react-native'

export const STORE_DATA_KEY = 'MEMORIZE_STORE_KEY'

const saveStore = store => next => action => {
    var returnData = next(action)

    AsyncStorage.setItem(STORE_DATA_KEY, JSON.stringify(returnData))
    
    return returnData
}

export default saveStore