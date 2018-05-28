import React from 'react';
import { connect } from 'react-redux'
import { toggleInStock, setSearchQuery } from "../actions/index"

const SearchBar = ({query, onlyInStock, inStockToggle, queryChange}) => {
    return (
        <div>
            <p><input placeholder="Search..." value={query} onChange={(e) => queryChange(e.target.value)} /></p>
            <p><input type="checkbox" checked={onlyInStock} onChange={(e) => inStockToggle(e.target.checked)} /> Only show products in stock</p>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    query: state.query,
    onlyInStock: state.onlyInStock,
})

const mapDispatchToProps = dispatch => ({
    queryChange: value => dispatch(setSearchQuery(value)),
    inStockToggle: value => dispatch(toggleInStock(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)