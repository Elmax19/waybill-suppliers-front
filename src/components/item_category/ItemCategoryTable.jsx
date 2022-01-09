import React from 'react';
import WarehouseRow from "../warehouse/WarehouseRow";
import ItemCategoryRow from "./ItemCategoryRow";

const ItemCategoryTable = ({categories, edit}) => {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <td>Category</td>
                <td>Tax rate</td>
                <td>Total items</td>
            </tr>
            </thead>
            <tbody>
            {
                categories.map(c =>
                    <ItemCategoryRow key={c.itemCategory.id} category={c} edit={edit}/>
                )
            }
            </tbody>
        </table>
    );
};

export default ItemCategoryTable;