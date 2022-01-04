import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const UserRow = (props) => {
    return (
        <tr>
            <td>
                {props.user.contactInformation.name} {props.user.contactInformation.surname}
            </td>
            <td>
                {props.user.contactInformation.birthday}
            </td>
            <td>
                {props.user.role}
            </td>
            <td>
                {props.user.activeStatus}
            </td>
            <td>
                <CheckBox key={props.user.id} onChange={(e) => props.select(props.user, e.target.checked)}/>
            </td>
        </tr>
    );
};

export default UserRow;