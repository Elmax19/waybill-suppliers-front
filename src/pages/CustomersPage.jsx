import React, {useEffect, useMemo, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useFetching} from "../hooks/useFetching";
import CustomerService from "../API/CustomerService";
import CustomerTable from "../components/customer/CustomerTable";
import Loader from "../components/UI/loader/Loader";
import Button from "../components/UI/button/Button";
import Modal from "../components/UI/modal/Modal";
import CustomerForm from "../components/customer/CustomerForm";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

const CustomersPage = () => {

    const [selectedCustomers, setSelectedCustomers] = useState([])
    const [customers, setCustomers] = useState([]);
    const [changeStatusError, setChangeStatusError] = useState(false)
    const [enableState, setEnableState] = useState(true);
    const [disableBtnStatus, setDisableBtnStatus] = useState(true);
    const [modal, setModal] = useState(false)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isEmailExists, setIsEmailExists] = useState(false);
    const [fetchCustomers, isCustomersLoading, customerError] = useFetching(async (limit, page) => {
        let response = await CustomerService.getAll(limit, page);
        setCustomers([...response.data]);
        let total = await CustomerService.getTotal();
        setTotalPages(getPageCount(total.data, limit))
    })

    useEffect(() => {
        fetchCustomers(limit, page);
    }, [enableState, page, limit])

    let selCustomers = useMemo(() => {
        if (!selectedCustomers.length) {
            setDisableBtnStatus(true)
        } else setDisableBtnStatus(false)
        return selectedCustomers
    }, [selectedCustomers])

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

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
            })
        } else {
            await CustomerService.changeActiveStatus(selCustomers, 'enable').then(resp => {
                setEnableState(true);
                setChangeStatusError(false)
            }).catch(err => {
                setChangeStatusError(true)
            })
        }
    }

    function createCustomer(newCustomer) {
        CustomerService.save(newCustomer).then(resp => {
            setCustomers([...customers, resp.data])
            setModal(false);
            setIsEmailExists(false);
        }).catch(resp => {
            setIsEmailExists(true);
        })
    }

    return (
        <div className='container' style={{marginTop: 30}}>
            <Modal visible={modal} setVisible={setModal}>
                <CustomerForm create={createCustomer} emailExists={isEmailExists}/>
            </Modal>
            {changeStatusError && <div className="alert alert-warning">Error when try to change customers status</div>}
            {
                isCustomersLoading
                    ? <Loader/>
                    : <CustomerTable customers={customers} selectCustomer={selectCustomer}/>
            }
            <div className='container'>
                <Button disabled={disableBtnStatus} style={{float: 'right'}} onClick={changeCustomersStatus}>
                    Disable/Enable
                </Button>
                <Button style={{float: 'right'}} onClick={() => setModal(true)}>
                    New customer
                </Button>
            </div>
            <div className='container'>
                <Pagination
                    page={page}
                    changePage={changePage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};

export default CustomersPage;