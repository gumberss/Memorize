export const REGISTER_CARD = 'REGISTER_CARD'

export function registerCard(card){
    return {
        type: REGISTER_CARD,
        card
    }
}