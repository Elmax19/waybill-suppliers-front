import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import Select from "../components/UI/select/Select";
import WriteOffService from "../API/WriteOffService";
import WriteOffTable from "../components/write-off/WriteOffTable";
import Modal from "../components/UI/modal/Modal";
import WriteOffModal from "../components/write-off/WriteOffModal";

function WriteOffManagement({searchScope}) {
    const [writeOffs, setWriteOffs] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState(false)
    const [items, setItems] = useState([]);

    const [fetchWriteOffs, isWriteOffLoading, writeOffError] = useFetching(async (limit, page) => {
        let writeOffsResponse = await WriteOffService.getAll(searchScope, limit, page)
        let countResponse = await WriteOffService.getCount(searchScope)
        setWriteOffs([...writeOffsResponse.data]);
        setTotalPages(getPageCount(countResponse.data, limit))
    })

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    const showModal = (items) => {
        setModal(true)
        setItems(items)
    }

    useEffect(() => {
        fetchWriteOffs(limit, page)
    }, [limit, page])

    return (
        <div className='container' style={{marginTop: 30}}>
            <Modal visible={modal} setVisible={setModal}>
                <WriteOffModal items={items}/>
            </Modal>
            {writeOffError &&
            <h1>Error: ${writeOffError}</h1>
            }
            {isWriteOffLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <WriteOffTable writeOffs={writeOffs} showModal={showModal} searchScope={searchScope} title="Application Write-off acts:"/>
            }
            <div className="container">
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
            <div>
                <Pagination
                    page={page}
                    changePage={changePage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}

export default WriteOffManagement;