import React from 'react';
import RowApplication from "./RowApplication";

const ApplicationTable = ({applications, edit, title, searchScope}) => {
    if (!applications.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No any Applications!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Application Number</th>
                    <th>Source Location</th>
                    <th>Destination Location</th>
                    <th>Last Update Date and Time</th>
                    <th>Last Updated By</th>
                    <th>Status</th>
                    {searchScope === 'warehouse'
                        ? <th>Is Outgoing</th>
                        : ''}
                </tr>
                </thead>
                <tbody>
                {applications.map((application) =>
                    <RowApplication application={application} edit={edit} key={application.number} searchScope={searchScope}/>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationTable;