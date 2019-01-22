import { REGISTER_CARD } from "../actions/card";
import { RETRIEVE_STORE } from "../actions/store";

export default function cards(state = {}, action) {
    switch (action.type) {
        case REGISTER_CARD:
            return {
                ...state,
                [action.card._id]: {
                    ...action.card
                }
            }
        case RETRIEVE_STORE:
            return action.store ? {
                ...state,
                ...action.store.cards
            }
                : {
                    ...state,
                }
        default:
            return state
    }
}