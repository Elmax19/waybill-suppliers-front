import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const CustomerRow = (props) => {


    return (
        <tr>
            <td>
                {props.customer.name}
            </td>
            <td>
                {props.customer.registrationDate}
            </td>
            <td>
                {props.customer.activeStatus}
            </td>
            <td>
                {props.customer.employees[0].contactInformation.email}
            </td>
            <td>
                <CheckBox key={props.customer.id} onChange={(e) => props.select(props.customer, e.target.checked)}/>
            </td>
        </tr>
    );
};

export default CustomerRow;