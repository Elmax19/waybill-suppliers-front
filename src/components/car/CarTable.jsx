import React from 'react';
import CarRow from "./CarRow";

const CarTable = ({cars, changeRemoveList}) => {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <td>Car number</td>
                <td>Last location</td>
                <td>Available/total capacity</td>
                <td>Delete</td>
            </tr>
            </thead>
            <tbody>
            {
                cars.map(c =>
                    <CarRow key={c.id} car={c}
                            changeRemoveList={changeRemoveList}
                    />
                )
            }
            </tbody>
        </table>
    );
};

export default CarTable;