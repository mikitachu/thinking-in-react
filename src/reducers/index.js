import { combineReducers } from 'redux'
import {
    TOGGLE_IN_STOCK_FILTER,
    SET_SEARCH_QUERY
} from '../actions'

function query(state = '', action) {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return action.value
        default:
            return state;
    }
}

function onlyInStock(state = false, action) {
    switch (action.type) {
        case TOGGLE_IN_STOCK_FILTER:
            return action.value
        default:
            return state;
    }
}

const productsTable = combineReducers({
    query,
    onlyInStock,
})

export default productsTable