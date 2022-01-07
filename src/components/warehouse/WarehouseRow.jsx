import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const WarehouseRow = (props) => {

    function change(e) {
        props.changeRemoveList(props.warehouse, e.target.checked)
    }

    return (
        <tr>
            <td>
                {props.warehouse.name}
            </td>
            <td>
                {props.warehouse.type}
            </td>
            <td>
                <span>{props.warehouse.address.state}, {props.warehouse.address.city},</span><br/>
                <span>{props.warehouse.address.firstAddressLine}, {props.warehouse.address.secondAddressLine}</span>

            </td>
            <td>
                {props.warehouse.availableCapacity}/
                {props.warehouse.totalCapacity}
            </td>
            <td>
                <CheckBox key={props.warehouse.id} onChange={change}
                          // onChange={(e) => props.select(props.user, e.target.checked)}
                />
            </td>
        </tr>
    );
};

export default WarehouseRow;