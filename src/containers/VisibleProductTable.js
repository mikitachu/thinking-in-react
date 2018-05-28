import React from 'react'
import { connect } from 'react-redux'
import ProductTable from "../components/ProductTable";
import ProductRow from '../components/ProductRow'
import ProductCategoryRow from '../components/ProductCategoryRow'

const getRows = (products, onlyInStock, query) => {
    const productIsVisible = (product) => {
        if (onlyInStock && !product.stocked) {
            return false
        }

        if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
            return false
        }

        return true
    }

    const productsByCategory = products.reduce((accumulator, currentValue) => {
        if (! accumulator[currentValue.category]) {
            accumulator[currentValue.category] = []
        }
        accumulator[currentValue.category].push(currentValue);
        return accumulator
    }, {});

    let rows = [];
    Object.keys(productsByCategory).forEach((categoryName) => {
        const products = productsByCategory[categoryName];
        let productRows = [];
        products.forEach((product) => {
            if (productIsVisible(product)) {
                productRows.push(<ProductRow key={product.name} product={product} />);
            }
        });

        rows.push(
            [<ProductCategoryRow key={categoryName} name={categoryName} />, ...productRows]
        )
    });

    return rows
}

const mapStateToProps = (state, ownProps) => ({
    rows: getRows(ownProps.products, state.onlyInStock, state.query),
})

export default connect(mapStateToProps)(ProductTable)