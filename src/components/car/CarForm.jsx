import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";
import statesOptions from "../../utils/states";

const CarForm = ({create, setModal}) => {

    const [car, setCar] = useState({
        customerId: sessionStorage.getItem('customerId'),
        carNumber: "",
        totalCapacity: 0,
        state: "",
        city: "",
        firstAddressLine: "",
        secondAddressLine: ""
    })
    const [formError, setFormError] = useState(false)

    function createCar(e) {
        e.preventDefault()
        let newCar = {
            customerId: car.customerId,
            carNumber: car.carNumber,
            totalCapacity: car.totalCapacity,
            status: "FREE",
            lastAddress: {
                state: car.state,
                city: car.city,
                firstAddressLine: car.firstAddressLine,
                secondAddressLine: car.secondAddressLine
            }
        }
        let keyIsEmpty = false;
        for (const key in car) {
            if (newCar[key] == '') keyIsEmpty = true;
        }
        if (keyIsEmpty) {
            setFormError('Some field is empty')
        } else if (car.totalCapacity <= 0){
            setFormError('Total capacity should be more than 0')
        } else {
            create(newCar)
            setCar({customerId: sessionStorage.getItem('customerId'), carNumber: "", totalCapacity: 0, state: "",
                city: "", firstAddressLine: "", secondAddressLine: ""})
            setModal(false);
            setFormError(false)
        }
    }

    return (
        <form>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Create car</h1>
                </div>
                {
                    formError &&  <div className="row justify-content-center">
                        <div className='alert alert-warning'>{formError}</div>
                    </div>
                }
                <hr/>

                <div className='row m-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Car number:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={car.carNumber}
                            placeholder='Name'
                            onChange={e => setCar({...car, carNumber: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row m-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total capacity:</label>
                    </div>
                    <div className="col">
                        <Input
                            type='number'
                            min='0'
                            value={car.totalCapacity}
                            placeholder='Total capacity'
                            onChange={e => setCar({...car, totalCapacity: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row m-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">State:</label>
                    </div>
                    <div className="col">
                        <div className="input-group">
                            <Input
                                value={car.state}
                                placeholder='State'
                                disabled
                            ></Input>
                            <Select
                                options={statesOptions}
                                    onChange={value => setCar({...car, state: value})}/>
                        </div>
                    </div>
                </div>
                <div className='row m-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">City:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={car.city}
                            placeholder='City'
                            onChange={e => setCar({...car, city: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row m-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Address line 1:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={car.firstAddressLine}
                            placeholder='Address line 1'
                            onChange={e => setCar({...car, firstAddressLine: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row m-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Address line 2:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={car.secondAddressLine}
                            placeholder='Address line 2'
                            onChange={e => setCar({...car, secondAddressLine: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <hr/>
                <div className='row justify-content-center mx-lg-5'>
                    <Button onClick={createCar}>Create</Button>
                </div>
            </div>
        </form>
    );
};

export default CarForm;