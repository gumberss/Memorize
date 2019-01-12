import { ADD_DECK, RECEIVE_DECKS } from '../actions/decks'
import { RETRIEVE_STORE } from '../actions/store'

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
        case RETRIEVE_STORE:
            return {
                ...state,
                ...action.store.decks
            }
        default:
            return state
    }
}