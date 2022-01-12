import React, {useState} from 'react';
import WriteOffItemTable from "./WriteOffItemTable";
import Button from "../UI/button/Button";

const WarehouseWriteOffForm = ({create, itemOptions, allItems, defaultItem}) => {
    const [errorMsg, setError] = useState('');
    const [writeOffItems, setItems] = useState([])

    const addNewWriteOff = (e) => {
        e.preventDefault()
        if(writeOffItems.length===0){
            setError('Add minimum 1 Item')
        } else {
            setError('')
            create({
                writeOffItems: writeOffItems,
                dateTime: new Date().toISOString(),
                creatingUserId: JSON.parse(sessionStorage.getItem('auth')).id,
                warehouseId: Number(sessionStorage.getItem('warehouseId')),
                carId: null
            })
            setItems([])
        }
    }

    return (
        <form>
            <div className="col">
                <div className="row">
                    <h1 className='text-center'>Write-off act Form</h1>
                </div>
                <hr/>
                {
                    errorMsg && <div className="row justify-content-center">
                        <div className='alert alert-warning'>{errorMsg}</div>
                    </div>
                }
            </div>
            <div className='row m-1'>
                <WriteOffItemTable items={writeOffItems} setItems={setItems} itemOptions={itemOptions}
                                   allItems={allItems} defaultItem={defaultItem} setError={setError}/>
            </div>
            <div className='row m-1'>
                <label htmlFor="recipient-name" className="col-form-label">Count of Items in Write-off
                    act: {writeOffItems.reduce((sum, item) => sum + Number(item.amount), 0)}</label>
            </div>
            <div className='row m-1'>
                <Button id='formButton' onClick={addNewWriteOff}>Create Write-off act</Button>
            </div>
        </form>
    );
};

export default WarehouseWriteOffForm;