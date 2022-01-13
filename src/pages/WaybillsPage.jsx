import React, {useEffect, useState} from 'react';
import Toggle from "../components/UI/button/Toggle";
import CustomButton from "../components/UI/button/CustomButton";
import WaybillTable from "../components/waybill/WaybillTable";
import SimplePagination from "../components/UI/pagination/SimplePagination";
import {useFetching} from "../hooks/useFetching";
import WaybillService from "../API/WaybillService";
import {getPageCount} from "../utils/pages";
import {useNavigate} from "react-router-dom";
import Select from "../components/waybill/Select";

const WaybillsPage = () => {
    const navigate = useNavigate();

    let [waybills, setWaybills] = useState([]);

    let [filterSet, setFilterSet] = useState({
        iAmCreator: true,
        open: true,
        ready: true,
        inProgress: true,
        finished: true,
    });

    let changeFilter = (filter, val) => setFilterSet({...filterSet, [filter]: val});

    let [pagesAmount, setPagesAmount] = useState(1);
    let [page, setPage] = useState(1);
    let [size, setSize] = useState(10);

    const [fetchWaybills, isLoading, error] = useFetching(async () => {
        let resp = await WaybillService.getByFilter(filterSet, page, size);
        setWaybills([...resp.data]);
        resp = await WaybillService.getCountByFilter(filterSet);
        let pageCount = getPageCount(resp.data, size);
        setPagesAmount(pageCount === 0 ? 1 : pageCount);
    });

    useEffect(() => {
        fetchWaybills();
    }, [filterSet, page, size])

    let noFilter = filterSet.iAmCreator
        && filterSet.open
        && filterSet.ready
        && filterSet.inProgress
        && filterSet.finished;

    if (!error && !((!waybills || !waybills.length) && noFilter)) {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <h1 className='d-inline-block me-2'>All waybills</h1>
                        {isLoading &&
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-lg-9 d-flex align-items-end">
                        <div className="btn-toolbar">
                            <div className="btn-group" role="group" style={{marginRight: '1vw'}}>
                                <Toggle colorStyle='primary' icon='user'
                                        on={filterSet.iAmCreator} tag='iAmCreator' toggle={changeFilter}>
                                    Created by me
                                </Toggle>
                            </div>
                            <div className="btn-group" role="group" style={{marginRight: '1vw'}}>
                                <Toggle colorStyle='primary' icon='inbox'
                                        on={filterSet.open} tag='open' toggle={changeFilter}>
                                    Open
                                </Toggle>
                                <Toggle colorStyle='info' icon='tasks'
                                        on={filterSet.ready} tag='ready' toggle={changeFilter}>
                                    Ready
                                </Toggle>
                                <Toggle colorStyle='warning' icon='spinner'
                                        on={filterSet.inProgress} tag='inProgress' toggle={changeFilter}>
                                    In progress
                                </Toggle>
                                <Toggle colorStyle='success' icon='check'
                                        on={filterSet.finished} tag='finished' toggle={changeFilter}>
                                    Finished
                                </Toggle>
                            </div>
                            <SimplePagination page={page} total={pagesAmount} setPage={setPage}
                                              style={{marginRight: '1vw'}}/>
                        </div>
                        <div>
                            <Select options={[
                                {value: '10', name: '10'},
                                {value: '20', name: '20'}]} value={size} onChange={setSize}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="btn-toolbar justify-content-end">
                            <div className="btn-group" role="group">
                                <CustomButton onClick={() => navigate('/waybill-form')} styleType='success' icon='plus'>Create
                                    new</CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <WaybillTable waybills={waybills}/>
                        <div className="btn-toolbar justify-content-end">
                            <SimplePagination page={page} total={pagesAmount} setPage={setPage}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <h1>All waybills</h1>
                </div>
            </div>
            <div className="row" style={{marginBottom: '1vw'}}>
                <div className="col">
                    {error
                        ?
                        <div>
                            <h1 style={{textAlign: 'center'}}>
                                Oops! Something went wrong :(
                            </h1>
                            <h3 style={{textAlign: 'center'}}>
                                Please, stand by or contact system administrator.
                            </h3>
                        </div>
                        : !isLoading ?
                            <div>
                                <h1 style={{textAlign: 'center'}}>
                                    Oops! There are no waybills :(
                                </h1>
                                <h3 style={{textAlign: 'center'}}>
                                    Would you like to&nbsp;
                                    <CustomButton onClick={() => navigate('/waybill-form')}
                                                  styleType='outline-success' icon='plus'>Create new</CustomButton>
                                    &nbsp;one ?
                                </h3>
                            </div>
                            :
                            <div/>
                    }
                </div>
            </div>
        </div>
    );
};

export default WaybillsPage;