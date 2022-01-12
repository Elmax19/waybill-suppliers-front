import React from 'react';

const RowApplicationItem = ({item}) => {
    return (
        <tr>
            <td>{item.item.upc}</td>
            <td>{item.count}</td>
            <td>{item.price}</td>
        </tr>
    );
};

export default RowApplicationItem;