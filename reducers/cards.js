import { REGISTER_CARD } from "../actions/card";
import { RETRIEVE_STORE } from "../actions/store";

export default function cards(state = {}, action) {
    switch (action.type) {
        case REGISTER_CARD:
            return {
                ...state,
                [action.card.id]: {
                    ...action.card
                }
            }
        case RETRIEVE_STORE:
            return {
                ...state,
                ...action.store.cards
            }
        default:
            return state
    }
}