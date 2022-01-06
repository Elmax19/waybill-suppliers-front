import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import Select from "../components/UI/select/Select";
import ApplicationTable from "../components/application/ApplicationTable";
import ApplicationService from "../API/ApplicationService";
import {getPageCount} from "../utils/pages";

function ApplicationManagement({searchScope}) {
    const [applications, setApplications] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('ALL')

    const [fetchApplications, isApplicationsLoading, applicationError] = useFetching(async (limit, page) => {
        let applicationsResponse = await ApplicationService.getAll(searchScope, limit, page, status)
        let countResponse = await ApplicationService.getCountByWarehouse(searchScope, status)
        setApplications([...applicationsResponse.data])
        console.log(countResponse.data)
        setTotalPages(getPageCount(countResponse.data, limit))
    })

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    useEffect(() => {
        fetchApplications(limit, page)
    }, [limit, page, status])

    return (
        <div className='container' style={{marginTop: 30}}>
            {applicationError &&
            <h1>Error: ${applicationError}</h1>
            }
            {isApplicationsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <ApplicationTable applications={applications} title="Applications:"/>
            }
            <div className="container">
                {searchScope === 'warehouse'
                    ? <div style={{float: 'right'}}>
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