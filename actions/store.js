
export const RETRIEVE_STORE = 'RETRIEVE_STORE'

export function retrieveStore(store) {

    return dispatch => {
        dispatch({
            type: RETRIEVE_STORE,
            store: store
        })
        return Promise.resolve()
    }
}