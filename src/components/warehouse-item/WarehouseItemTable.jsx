import React from 'react';
import RowWarehouseItem from "./RowWarehouseItem";

const WarehouseItemTable = ({items, changedItems, change, title}) => {
    if (!items.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No any Items in Warehouse!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Item UPC</th>
                    <th>Label</th>
                    <th>Item Category</th>
                    <th>Placed Units</th>
                    <th>Price</th>
                    <th>Count in Warehouse</th>
                    <th>Is Enabled</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) =>
                    <RowWarehouseItem item={item} changedItems={changedItems} change={change} key={item.item.id}/>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default WarehouseItemTable;