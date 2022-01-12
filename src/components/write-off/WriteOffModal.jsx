import React from 'react';
import WriteOffItemTable from "./WriteOffItemTable";

const WriteOffModal = ({items}) => {
    return (
        <form>
            <div className="col">
                <div className="row">
                    <h1 className='text-center'>Write-off act Form</h1>
                </div>
                <hr/>
            </div>
            <div className='row m-1'>
                <WriteOffItemTable items={items}/>
            </div>
            <div className='row m-1'>
                <label htmlFor="recipient-name" className="col-form-label">Count of Items in Write-off
                    act: {items.reduce((sum, item) => sum + Number(item.amount), 0)}</label>
            </div>
        </form>
    );
};

export default WriteOffModal;