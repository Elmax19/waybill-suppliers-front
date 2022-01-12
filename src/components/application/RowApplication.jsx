import React from 'react';
import CheckBox from "../UI/input/CheckBox";

const RowApplication = ({application, edit, searchScope}) => {
    let warehouseAddress = application.warehouse.address.state + ' ' + application.warehouse.address.city + ' '
        + application.warehouse.address.firstAddressLine + ' ' + application.warehouse.address.secondAddressLine
    let destinationAddress = application.destinationAddress.state + ' ' + application.destinationAddress.city + ' '
        + application.destinationAddress.firstAddressLine + ' ' + application.destinationAddress.secondAddressLine

    return (
        <tr>
            <td onClick={() => edit(application)}>{application.number}</td>
            {application.outgoing
                ? <td>{warehouseAddress}</td>
                : ''
            }
            <td>{destinationAddress}</td>
            {application.outgoing
                ? ''
                : <td>{warehouseAddress}</td>
            }
            <td>{application.lastUpdateDateTime}</td>
            <td>{application.updatingUser.contactInformation.name + ' ' + application.updatingUser.contactInformation.surname}</td>
            <td>{application.status}</td>
            {searchScope === 'warehouse'
                ? <td><CheckBox checked={application.outgoing}/></td>
                : ''}

        </tr>
    );
};

export default RowApplication;