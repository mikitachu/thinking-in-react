import React from 'react'

const ProductTable = ({ rows }) => {
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

export default ProductTable