import { ADD_DECK, RECEIVE_DECKS, DELETE_DECK } from '../actions/decks'
import { RETRIEVE_STORE } from '../actions/store'
import { stringify } from 'qs';

export default function decks(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case DELETE_DECK: {

            var a = Object.keys(state)
                .filter(key => key !== action.deckName)
                .reduce((final, current) => ({ ...final, [current]: {...state[current]} }), {})

            alert(JSON.stringify( action.deckName))

            return {
                ...a

            }
        }
        case RETRIEVE_STORE:
            return {
                ...state,
                ...action.store.decks
            }
        default:
            return state
    }
}