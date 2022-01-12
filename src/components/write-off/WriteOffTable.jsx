import React from 'react';
import WriteOffRow from "./WriteOffRow";

const WriteOffTable = ({writeOffs, title, showModal, searchScope}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <td>Identifier</td>
                    <td>Date and Time</td>
                    <td>Amount of items</td>
                    <td>Sum of items</td>
                    <td>Creating User Identifier</td>
                    {
                        searchScope !== 'car'
                            ? <td>Warehouse Identifier</td>
                            : ''
                    }
                    {
                        searchScope !== 'warehouse'
                            ? <td>Car Identifier</td>
                            : ''
                    }
                </tr>
                </thead>
                <tbody>
                {
                    writeOffs.map(writeOff =>
                        <WriteOffRow key={writeOff.id} writeOff={writeOff} showModal={showModal}
                                     searchScope={searchScope}/>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default WriteOffTable;