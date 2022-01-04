import React from 'react';
import CustomerRow from "../customer/CustomerRow";
import UserRow from "./UserRow";

const UsersTable = ({users, selectUser}) => {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <td>Name</td>
                <td>Birthday</td>
                <td>Role</td>
                <td>Status</td>
                <td>Disable/Enable</td>
            </tr>
            </thead>
            <tbody>
            {
                users.map(u =>
                    <UserRow key={u.id} user={u} select={selectUser}/>
                )
            }
            </tbody>
        </table>
    );
};

export default UsersTable;