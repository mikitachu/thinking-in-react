import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            onlyInStock: false,
        };
    }

    handleInStockToggle(event) {
        this.setState({
            onlyInStock: !this.state.onlyInStock
        })
    }

    handleQueryChange(event) {
        this.setState({
            query: event.target.value
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    query={this.state.query}
                    queryChange={(e) => this.handleQueryChange(e)}
                    onlyInStock={this.state.onlyInStock}
                    inStockToggle={(e) => this.handleInStockToggle(e)}
                />
                <ProductTable
                    query={this.state.query}
                    onlyInStock={this.state.onlyInStock}
                    products={this.props.products}
                />
            </div>
        )
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <p><input placeholder="Search..." value={this.props.query} onChange={this.props.queryChange} /></p>
                <p><input type="checkbox" checked={this.props.onlyInStock} onChange={this.props.inStockToggle} /> Only show products in stock</p>
            </div>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const productIsVisible = (product) => {
            if (this.props.onlyInStock && !product.stocked) {
                return false
            }

            if (this.props.query && !product.name.toLowerCase().includes(this.props.query.toLowerCase())) {
                return false
            }

            return true
        }

        const productsByCategory = this.props.products.reduce((accumulator, currentValue) => {
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

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">{this.props.name}</th>
            </tr>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        let {name, stocked, price} = this.props.product;

        return (
            <tr>
                <td className={!stocked ? 'not-in-stock' : undefined}>{name}</td>
                <td>{price}</td>
            </tr>
        )
    }
}

const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);