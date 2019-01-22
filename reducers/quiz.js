import { FINISH_QUIZ } from '../actions/quiz'
import { RETRIEVE_STORE } from '../actions/store';

export default function quiz(state = {}, action) {
    switch (action.type) {
        case FINISH_QUIZ:

            const key = new Date().getTime()

            return {
                ...state,
                [key]: action.quiz
            }
        case RETRIEVE_STORE:

            return action.store ? {
                ...state,
                ...action.store.quiz
            }
                : {
                    ...state,
                }
        default:
            return state
    }
}