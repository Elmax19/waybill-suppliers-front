import React from 'react';
import Select from "../UI/select/Select";
import ApplicationInWaybillTableRow from "./ApplicationinWaybillTableRow";

const ApplicationInWaybillTable = (props) => {
    let initialOption = {
        id: 0,
        value: 0,
        name: 'Select...',
        sequenceNumber: 0
    }
    let applicationsOptionsList = [initialOption, ...props.applicationsOptions];
    let availableApplicationsOptionsList = applicationsOptionsList.filter(a => a && a.sequenceNumber === 0);
    let chosenApplicationsOptionsList = applicationsOptionsList.filter(a => a && a.sequenceNumber !== 0);

    return (
        <div className="table-responsive mt-3">
            <table className="table" id='waybill-form'>
                <thead>
                <tr>
                    <th style={{width: '4%'}}/>
                    <th>Application #</th>
                    <th>Destination address</th>
                    <th>Items amount</th>
                    <th>Units amount</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>
                {chosenApplicationsOptionsList
                    .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
                    .map((a, index) => {
                        let thisApplication = chosenApplicationsOptionsList.find(a => a.sequenceNumber === index + 1);
                        let thisApplicationsSelectList = [...availableApplicationsOptionsList, thisApplication];
                        return <ApplicationInWaybillTableRow
                            key={a.id}
                            rowId={index + 1}
                            application={a}
                            applicationsSelectList={thisApplicationsSelectList}
                            onSelect={props.onSelect}
                            onRemove={props.onRemove}
                            disabled={props.disabled}/>;
                    })}
                {availableApplicationsOptionsList.length !== 1 && !props.disabled &&
                    <tr>
                        <td/>
                        <td>
                            <Select options={availableApplicationsOptionsList}
                                    onChange={chosenId => props.onSelect(chosenId)}/>
                        </td>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                    </tr>}
                </tbody>
                <tfoot>
                <tr>
                    <td/>
                    <td/>
                    <td/>
                    <td><strong>{props.wblPcsAmount}</strong></td>
                    <td><strong>{props.wblUnitAmount}</strong></td>
                    <td><strong>{props.wblTotalCost}</strong></td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ApplicationInWaybillTable;