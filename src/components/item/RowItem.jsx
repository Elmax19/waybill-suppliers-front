import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const RowItem = ({selectedItems, select, item}) => {
    return (
        <tr>
            <td>
                <div>{
                    selectedItems.includes(item.upc)
                        ? <input
                            type={"checkbox"}
                            checked
                            onChange={e => select(item.upc, e.target.checked)}
                        />
                        : <CheckBox
                            onChange={e => select(item.upc, e.target.checked)}
                        />
                }{item.upc}</div>
            </td>
            <td>{item.label}</td>
            <td>{item.itemCategory.name}</td>
            <td>{item.units}</td>
            <td>{item.price}</td>
        </tr>
    );
};

export default RowItem;