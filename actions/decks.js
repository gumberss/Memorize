
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeck(deckName) {
    return {
        type: ADD_DECK,
        deck: {
            [deckName]: {
                name: deckName
            }
        }
    }
}

export function deleteDeck(deckName) {
    return {
        type: DELETE_DECK,
        deckName
    }
}