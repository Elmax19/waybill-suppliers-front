import React from 'react';
import Button from "../UI/button/Button";
import ApplicationService from "../../API/ApplicationService";

const RowApplicationItem = ({item, isOutgoing, applicationNumber, acceptedItems, setAcceptedItems, setError}) => {
    const place = (e) => {
        e.preventDefault()
        ApplicationService.placeItems(applicationNumber(), item).then((response) => {
            setAcceptedItems(acceptedItems + 1)
        }).catch((e) => setError(e.response.data))
    }

    return (
        <tr>
            <td>{item.item.upc}</td>
            <td>{item.count}</td>
            <td>{item.price}</td>
            {(isOutgoing || Number(item.placedCount) === Number(item.count))
                ? ''
                : <td><Button style={{marginTop: 0}} id='formButton' onClick={place}>place</Button></td>
            }
        </tr>
    );
};

export default RowApplicationItem;