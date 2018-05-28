import React from 'react'

const ProductRow = ({product: {stocked, name, price}}) => (
    <tr>
        <td className={!stocked ? 'not-in-stock' : undefined}>{name}</td>
        <td>{price}</td>
    </tr>
)

export default ProductRow