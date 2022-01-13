import React from 'react';

import CustomButton from "../UI/button/CustomButton";
import Select from "./Select";

const ApplicationInWaybillTableRow = ({rowId, application, applicationsSelectList, onSelect, onRemove, disabled}) => {
    return (
        <tr>
            <td>
                {!disabled &&
                    <CustomButton styleType='outline-link' icon='remove' onClick={() => onRemove(rowId)}/>}
            </td>
            <td>{disabled
                ? application.value
                : <Select options={applicationsSelectList}
                          value={application.value}
                          onChange={chosenId => onSelect(chosenId, rowId)}/>
            }</td>
            <td>{application.destination}</td>
            <td>{application.itemsAmount}</td>
            <td>{application.unitsAmount}</td>
            <td>{application.totalCost}</td>
        </tr>
    );
};

export default ApplicationInWaybillTableRow;