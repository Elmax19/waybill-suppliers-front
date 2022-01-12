import React, {useEffect, useMemo, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Modal from "../components/UI/modal/Modal";
import Loader from "../components/UI/loader/Loader";
import Button from "../components/UI/button/Button";
import Pagination from "../components/UI/pagination/Pagination";
import CarService from "../API/CarService";
import CarForm from "../components/car/CarForm";
import CarTable from "../components/car/CarTable";

const CarManagementPage = () => {
    const [cars, setCars] = useState([])
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1);
    const [deleteBtnStatus, setDeleteBtnStatus] = useState(false)
    const [modal, setModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [carsToRemove, setCarsToRemove] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [fetchCars, isLoading, errorWarehouses] = useFetching(async (limit, page) => {
        let response = await CarService.getAll(limit, page)
        setCars([...response.data])
        let total = await CarService.getTotal();
        setTotalPages(getPageCount(total.data, limit))
    })

    useEffect(() => {
        fetchCars(limit, page)
    }, [page, limit])

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    let toRemove = useMemo(() => {
        if (!carsToRemove.length) {
            setDeleteBtnStatus(true)
        } else {
            setDeleteBtnStatus(false)
        }
        return carsToRemove
    }, [carsToRemove])

    function changeRemoveList(car, state) {
        if (state) {
            setCarsToRemove([...carsToRemove, car])
        } else {
            setCarsToRemove(carsToRemove.filter(c => c.id !== car.id))
        }
    }

    function removeSelectedCars() {
        let removedIds = []
        toRemove.map(removed => removedIds.push(removed.id))
        CarService.delete(removedIds).then(resp => {
            setSuccess(resp.data)
            setError(false)
            fetchCars(limit, page)
        }).catch(err => {
            setSuccess(false)
            setError(err.response.data)
        })
        setCarsToRemove([])
    }

    function createCar(newCar) {
        CarService.save(newCar).then(resp => {
            setCars([...cars, resp.data])
            setError(false)
            setSuccess('Car was successfully added')

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
                <CarForm
                    create={createCar}
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
                    : <CarTable
                        cars={cars}
                        changeRemoveList={changeRemoveList}
                    />
            }
            <div className="container">
                <Button style={{float: 'right'}}
                        disabled={deleteBtnStatus}
                        onClick={removeSelectedCars}
                >
                    Delete selected
                </Button>
                <Button style={{float: 'right'}} onClick={() => setModal(true)}>
                    New car
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

export default CarManagementPage;