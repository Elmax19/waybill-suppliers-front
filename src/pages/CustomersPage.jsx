import React, {useEffect, useMemo, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useFetching} from "../hooks/useFetching";
import CustomerService from "../API/CustomerService";
import CustomerTable from "../components/customer/CustomerTable";
import Loader from "../components/UI/loader/Loader";
import Button from "../components/UI/button/Button";

const CustomersPage = () => {

    const [selectedCustomers, setSelectedCustomers] = useState([])
    const [customers, setCustomers] = useState([]);
    const [changeStatusError, setChangeStatusError] = useState(false)
    const [enableState, setEnableState] = useState(true);
    const [disableBtnStatus, setDisableBtnStatus] = useState(true);
    const [fetchCustomers, isCustomersLoading, customerError] = useFetching(async () => {
        let response = await CustomerService.getAll();
        setCustomers([...response.data]);
    })

    useEffect(() => {
        console.log("fetchCustomers() works")
        fetchCustomers();
    }, [enableState])

    let selCustomers = useMemo(() => {
        console.log(selectedCustomers)
        if (!selectedCustomers.length){
            setDisableBtnStatus(true)
        } else setDisableBtnStatus(false)
        return selectedCustomers
    }, [selectedCustomers])

    function selectCustomer(selCustomer, isChecked) {
            if (isChecked) {
                setSelectedCustomers([...selectedCustomers, selCustomer])
            } else {
                setSelectedCustomers(selectedCustomers.filter(c => c.id !== selCustomer.id))
            }
        return selectedCustomers;
    }

    async function changeCustomersStatus() {
        if (enableState) {
            await CustomerService.changeActiveStatus(selCustomers, 'disable').then(resp => {
                setEnableState(false)
                setChangeStatusError(false)
            }).catch(err => {
                setChangeStatusError(true)
                console.log(err.message)
            })
        }
        else {
            await CustomerService.changeActiveStatus(selCustomers, 'enable').then(resp => {
                setEnableState(true);
                setChangeStatusError(false)
            }).catch(err => {
                setChangeStatusError(true)
                console.log(err.message)
            })
        }
    }

    return (
        <div className='container' style={{marginTop: 30}}>
            {changeStatusError && <div className="alert alert-warning">Error when try to change customers status</div>}
            {
                isCustomersLoading
                    ? <Loader/>
                    : <CustomerTable customers={customers} selectCustomer={selectCustomer}/>
            }
            <Button disabled={disableBtnStatus} style={{float: 'right'}} onClick={changeCustomersStatus}>
                Disable/Enable
            </Button>
            <Button style={{float: 'right'}}>
                New customer
            </Button>
        </div>
    );
};

export default CustomersPage;