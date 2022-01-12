import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import Select from "../components/UI/select/Select";
import ApplicationTable from "../components/application/ApplicationTable";
import ApplicationService from "../API/ApplicationService";
import {getPageCount} from "../utils/pages";
import Modal from "../components/UI/modal/Modal";
import ApplicationForm from "../components/application/ApplicationForm";
import WarehouseService from "../API/WarehouseService";
import ItemService from "../API/ItemsService";
import Button from "../components/UI/button/Button";

function ApplicationManagement({searchScope}) {
    const [applications, setApplications] = useState([])
    const [warehouses, setWarehouses] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [modal, setModal] = useState(false)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [warehouseOptions, setOptions] = useState([])
    const [status, setStatus] = useState('ALL')
    const [isNewApplication, setIsNew] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [itemOptions, setItemOptions] = useState([])
    const [defaultApplicationItem, setDefaultItem] = useState({value: '', count: 0})
    const [newApplications, setNewApplications] = useState(0)
    const [address, setAddress] = useState({formatted_address: ' '})
    const [acceptedItems, setAcceptedItems] = useState(0)
    const defaultApplication = {
        number: 1,
        warehouse: {
            name: '',
            address: {
                state: '',
                city: '',
                firstAddressLine: '',
                secondAddressLine: ''
            },
            type: '',
            totalCapacity: 1,
            availableCapacity: 1,
            customerId: sessionStorage.getItem('customerId')
        },
        destinationAddress: {
            state: '',
            city: '',
            firstAddressLine: '',
            secondAddressLine: ''
        },
        registrationDateTime: new Date().toISOString(),
        lastUpdateDateTime: new Date().toISOString(),
        creatingUser: JSON.parse(sessionStorage.getItem('auth')),
        updatingUser: JSON.parse(sessionStorage.getItem('auth')),
        status: 'OPEN',
        outgoing: true,
        items: []
    }
    const [formApplication, setFormApplication] = useState({...defaultApplication})

    const [fetchApplications, isApplicationsLoading, applicationError] = useFetching(async (limit, page) => {
        setModal(false)
        let applicationsResponse = await ApplicationService.getAll(searchScope, limit, page, status)
        let countResponse = await ApplicationService.getCountByWarehouse(searchScope, status)
        let warehousesResponse = await WarehouseService.getAll()
        setWarehouses([...warehousesResponse.data])
        if (searchScope === 'warehouse') {
            setFormApplication({
                ...formApplication,
                warehouse: warehousesResponse.data.filter(warehouse => warehouse.id === Number(sessionStorage.getItem('warehouseId')))[0]
            })
            let allItemsResponse = await ItemService.getAllItems()
            let itemOptions = []
            for (let item of allItemsResponse.data) {
                itemOptions.push({value: item.upc, name: item.upc})
            }
            setItemOptions([...itemOptions])
            setAllItems([...allItemsResponse.data])
            setDefaultItem(itemOptions[0].value)
        }
        setApplications([...applicationsResponse.data])
        setTotalPages(getPageCount(countResponse.data, limit))
        let options = []
        for (let warehouse of warehousesResponse.data) {
            options.push({value: warehouse.name, name: warehouse.name})
        }
        setOptions(options)
    })

    const createApplication = (newApplication) => {
        ApplicationService.save(newApplication).then(() => setNewApplications(newApplications + 1))
        setModal(false)
    }

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    const updateAddress = (destinationAddress) => {
        setAddress({
            formatted_address: destinationAddress.firstAddressLine + ', ' + destinationAddress.city + ', '
                + destinationAddress.state + ' ' + destinationAddress.secondAddressLine + ', USA'
        })
    }

    const showEditForm = (application) => {
        setFormApplication({...application})
        updateAddress(application.destinationAddress)
        setIsNew(false)
        setModal(true)
    }

    useEffect(() => {
        fetchApplications(limit, page)
    }, [limit, page, status, newApplications, acceptedItems])

    return (
        <div className='container' style={{marginTop: 30}}>
            <Modal visible={modal} setVisible={setModal}>
                <ApplicationForm
                    application={formApplication} setApplication={setFormApplication} applicationAddress={address}
                    setAddress={setAddress} create={createApplication} warehouses={warehouses} searchScope={searchScope}
                    warehouseOptions={warehouseOptions} isNew={isNewApplication} updateAddress={updateAddress}
                    allItems={allItems} defaultItem={defaultApplicationItem} itemOptions={itemOptions}
                    acceptedItems={acceptedItems} setAcceptedItems={setAcceptedItems}/>
            </Modal>
            {applicationError &&
            <h1>Error: ${applicationError}</h1>
            }
            {isApplicationsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <ApplicationTable applications={applications} edit={showEditForm} title="Applications:"
                                    searchScope={searchScope}/>
            }
            <div className="container">
                {searchScope === 'warehouse'
                    ? <div>
                        <Button style={{height: 'fit-content', float: 'right'}} onClick={() => {
                            setFormApplication({...defaultApplication})
                            setIsNew(true)
                            setModal(true)
                        }}>
                            Create new Application
                        </Button>
                        <div style={{float: 'right'}}>
                            <Select
                                value={status}
                                onChange={value => {
                                    setStatus(value)
                                    setPage(1)
                                }}
                                options={[
                                    {value: 'ALL', name: 'show all applications'},
                                    {value: 'OUTGOING', name: 'only outgoing'},
                                    {value: 'INCOMING', name: 'only incoming'}
                                ]}
                            />
                        </div>
                    </div>
                    : ''
                }
                <div style={{float: 'right'}}>
                    <Select
                        value={limit}
                        onChange={value => {
                            setLimit(value)
                            setPage(1)
                        }}
                        options={[
                            {value: 10, name: '10'},
                            {value: 20, name: '20'}
                        ]}
                    />
                </div>
            </div>
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default ApplicationManagement;