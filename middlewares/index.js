import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import saveStore from './saveStore'

export default applyMiddleware(
    thunk,
    saveStore    
)

