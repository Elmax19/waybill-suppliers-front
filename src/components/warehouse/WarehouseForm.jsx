import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";
import statesOptions from "../../utils/states";

const WarehouseForm = ({create, setModal, setError, setSuccess}) => {

    const [warehouse, setWarehouse] = useState({
        customerId: sessionStorage.getItem('customerId'),
        name: "",
        totalCapacity: 0,
        type: "",
        state: "",
        city: "",
        firstAddressLine: "",
        secondAddressLine: ""
    })
    const [formError, setFormError] = useState(false)

    function createWarehouse(e) {
        e.preventDefault()
        let newWarehouse = {
            customerId: warehouse.customerId,
            name: warehouse.name,
            totalCapacity: warehouse.totalCapacity,
            type: warehouse.type,
            address: {
                state: warehouse.state,
                city: warehouse.city,
                firstAddressLine: warehouse.firstAddressLine,
                secondAddressLine: warehouse.secondAddressLine
            }
        }
        let keyIsEmpty = false;
        for (const key in warehouse) {
            if (warehouse[key] == '') keyIsEmpty = true;
        }
        if (keyIsEmpty) {
            setFormError('Some field is empty')
        } else if (newWarehouse.totalCapacity <= 0){
            setFormError('Total capacity should be more than 0')
        } else {
            create(newWarehouse)
            setWarehouse({customerId: sessionStorage.getItem('customerId'), name: "", totalCapacity: 0,
                type: "", state: "", city: "", firstAddressLine: "", secondAddressLine: ""})
            setModal(false);
            setFormError(false)
        }
    }

    return (
        <form>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Create warehouse</h1>
                </div>
                {
                    formError &&  <div className="row justify-content-center">
                        <div className='alert alert-warning'>{formError}</div>
                    </div>
                }
                <hr/>

                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={warehouse.name}
                            placeholder='Name'
                            onChange={e => setWarehouse({...warehouse, name: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total capacity:</label>
                    </div>
                    <div className="col">
                        <Input
                            type='number'
                            min='0'
                            value={warehouse.totalCapacity}
                            placeholder='Total capacity'
                            onChange={e => setWarehouse({...warehouse, totalCapacity: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Type:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={warehouse.type}
                            placeholder='Type'
                            onChange={e => setWarehouse({...warehouse, type: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">State:</label>
                    </div>
                    <div className="col">
                        <div className="input-group">
                            <Input
                                value={warehouse.state}
                                placeholder='State'
                                disabled
                            ></Input>
                            <Select
                                options={statesOptions}
                                onChange={value => setWarehouse({...warehouse, state: value})}/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">City:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={warehouse.city}
                            placeholder='City'
                            onChange={e => setWarehouse({...warehouse, city: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Address line 1:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={warehouse.firstAddressLine}
                            placeholder='Address line 1'
                            onChange={e => setWarehouse({...warehouse, firstAddressLine: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Address line 2:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={warehouse.secondAddressLine}
                            placeholder='Address line 2'
                            onChange={e => setWarehouse({...warehouse, secondAddressLine: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <hr/>
                <div className='row justify-content-center'>
                    <Button onClick={createWarehouse}>Create</Button>
                </div>
            </div>
        </form>
    );
};

export default WarehouseForm;