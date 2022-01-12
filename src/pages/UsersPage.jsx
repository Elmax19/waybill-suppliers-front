import React, {useEffect, useMemo, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CustomerService from "../API/CustomerService";
import {getPageCount} from "../utils/pages";
import UserService from "../API/UserService";
import Loader from "../components/UI/loader/Loader";
import UsersTable from "../components/user/UsersTable";
import Pagination from "../components/UI/pagination/Pagination";
import Button from "../components/UI/button/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
import CheckBox from "../components/UI/input/CheckBox";
import Modal from "../components/UI/modal/Modal";
import UserForm from "../components/user/UserForm";
import WarehouseService from "../API/WarehouseService";

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [changeStatusError, setChangeStatusError] = useState(false)
    const [enableState, setEnableState] = useState(true);
    const [disableBtnStatus, setDisableBtnStatus] = useState(true);
    const [modal, setModal] = useState(false)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [createError, setCreateError] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [success, setSuccess] = useState(false);
    const [fetchUsers, isUsersLoading, userError] = useFetching(async (limit, page) => {
        let response = await UserService.getAll(limit, page, filter);
        let currentUser = JSON.parse(sessionStorage.getItem('auth'));
        setUsers([...response.data.filter(user => user.id !== currentUser.id)]);
        let total = await UserService.getTotal();
        setTotalPages(getPageCount(total.data, limit))
    })

    useEffect(() => {
        fetchUsers(limit, page);
    }, [enableState, page, limit, filter])

    let selUsers = useMemo(() => {
        if (!selectedUsers.length) {
            setDisableBtnStatus(true)
        } else setDisableBtnStatus(false)
        return selectedUsers
    }, [selectedUsers])

    function selectUser(selUser, isChecked) {
        if (isChecked) {
            setSelectedUsers([...selectedUsers, selUser])
        } else {
            setSelectedUsers(selectedUsers.filter(c => c.id !== selUser.id))
        }
        return selectedUsers;
    }

    async function changeUsersStatus() {
        let state = enableState ? 'disable' : 'enable'
        await UserService.changeActiveStatus(selUsers, state).then(resp => {
            setEnableState(enableState ? false : true);
            setChangeStatusError(false)
            setSelectedUsers([])
        }).catch(err => {
            setChangeStatusError(true)
        })
    }

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    function filterDisabled(e) {
        if (e.target.checked) {
            setFilter(true)
        } else setFilter(false);
    }

    function createUser(newUser) {
        UserService.save(newUser).then(resp => {
            setUsers([...users, resp.data])
            let newUser = resp.data;
            if (newUser.role == 'ROLE_DISPATCHER'){
                console.log('work binding')
                WarehouseService.bindWithDispatcher(selectedWarehouse, newUser.id)
            }
            setModal(false);
            setCreateError(false);
            setSuccess("New user was successfully added")
        }).catch(resp => {
            setCreateError(resp.response.data)
            setSuccess(false)
        })
    }


    return (
        <div className='container' style={{marginTop: 30}}>
            <Modal visible={modal} setVisible={setModal}>
                <UserForm create={createUser} error={createError} setError={setCreateError}
                          setSelectedWarehouse={setSelectedWarehouse} selectedWarehouse={selectedWarehouse}/>
            </Modal>
            {
                success &&
                <div className='row'>
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div>
                </div>
            }
            {changeStatusError && <div className="alert alert-warning">Error when try to change customers status</div>}
            {
                isUsersLoading ? <Loader/>
                    : <UsersTable users={users} selectUser={selectUser}/>

            }
            <div className="container">
                <span>Filter out disabled</span>
                <CheckBox style={{marginLeft: 5}}
                          onChange={filterDisabled}
                />
                <Button style={{float: 'right'}} disabled={disableBtnStatus} onClick={changeUsersStatus}>
                    Disable/Enable
                </Button>
                <Button style={{float: 'right'}} onClick={() => setModal(true)}>
                    New user
                </Button>
            </div>
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default UsersPage;