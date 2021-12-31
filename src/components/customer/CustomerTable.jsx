import React from 'react';
import CustomerRow from "./CustomerRow";

const CustomerTable = ({customers, selectCustomer}) => {



    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <td>Name</td>
                <td>Registration date</td>
                <td>Status</td>
                <td>Email</td>
                <td>Disable/Enable</td>
            </tr>
            </thead>
            <tbody>
            {
                customers.map(c =>
                    <CustomerRow key={c.id} customer={c} select={selectCustomer}/>
                )
            }

            </tbody>
        </table>
    );
};

export default CustomerTable;