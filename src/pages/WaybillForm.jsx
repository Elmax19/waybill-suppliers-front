import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ApplicationInWaybillTable from "../components/waybill/ApplicationInWaybillTable";
import CustomButton from "../components/UI/button/CustomButton";
import StateBean from "../components/waybill/StateBean";
import ApplicationService from "../API/ApplicationService";
import WarehouseService from "../API/WarehouseService";
import EmployeeService from "../API/EmployeeService";
import WaybillService from "../API/WaybillService";
import CarService from "../API/CarService";
import '../styles/waybill.css'
import Select from "../components/waybill/Select";

const WaybillForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    let [waybill, setWaybill] = useState({
        id: undefined,
        creator: undefined,
        lastUpdater: undefined,
        registrationTime: undefined,
        lastUpdateTime: undefined,
        driver: undefined
    });
    let [state, setState] = useState('OPEN');
    let [number, setNumber] = useState('');

    let [curWarehouse, setCurWarehouse] = useState();
    let [curCar, setCurCar] = useState();
    let [curDriver, setCurDriver] = useState(0);

    let [wblItemsAmount, setWblItemsAmount] = useState(0);
    let [wblUnitsAmount, setWblUnitsAmount] = useState(0);
    let [wblTotalCost, setWblTotalCost] = useState(0);

    let [warehousesOptions, setWarehousesOptions] = useState([]);
    let [carsOptions, setCarsOptions] = useState([]);
    let [driversOptions, setDriversOptions] = useState([]);
    let [applicationsOptions, setApplicationsOptions] = useState([]);

    let [validForm, setValidForm] = useState(false);

    let waybillSpecificApplicationsOptions = useRef([]);

    useEffect(() => {
        Promise.all([
            fetchWarehouses(),
            fetchCars(),
            fetchDrivers()
        ]).then(() => fetchWaybill());
    }, []);

    useEffect(() => {
        if (!waybill.id) return;

        setState(waybill.state);
        setNumber(waybill.number);

        let warehouse = waybill.warehouse;
        if (!warehousesOptions.find(w => w.id === warehouse.id)) {
            setWarehousesOptions([...warehousesOptions, {
                id: warehouse.id,
                value: warehouse.id,
                name: warehouse.name
            }]);
        }
        setCurWarehouse(waybill.warehouse.id);

        if (waybill.car) {
            setCurCar(waybill.car.id);
        }

        let driver = waybill.driver;
        if (driver) {
            if (!driversOptions.find(d => d.id === driver.id)) {
                setDriversOptions([...driversOptions, {
                    id: driver.id,
                    value: driver.id,
                    name: `${driver.contactInformation.name} ${driver.contactInformation.surname}`
                }]);
            }
            setCurDriver(waybill.driver.id);
        }

        waybillSpecificApplicationsOptions.current = waybill.applicationRecords.map(a => mapApplicationToOption(a));
        fetchApplications();
    }, [waybill]);

    useEffect(() => updateWaybillSummaries(), [applicationsOptions]);

    useEffect(() => {
        fetchApplications();
        setWblItemsAmount(0);
        setWblUnitsAmount(0);
        setWblTotalCost(0);
    }, [curWarehouse]);

    useEffect(() => {
        fetchCars();
    }, [wblUnitsAmount]);

    useEffect(() => {
        let chosenApplicationsAmount = applicationsOptions.filter(a => a.sequenceNumber !== 0).length;
        setValidForm(number.length > 3
            && chosenApplicationsAmount >= 1
            && curWarehouse
            && curCar
            && (state === 'OPEN' || state === 'READY'));
    }, [number, applicationsOptions, curWarehouse, curCar]);

    const [fetchWarehouses, isWarehousesLoading, warehouseError] = useFetching(async () => {
        let resp = await WarehouseService.getAllWithOpenApplications();
        let warehouses = resp.data;
        if (!warehouses.length) return;

        setWarehousesOptions(warehouses
            .filter(w => w)
            .map(w => {
                    return {
                        id: w.id,
                        value: w.id,
                        name: w.name
                    }
                }
            )
        );
        setCurWarehouse(warehouses[0].id);
    });

    const [fetchCars, isCarsLoading, carError] = useFetching(async () => {
        let resp = await CarService.getAllWithMinCapacity(wblUnitsAmount);
        let cars = resp.data;
        if (!cars.length) {
            setCarsOptions([]);
            setCurCar(undefined);
            return;
        }

        setCarsOptions(cars
            .filter(c => c)
            .map(c => {
                    return {
                        id: c.id,
                        value: c.id,
                        name: `${c.carNumber} (${c.totalCapacity})`
                    }
                }
            )
        );
        setCurCar(cars[0].id);
    });

    const [fetchDrivers, isDriversLoading, driverError] = useFetching(async () => {
        let resp = await EmployeeService.getAllFreeDrivers();
        let drivers = resp.data;
        let initialOption = {
            id: 0,
            value: 0,
            name: 'Choose driver...'
        };

        if (!drivers.length) {
            setDriversOptions([initialOption]);
        } else {
            setDriversOptions([initialOption, ...(drivers
                    .filter(d => d)
                    .map(d => {
                            return {
                                id: d.id,
                                value: d.id,
                                name: `${d.contactInformation.name} ${d.contactInformation.surname}`
                            }
                        }
                    )
            )]);
        }
        setCurDriver(0);
    });

    const [fetchApplications, isApplicationsLoading, applicationError] = useFetching(async () => {
        let resp = await ApplicationService.getAllOutgoingOpen(curWarehouse);

        let data = [];
        for (let i = 0; i < resp.data.length; i++) {
            data.push(mapApplicationToOption(resp.data[i]));
        }
        if (waybill.warehouse && waybill.warehouse.id === curWarehouse) {
            for (let i = 0; i < waybillSpecificApplicationsOptions.current.length; i++) {
                data.push(waybillSpecificApplicationsOptions.current[i]);
            }
        }
        setApplicationsOptions(data);
        /*setApplicationsOptions([
            ...(resp.data
                .filter(a => a)
                .map(a => mapApplicationToOption(a))),
            ...(waybill.warehouse && waybill.warehouse.id === curWarehouse
                ? waybillSpecificApplicationsOptions.current
                : [])
        ]);*/
    });

    const [fetchWaybill, isWaybillLoading, waybillError] = useFetching(async () => {
        let waybillId = searchParams.get('id');
        let resp = await WaybillService.getById(waybillId);
        setWaybill(resp.data);
    });

    const mapApplicationToOption = (a) => {
        let itemsAmount = 0;
        let unitsAmount = 0;
        let totalCost = 0;

        a.items.forEach(i => {
            itemsAmount += i.count;
            unitsAmount += i.count * i.item.units;
            totalCost += i.price;
        });

        itemsAmount = twoDigitRound(itemsAmount)
        unitsAmount = twoDigitRound(unitsAmount);
        totalCost = twoDigitRound(totalCost);

        let address = a.destinationAddress;
        let addressString =
            [address.firstAddressLine, address.secondAddressLine, address.city, address.state].join(', ');

        return {
            id: a.id,
            value: a.id,
            name: a.number,
            sequenceNumber: a.sequenceNumber || 0,
            destination: addressString,
            itemsAmount: itemsAmount,
            unitsAmount: unitsAmount,
            totalCost: totalCost
        }
    };

    const chooseApplication = (chosenId, rowId) => {
        let chosenApplication = applicationsOptions.find(a => a.id === Number(chosenId));
        if (!chosenApplication) {
            removeApplication(rowId);
            return;
        }

        if (rowId) {
            let currentApplication = applicationsOptions.find(a => a.sequenceNumber === rowId);
            currentApplication.sequenceNumber = 0;
        } else {
            let chosenApplicationsAmount = applicationsOptions.filter(a => a.sequenceNumber !== 0).length;
            rowId = chosenApplicationsAmount + 1;
        }
        chosenApplication.sequenceNumber = rowId;

        setApplicationsOptions([...applicationsOptions]);
    }

    const removeApplication = (rowId) => {
        let applicationToRemove = applicationsOptions.find(a => a.sequenceNumber === rowId);
        let chosenApplicationsAmount = applicationsOptions.filter(a => a.sequenceNumber !== 0).length;
        applicationToRemove.sequenceNumber = 0;

        for (let i = rowId; i < chosenApplicationsAmount; i++) {
            let nextApplication = applicationsOptions.find(a => a.sequenceNumber === i + 1);
            nextApplication.sequenceNumber = i;
        }

        setApplicationsOptions([...applicationsOptions]);
    }

    const updateWaybillSummaries = () => {
        let curWblItemsAmount = 0;
        let curWblUnitsAmount = 0;
        let curWblTotalCost = 0;

        applicationsOptions
            .filter(a => a.sequenceNumber !== 0)
            .forEach(a => {
                curWblItemsAmount += a.itemsAmount;
                curWblUnitsAmount += a.unitsAmount;
                curWblTotalCost += a.totalCost;
            });

        setWblItemsAmount(twoDigitRound(curWblItemsAmount));
        setWblUnitsAmount(twoDigitRound(curWblUnitsAmount));
        setWblTotalCost(twoDigitRound(curWblTotalCost));
    }

    const formatTimestamp = (timestamp) => {
        return timestamp && timestamp.replace('T', ' ').substring(0, 16);
    }

    const setFormattedNumber = (number) => {
        setNumber(number.length > 15
            ? number.substr(0, 15)
            : number);
    }

    const twoDigitRound = (number) => {
        return Math.round(number * 100) / 100;
    }

    let error = warehouseError || carError || driverError || applicationError || waybillError;
    const isLoading = isWarehousesLoading
        || isCarsLoading
        || isDriversLoading
        || isApplicationsLoading
        || isWaybillLoading;
    const disabled = waybill.state === 'IN_PROGRESS' || waybill.state === 'FINISHED';

    const saveWaybill = (state) => {
        let chosenApplicationsAmount = applicationsOptions.filter(a => a.sequenceNumber !== 0).length;
        if (!(number.length > 3
            && chosenApplicationsAmount >= 1
            && curWarehouse
            && curCar
            && (state === 'OPEN' || state === 'READY'))) {
            alert('Please, check, if all fields are correct');
        }
        WaybillService.save(
            waybill.id,
            number,
            curWarehouse,
            applicationsOptions,
            curCar,
            curDriver || null,
            state,
            waybill.warehouse
        ).then(() => setTimeout(() => navigate('/waybills'), 250));
    }

    const deleteWaybill = () => WaybillService.delete(waybill.id)
        .then(() => setTimeout(() => navigate('/waybills'), 250));

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-8 d-flex align-items-center">
                    {isLoading &&
                        <div className="spinner-border text-primary me-1" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    <h1 className="d-inline me-2">Waybill #{number}</h1>
                    <StateBean state={state}/>
                </div>
                {waybill.creator &&
                    <div className="col">
                        <h5 style={{
                            color: 'var(--bs-gray)',
                            textAlign: 'right'
                        }}>Created by {waybill.creator.contactInformation.name}&nbsp;
                            at {formatTimestamp(waybill.registrationTime)}</h5>
                        <h5 style={{
                            color: 'var(--bs-gray)',
                            textAlign: 'right'
                        }}>Last updated by {waybill.lastUpdater.contactInformation.name}&nbsp;
                            at {formatTimestamp(waybill.lastUpdateTime)}</h5>
                    </div>
                }
            </div>
            {/*<div className="row mt-3">
                <div className="col">
                    <iframe allowFullScreen frameBorder="0" title='waybill-map'
                            src="https://cdn.bootstrapstudio.io/placeholders/map.html" width="100%"
                            height="400"/>
                </div>
            </div>*/}
            <div className="row">
                <div className="col">
                    <form id="waybill-form">
                        {!warehousesOptions.length && !isLoading
                            && <h6 className='text-danger text-center mt-2'>No warehouses with open
                                applications!</h6>}
                        <div className="row mt-3">
                            <div className="col">
                                <div className="input-group"><span className="input-group-text">Waybill #</span>
                                    <input className="form-control" type="text" value={number} disabled={disabled}
                                           onChange={e => setFormattedNumber(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group"><span
                                    className="input-group-text">Warehouse</span>
                                    <Select disabled={disabled} options={warehousesOptions} value={curWarehouse}
                                            onChange={setCurWarehouse}/>
                                </div>
                            </div>
                        </div>
                        <ApplicationInWaybillTable
                            applicationsOptions={applicationsOptions}
                            onSelect={chooseApplication}
                            onRemove={removeApplication}
                            wblPcsAmount={wblItemsAmount}
                            wblUnitAmount={wblUnitsAmount}
                            wblTotalCost={wblTotalCost}
                            disabled={disabled}/>
                        <div className="row mt-1">
                            <div className="col">
                                <div className="input-group"><span
                                    className="input-group-text">Car</span>
                                    <Select options={carsOptions} value={curCar}
                                            onChange={setCurCar} disabled={disabled || !carsOptions.length}/>
                                </div>
                                {!carsOptions.length && !isLoading
                                    && <h6 className='text-danger text-center mt-2'>
                                        No cars with needed capacity
                                    </h6>}
                            </div>
                            <div className="col">
                                <div className="input-group visually-hidden"><span
                                    className="input-group-text">Driver</span>
                                    <Select options={driversOptions} value={curDriver}
                                            onChange={setCurDriver} disabled={disabled}/>
                                </div>
                                {/*{driversOptions.length === 1 && !isLoading
                                    && <h6 className='text-secondary text-center mt-2'>
                                        No available drivers
                                    </h6>}*/}
                            </div>
                        </div>
                        <div id='waybill-button-bar' className="btn-group d-flex mt-3 mb-5"
                             role="group">
                            <CustomButton onClick={() => deleteWaybill()} styleType='danger' icon='trash-o'
                                          disabled={state === 'IN_PROGRESS' || !waybill.id}>
                                Delete waybill
                            </CustomButton>
                            <CustomButton onClick={() => navigate('/waybills')}
                                          styleType='warning' icon='close'>
                                Cancel changes
                            </CustomButton>
                            <CustomButton onClick={() => saveWaybill('OPEN')}
                                          disabled={!validForm} styleType='primary' icon='inbox'>
                                Save with OPEN state
                            </CustomButton>
                            <CustomButton onClick={() => saveWaybill('READY')}
                                          disabled={!validForm} styleType='info' icon='tasks'>
                                Save with READY state
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WaybillForm;