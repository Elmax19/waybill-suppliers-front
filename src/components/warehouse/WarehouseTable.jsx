import React from 'react';
import UserRow from "../user/UserRow";
import WarehouseRow from "./WarehouseRow";

const WarehouseTable = ({warehouses, changeRemoveList}) => {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <td>Identifier</td>
                <td>Type</td>
                <td>Address</td>
                <td>Available/total capacity</td>
                <td>Delete</td>
            </tr>
            </thead>
            <tbody>
            {
                warehouses.map(w =>
                    <WarehouseRow key={w.id} warehouse={w}
                        changeRemoveList={changeRemoveList}
                    />
                )
            }
            </tbody>
        </table>
    );
};

export default WarehouseTable;