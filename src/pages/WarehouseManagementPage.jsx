import React, {useEffect, useMemo, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import WarehouseService from "../API/WarehouseService";
import {getPageCount} from "../utils/pages";
import Loader from "../components/UI/loader/Loader";
import WarehouseTable from "../components/warehouse/WarehouseTable";
import Pagination from "../components/UI/pagination/Pagination";
import Button from "../components/UI/button/Button";
import Modal from "../components/UI/modal/Modal";
import WarehouseForm from "../components/warehouse/WarehouseForm";

const WarehouseManagementPage = () => {

    const [warehouses, setWarehouses] = useState([])
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1);
    const [deleteBtnStatus, setDeleteBtnStatus] = useState(false)
    const [modal, setModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [warehousesToRemove, setWarehousesToRemove] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [fetchWarehouses, isLoading, errorWarehouses] = useFetching(async (limit, page) => {
        let response = await WarehouseService.getAllByPage(limit, page)
        setWarehouses([...response.data])
        let total = await WarehouseService.getTotal();
        setTotalPages(getPageCount(total.data, limit))
    })

    useEffect(() => {
        fetchWarehouses(limit, page)
    }, [page, limit])

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    let toRemove = useMemo(() => {
        if (!warehousesToRemove.length) {
            setDeleteBtnStatus(true)
        } else {
            setDeleteBtnStatus(false)
        }
        console.log(warehousesToRemove)
        return warehousesToRemove
    }, [warehousesToRemove])

    function changeRemoveList(warehouse, state) {
        if (state) {
            setWarehousesToRemove([...warehousesToRemove, warehouse])
        } else {
            setWarehousesToRemove(warehousesToRemove.filter(wh => wh.id !== warehouse.id))
        }
    }

    function removeSelectedWarehouses() {
        let removedIds = []
        toRemove.map(removed => removedIds.push(removed.id))
        WarehouseService.delete(removedIds).then(resp => {
            console.log(resp.data)
            setSuccess(resp.data)
            setError(false)
        }).catch(err => {
            setSuccess(false)
            err.response.status == 409 ? setError('One of the selected warehouses are binding with dispatchers.\n' +
                    'System cannot delete it.')
                : setError(err.response.data)
        })
        fetchWarehouses(limit, page)
        setWarehousesToRemove([])
    }

    function createWarehouse(newWarehouse) {
        WarehouseService.save(newWarehouse).then(resp => {
            setWarehouses([...warehouses, resp.data])
            setError(false)
            setSuccess('Warehouse was successfully added')

        }).catch(err => {
            setSuccess(false);
            if(err.response.status == 400){
                setError(err.message)
            } else {
                setError(err.response.data)
            }
        })
    }

    return (
        <div className='container' style={{marginTop: 30}}>
            <Modal visible={modal} setVisible={setModal}>
                <WarehouseForm
                create={createWarehouse}
                setModal={setModal}
                />
            </Modal>
            {
                success &&
                <div className='row'>
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div>
                </div>
            }
            {
                error && <div className='row'>
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                </div>
            }
            {
                isLoading ? <Loader/>
                    : <WarehouseTable
                        warehouses={warehouses}
                        changeRemoveList={changeRemoveList}
                    />
            }
            <div className="container">
                <Button style={{float: 'right'}}
                        disabled={deleteBtnStatus}
                        onClick={removeSelectedWarehouses}
                >
                    Delete selected
                </Button>
                <Button style={{float: 'right'}} onClick={() => setModal(true)}>
                    New warehouse
                </Button>
            </div>
                <Pagination
                    page={page}
                    changePage={changePage}
                    totalPages={totalPages}
                />
        </div>
    );
};

export default WarehouseManagementPage;