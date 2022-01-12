import React from 'react';

const WriteOffItemRow = ({item}) => {
    return (
        <tr>
            <td>{item.item.upc}</td>
            <td>{item.amount}</td>
            <td>{item.reason}</td>
        </tr>
    );
};

export default WriteOffItemRow;