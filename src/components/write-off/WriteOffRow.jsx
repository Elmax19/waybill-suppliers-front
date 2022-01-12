import React from 'react';

const WriteOffItemRow = ({writeOff, showModal, searchScope}) => {
    return (
        <tr onClick={() => showModal(writeOff.writeOffItems)}>
            <td>{writeOff.id}</td>
            <td>{writeOff.dateTime}</td>
            <td>{writeOff.writeOffItems.reduce((sum, writeOff) => sum + writeOff.amount, 0)}</td>
            <td>{writeOff.writeOffItems.length}</td>
            <td>{writeOff.creatingUserId}</td>
            {
                searchScope !== 'car'
                    ? <td>{writeOff.warehouseId}</td>
                    : ''
            }
            {
                searchScope !== 'warehouse'
                    ? <td>{writeOff.carId}</td>
                    : ''
            }
        </tr>
    );
};

export default WriteOffItemRow;