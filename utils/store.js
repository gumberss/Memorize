import { AsyncStorage } from 'react-native'
import { createStore } from 'redux';
import reducers from '../reducers';
import middlewares from '../middlewares';

export const STORE_DATA_KEY = 'MEMORIZE_STORE_KEY'

const configureStore = () => {
    const store = createStore(reducers, middlewares);

    store.subscribe(() =>
        AsyncStorage.setItem(STORE_DATA_KEY, JSON.stringify(store.getState()))
    );
    return store;
};

export default configureStore;