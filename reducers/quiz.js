import { FINISH_QUIZ } from '../actions/quiz'

export default function quiz(state = {}, action) {
    switch (action.type) {
        case FINISH_QUIZ:

            const key = new Date().getTime()

            return {
                ...state,
                [key]: action.quiz
            }
        default:
            return state
    }
}