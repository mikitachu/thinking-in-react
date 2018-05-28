export const TOGGLE_IN_STOCK_FILTER = 'TOGGLE_IN_STOCK_FILTER'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'

export function toggleInStock (value) {
    return { type: TOGGLE_IN_STOCK_FILTER, value }
}

export function setSearchQuery(value) {
    return { type: SET_SEARCH_QUERY, value }
}