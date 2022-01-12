import React from 'react';
import CustomButton from "../UI/button/CustomButton";
import {useNavigate} from "react-router-dom";

const WaybillTable = ({waybills}) => {
    let navigate = useNavigate();

    let destinations = [];
    waybills.forEach(w => {
        let waybillDestinations = [];
        let address, addressString;
        w.applications.sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            .forEach(a => {
                address = a.destinationAddress;
                addressString = a.sequenceNumber + '. ' + [address.firstAddressLine,
                    address.secondAddressLine, address.city, address.state].join(', ');
                waybillDestinations.push({
                    id: a.id,
                    address: addressString
                });
            });
        destinations.push(waybillDestinations);
    });

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Warehouse</th>
                    <th>Destinations</th>
                    <th>Last update at</th>
                    <th>Last update by</th>
                    <th>State</th>
                </tr>
                </thead>
                <tbody>
                {waybills.map(w => <tr key={w.id}>
                    <td>
                        <CustomButton styleType='link' onClick={() => navigate(`/waybill-form?id=${w.id}`)}>
                            {w.number}
                        </CustomButton>
                    </td>
                    <td>{w.warehouse.name}</td>
                    <td>{destinations.shift().map(d => <p key={d.id}>{d.address}</p>)}</td>
                    <td>{w.lastUpdateTime.replace('T', ' ').substr(0, 16)}</td>
                    <td>{w.lastUpdater.contactInformation.name}</td>
                    <td>{w.state}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default WaybillTable;