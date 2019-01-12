
export const RETRIEVE_STORE = 'RETRIEVE_STORE'

export function retrieveStore(store) {
    return {
        type: RETRIEVE_STORE,
        store: store
    }
}