import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const CarRow = (props) => {

    function change(e) {
        props.changeRemoveList(props.car, e.target.checked)
    }

    return (
        <tr>
            <td>
                {props.car.carNumber}
            </td>
            <td>
                <span>{props.car.lastAddress.state}, {props.car.lastAddress.city},</span><br/>
                <span>{props.car.lastAddress.firstAddressLine}, {props.car.lastAddress.secondAddressLine}</span>

            </td>
            <td>
                {props.car.availableCapacity}/
                {props.car.totalCapacity}
            </td>
            <td>
                <CheckBox key={props.car.id} onChange={change}/>
            </td>
        </tr>
    );
};

export default CarRow;