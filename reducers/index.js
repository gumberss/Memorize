import { combineReducers } from 'redux'

import decks from './decks'
import cards from './cards'
import quiz from './quiz'

export default combineReducers({
    decks,
    cards,
    quiz
})