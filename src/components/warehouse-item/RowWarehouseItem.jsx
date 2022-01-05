import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const RowWarehouseItem = ({item, changedItems, change}) => {
    return (
        <tr>
            <td>{item.item.upc}</td>
            <td>{item.item.label}</td>
            <td>{item.item.itemCategory.name}</td>
            <td>{item.item.units}</td>
            <td>{item.item.price}</td>
            <td>{item.count}</td>
            <td>{(changedItems.map(listItem => listItem.item.id).includes(item.item.id))
                ? changedItems.filter(listItem => listItem.item.id === item.item.id)[0].activeStatus === "ACTIVE"
                    ? <CheckBox
                        checked
                        onChange={e => change(item.item.id, e.target.checked)}
                    />
                    : <CheckBox
                        onChange={e => change(item.item.id, e.target.checked)}
                    />
                : item.activeStatus === "ACTIVE"
                    ? <CheckBox
                        checked
                        onChange={e => change(item.item.id, e.target.checked)}
                    />
                    : <CheckBox
                        onChange={e => change(item.item.id, e.target.checked)}
                    />
            }</td>
        </tr>
    );
};

export default RowWarehouseItem;