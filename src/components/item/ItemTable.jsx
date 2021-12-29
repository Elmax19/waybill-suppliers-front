import React from 'react';
import RowItem from "./RowItem";

const ItemTable = ({items, select, selectedItems, edit, title}) => {
    if (!items.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No any Items!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <table border={1}>
                <thead>
                <tr>
                    <th>Item UPC</th>
                    <th>Label</th>
                    <th>Item Category</th>
                    <th>Placed Units</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) =>
                    <RowItem selectedItems={selectedItems} select={select} edit={edit} item={item} key={item.id}/>
                )}
                </tbody>
            </table>

        </div>
    );
};

export default ItemTable;