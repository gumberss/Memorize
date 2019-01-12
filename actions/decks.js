export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

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