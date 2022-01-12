import React from 'react';
import Select from "../UI/select/Select";
import CustomButton from "../UI/button/CustomButton";

const ApplicationInWaybillTableRow = ({rowId, application, applicationsSelectList, onSelect, onRemove}) => {
    return (
        <tr>
            <td>
                <CustomButton styleType='outline-link' icon='remove' onClick={() => onRemove(rowId)}/>
            </td>
            <td><Select options={applicationsSelectList}
                        value={application.value}
                        onChange={chosenId => onSelect(chosenId, rowId)}/></td>
            <td>{application.destination}</td>
            <td>{application.itemsAmount}</td>
            <td>{application.unitsAmount}</td>
            <td>{application.totalCost}</td>
        </tr>
    );
};

export default ApplicationInWaybillTableRow;