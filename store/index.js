import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import movie from './reducers/movie.js'

const store = createStore(
    combineReducers({ movie }),
    applyMiddleware(thunk)
)

export default store
