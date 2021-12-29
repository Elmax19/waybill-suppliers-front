import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const RowItem = ({selectedItems, select, edit, item}) => {
    return (
        <tr>
            <td>
                <div>{
                    selectedItems.includes(item.id)
                        ? <input
                            type={"checkbox"}
                            checked
                            onChange={e => select(item.id, e.target.checked)}
                        />
                        : <CheckBox
                            onChange={e => select(item.id, e.target.checked)}
                        />
                }{item.upc}</div>
            </td>
            <td onClick={() => edit(item)}>{item.label}</td>
            <td>{item.itemCategory.name}</td>
            <td>{item.units}</td>
            <td>{item.price}</td>
        </tr>
    );
};

export default RowItem;