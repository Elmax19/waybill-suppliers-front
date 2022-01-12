import React, {useEffect, useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";
import {useFetching} from "../../hooks/useFetching";
import WarehouseService from "../../API/WarehouseService";
import statesOptions from "../../utils/states";

const UserForm = ({create, error, setError, selectedWarehouse, setSelectedWarehouse}) => {

    const [user, setUser] = useState({
        name: '',
        surname: '',
        birthday: '',
        login: '',
        email: '',
        role: 'ROLE_DIRECTOR',
        state: '',
        city: '',
        firstAddressLine: '',
        secondAddressLine: '',
    })
    const [options, setOptions] = useState([
        {value: 'ROLE_DIRECTOR', name: 'DIRECTOR'},
        {value: 'ROLE_DISPATCHER', name: 'DISPATCHER'},
        {value: 'ROLE_DRIVER', name: 'DRIVER'},
        {value: 'ROLE_LOGISTICS_SPECIALIST', name: 'LOGISTICS SPECIALIST'}
    ])
    const [isDispatcher, setIsDispatcher] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [optWarehouses, setOptWarehouses] = useState([])
    const [fetchWarehouses, isWarehousesLoading, warehousesError] = useFetching(async () => {
        let response = await WarehouseService.getAll();
        setWarehouses([...response.data]);
        if (response.data){
            setSelectedWarehouse(response.data[0].id)
        }
    })

    useEffect(() => {
        fetchWarehouses();
        let opt = []
        warehouses.forEach(wh => {
            opt.push({value: wh.id, name: wh.name})
        })
        setOptWarehouses(opt)
    }, [isDispatcher])

    function addNewUser(e) {
        e.preventDefault();
        let keyIsEmpty = false;
        for (const key in user) {
            if (user[key] == '') keyIsEmpty = true;
        }
        if (keyIsEmpty) {
            setError('Some field is empty')
        } else if (selectedWarehouse == null && user.role == 'ROLE_DISPATCHER') {
            setError('Choose a warehouse')
        } else {
            let newUser = {
                role: user.role,
                login: user.login,
                contactInformation: {
                    name: user.name,
                    surname: user.surname,
                    birthday: user.birthday,
                    email: user.email,
                    address: {
                        state: user.state,
                        city: user.city,
                        firstAddressLine: user.firstAddressLine,
                        secondAddressLine: user.secondAddressLine
                    }
                }
            }
            create(newUser)
            setUser({
                name: '', surname: '', birthday: '', login: '', email: '',
                role: 'ROLE_DIRECTOR', state: '', city: '', firstAddressLine: '', secondAddressLine: '',
            })
        }
    }

    return (
        <form>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Create user</h1>
                </div><hr/>
                {
                    error && <div className="row justify-content-center">
                        <div className='alert alert-warning'>{error}</div>
                    </div>
                }
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={user.name}
                            placeholder='Name'
                            onChange={e => setUser({...user, name: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Surname:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={user.surname}
                            placeholder='Surname'
                            onChange={e => setUser({...user, surname: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Birthday:</label>
                    </div>
                    <div className="col">
                        <Input
                            type='date'
                            value={user.birthday}
                            onChange={e => setUser({...user, birthday: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Login:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={user.login}
                            placeholder='Login'
                            onChange={e => setUser({...user, login: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={user.email}
                            placeholder='Email'
                            onChange={e => setUser({...user, email: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Role:</label>
                    </div>
                    <div className="col">
                        <Select
                            options={options}
                            // value={options[0].value}
                            onChange={value => {
                                setUser({...user, role: value})
                                if (value == 'ROLE_DISPATCHER') {
                                    console.log('change role')
                                    setIsDispatcher(true)
                                } else setIsDispatcher(false)
                            }} //edit
                        ></Select>
                    </div>
                </div>
                {
                    isDispatcher
                        ? <div className='row'>
                            <div className="col">
                                <label htmlFor="recipient-name" className="col-form-label">Warehouse:</label>
                            </div>
                            <div className="col">
                                <Select
                                    options={optWarehouses}
                                    // value={options[0].value}
                                    onChange={value => setSelectedWarehouse(value)} //edit
                                ></Select>
                            </div>
                        </div>
                        : <></>
                }
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">State:</label>
                    </div>
                    <div className="col">
                        <div className="input-group">
                            <Input
                                value={user.state}
                                placeholder='State'
                                disabled
                            ></Input>
                            <Select
                                options={statesOptions}
                                onChange={value => setUser({...user, state: value})}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">City:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={user.city}
                            placeholder='City'
                            onChange={e => setUser({...user, city: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Address line 1:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={user.firstAddressLine}
                            placeholder='First address line'
                            onChange={e => setUser({...user, firstAddressLine: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Address line 2:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={user.secondAddressLine}
                            placeholder='Second address line'
                            onChange={e => setUser({...user, secondAddressLine: e.target.value})}
                        ></Input>
                    </div>
                </div><hr/>
                <div className='row justify-content-center'>
                    <Button
                        onClick={addNewUser}>Create
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UserForm;