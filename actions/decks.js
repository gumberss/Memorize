
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeck(deckName) {

    return dispatch => {
        dispatch ({
            type: ADD_DECK,
            deck: {
                [deckName]: {
                    name: deckName
                }
            }
        })
        
        return Promise.resolve()
    }
    
}

export function deleteDeck(deckName) {
    return {
        type: DELETE_DECK,
        deckName
    }
}