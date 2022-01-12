import React, {useEffect, useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";
import CheckBox from "../UI/input/CheckBox";
import Map from "../../maps/Map";
import ApplicationItemTable from "./ApplicationItemTable";
import ApplicationService from "../../API/ApplicationService";
import {geocodeByAddress} from "react-google-places-autocomplete";
import {getDistance} from "geolib";

const ApplicationForm = ({
                             application,
                             setApplication,
                             applicationAddress,
                             setAddress,
                             create,
                             warehouses,
                             searchScope,
                             warehouseOptions,
                             isNew,
                             updateAddress,
                             allItems,
                             defaultItem,
                             itemOptions
                         }) => {
    const [errorMsg, setError] = useState('')
    const [countOfItems, setCount] = useState(0)
    const [countOfPlacedUnits, setUnits] = useState(0)
    const [stateTax, setTax] = useState(0)

    const calculate = () => {
        setCount(application.items.reduce((sum, item) => sum + Number(item.count), 0))
        setUnits(application.items.reduce((sum, item) => sum + item.item.units * Number(item.count), 0))
    }

    function extractFromAddress(components, type) {
        for (let i = 0; i < components.length; i++)
            for (let j = 0; j < components[i].types.length; j++)
                if (components[i].types[j] === type) return components[i].long_name;
        return "";
    }

    function getWarehouseCoords(isNew) {
        let warehouse
        if (isNew) {
            warehouse = warehouses.filter(warehouse => warehouse.id === Number(sessionStorage.getItem('warehouseId')))[0]
        } else {
            warehouse = application.warehouse
        }
        return geocodeByAddress(warehouse.address.firstAddressLine + ', ' + warehouse.address.city + ', '
            + warehouse.address.state + ' ' + warehouse.address.secondAddressLine + ', USA')
    }

    function getSecondCoords() {
        if (applicationAddress.formatted_address === ' ') {
            return getWarehouseCoords()
        }
        return geocodeByAddress(applicationAddress.formatted_address)
    }

    const changeAddress = (address) => {
        setApplication({
            ...application, destinationAddress: {
                state: extractFromAddress(address.address_components, 'administrative_area_level_1'),
                city: extractFromAddress(address.address_components, 'locality'),
                firstAddressLine: extractFromAddress(address.address_components, 'street_number')
                    + ' ' + extractFromAddress(address.address_components, 'route'),
                secondAddressLine: extractFromAddress(address.address_components, 'postal_code'),
            }
        })
    }

    const reCalcPrices = () => {
        getWarehouseCoords(isNew).then(results => {
            let from = {
                latitude: results[0].geometry.location.lat(),
                longitude: results[0].geometry.location.lng()
            }
            getSecondCoords().then(results => {
                let to = {
                    latitude: results[0].geometry.location.lat(),
                    longitude: results[0].geometry.location.lng()
                }
                let distance = getDistance(from, to)
                reCalcItemsPrices(distance)
                setItems([...application.items])
            })
        })
    }

    function reCalcItemsPrices(distance) {
        for (let item of application.items) {
            item.price = calcPrice(item, distance)
        }
    }

    function calcPrice(item, distance) {
        return Math.round((item.item.price * item.count * (1 + stateTax / 100) + (distance / 1000 * item.item.itemCategory.taxRate)) * 100) / 100
    }

    const setItems = (items) => {
        setApplication({...application, items: items})
    }

    useEffect(() => {
        calculate()
        updateAddress(application.destinationAddress)
    }, [application])

    useEffect(() => {
        if (application.destinationAddress.state === '') {
            setTax(0)
        } else {
            ApplicationService.getTax(application.destinationAddress.state).then(response => {
                setTax(response.data)
            })
        }
        if (application.warehouse.address.state !== '') {
            reCalcPrices()
        }
    }, [applicationAddress])

    const addNewApplication = (e) => {
        e.preventDefault()
        if (Number(application.number) < 1 || Number(application.number) > 1000) {
            setError('Invalid Number (from 1 to 999)')
        } else if (Number(countOfItems) === 0) {
            setError('Add minimum 1 Item')
        } else if (applicationAddress.formatted_address === ', ,  , USA') {
            setError('Set destination address')
        } else if (errorMsg !== 'Address should by from USA' && errorMsg !== 'Enter existing Address') {
            setError('')
            if (isNew) {
                application.warehouse = warehouses.filter(warehouse => warehouse.id === Number(sessionStorage.getItem('warehouseId')))[0]
            }
            create(application)
        }
    }

    if (application.status === 'FINISHED_PROCESSING' || searchScope === 'customer') {
        return (
            <form>
                <div className="col">
                    <div className="row">
                        <h1 className='text-center'>Application Info</h1>
                    </div>
                    <hr/>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Application
                            number: {application.number}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name"
                               className="col-form-label">Warehouse: {application.warehouse.name}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Application
                            address: {applicationAddress.formatted_address}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Created
                            by: <i>{application.creatingUser.contactInformation.name} {application.creatingUser.contactInformation.surname}</i> at <i>{application.registrationDateTime}</i></label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Last Updated
                            by: <i>{application.updatingUser.contactInformation.name} {application.updatingUser.contactInformation.surname}</i> at <i>{application.lastUpdateDateTime}</i></label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Application
                            Status: {application.status}</label>
                    </div>
                </div>
                <div className='row'>
                    <ApplicationItemTable items={application.items} allItems={allItems} setItems={setItems}
                                          defaultItem={defaultItem} itemOptions={itemOptions} stateTax={stateTax}
                                          setError={setError} warehouseAddress={getWarehouseCoords}
                                          secondAddress={getSecondCoords} searchScope={searchScope}/>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total
                            Price: {Math.round(application.items.reduce((sum, item) => sum + item.price, 0) * 100) / 100}$</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total Amount of
                            Items: {countOfItems}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total Number of
                            Units: {countOfPlacedUnits}</label>
                    </div>
                </div>
                <hr/>
            </form>
        );
    } else {
        return (
            <form>
                <div className="col">
                    <div className="row">
                        <h1 className='text-center'>Application Form</h1>
                    </div>
                    <hr/>
                    {
                        errorMsg && <div className="row justify-content-center">
                            <div className='alert alert-warning'>{errorMsg}</div>
                        </div>
                    }
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Application number:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={application.number}
                            onChange={e => setApplication({...application, number: e.target.value})}
                            type="number"
                            placeholder="Application number"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Warehouse:</label>
                    </div>
                    {isNew
                        ?
                        <div className="col">
                            {warehouses.filter(warehouse => warehouse.id === Number(sessionStorage.getItem('warehouseId')))[0].name}
                        </div>
                        :
                        <div className="col">
                            <Select
                                value={application.warehouse.name}
                                onChange={e => setApplication({
                                    ...application,
                                    warehouse: warehouses.filter(warehouse => warehouse.name === e)[0]
                                })}
                                options={warehouseOptions}
                            />
                        </div>
                    }
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Application address:</label>
                    </div>
                    <div className="col">
                        <Map address={applicationAddress} setAddress={changeAddress} setError={setError}/>
                        <Input
                            value={applicationAddress.formatted_address === ', ,  , USA' ? '' : applicationAddress.formatted_address}
                            onChange={e => setAddress({...applicationAddress, formatted_address: e.target.value})}
                            placeholder="address"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Created
                            by: <i>{application.creatingUser.contactInformation.name} {application.creatingUser.contactInformation.surname}</i> at <i>{application.registrationDateTime}</i></label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Last Updated
                            by: <i>{application.updatingUser.contactInformation.name} {application.updatingUser.contactInformation.surname}</i> at <i>{application.lastUpdateDateTime}</i></label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Application
                            Status: {application.status}</label>
                    </div>
                </div>
                <div className='row'>
                    <ApplicationItemTable items={application.items} allItems={allItems} setItems={setItems}
                                          defaultItem={defaultItem} itemOptions={itemOptions} stateTax={stateTax}
                                          setError={setError} warehouseAddress={getWarehouseCoords} isNew={isNew}
                                          secondAddress={getSecondCoords} searchScope={searchScope}/>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total
                            Price: {Math.round(application.items.reduce((sum, item) => sum + item.price, 0) * 100) / 100}$</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total Amount of
                            Items: {countOfItems}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Total Number of
                            Units: {countOfPlacedUnits}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Is Outgoing Units: {isNew
                            ?
                            <CheckBox
                                style={{minWidth: '0'}}
                                checked={application.outgoing}
                                onChange={e => {
                                    setApplication({...application, outgoing: e.target.checked})
                                }}
                            />
                            :
                            <CheckBox
                                style={{minWidth: '0'}}
                                checked={application.outgoing}
                            />
                        }
                        </label>
                    </div>
                </div>
                <hr/>
                <div className='row justify-content-center'>
                    <Button id='formButton' onClick={addNewApplication}>Save</Button>
                </div>
            </form>
        );
    }
}


export default ApplicationForm;