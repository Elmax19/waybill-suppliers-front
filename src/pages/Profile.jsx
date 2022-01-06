import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import UserService from "../API/UserService";
import Modal from "../components/UI/modal/Modal";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import AuthenticationService from "../API/AuthenticationService";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import ChangeUserInfoForm from "../components/profile/ChangeUserInfoForm";

const Profile = () => {

    const [currentUser, setCurrentUser] = useState({})
    const [successfulUpdate, setSuccessfulUpdate] = useState(false)
    const [error, setError] = useState(false)
    const routing = useNavigate();
    const {setIsAuth} = useContext(AuthContext);
    const [modal, setModal] = useState(false)
    const [fetchUser, isUserLoading, userError] = useFetching(() => {
        let authUser = JSON.parse(sessionStorage.getItem('auth'));
        setCurrentUser(getUserByStorage(authUser))
    })

    useEffect(() => {
        fetchUser()
    }, [])

    function updateUser() {
        let editUser = {
            id: currentUser.id,
            activeStatus: currentUser.activeStatus,
            login: currentUser.login,
            password: currentUser.password,
            role: currentUser.role,
            contactInformation: {
                name: currentUser.name,
                surname: currentUser.surname,
                birthday: currentUser.birthday,
                email: currentUser.email,
                address: {
                    id: currentUser.addressId,
                    state: currentUser.state,
                    city: currentUser.city,
                    firstAddressLine: currentUser.firstAddressLine,
                    secondAddressLine: currentUser.secondAddressLine
                }
            }
        }
        UserService.update(false, editUser).then(resp => {
            let newUser = resp.data;
            newUser.contactInformation.birthday = newUser.contactInformation.birthday.substr(0, 10);
            sessionStorage.setItem('auth', JSON.stringify(newUser));
            setCurrentUser(getUserByStorage(JSON.parse(sessionStorage.getItem('auth'))))
            setError(false);
            setSuccessfulUpdate('Your account was successfully update!')
        }).catch(err => {
            setSuccessfulUpdate(false)
            setError(err.response.data)
            setCurrentUser(getUserByStorage(JSON.parse(sessionStorage.getItem('auth'))))
        })
    }

    function dismissChanges(e) {
        e.preventDefault();
        setCurrentUser(getUserByStorage(JSON.parse(sessionStorage.getItem('auth'))))
    }

    function getUserByStorage(userFromStorage) {
        return {
            id: userFromStorage.id,
            activeStatus: userFromStorage.activeStatus,
            login: userFromStorage.login, //
            role: userFromStorage.role, //
            password: userFromStorage.password,
            birthday: userFromStorage.contactInformation.birthday, //
            email: userFromStorage.contactInformation.email, //
            name: userFromStorage.contactInformation.name, //
            surname: userFromStorage.contactInformation.surname, //
            addressId: userFromStorage.contactInformation.address.id,
            state: userFromStorage.contactInformation.address.state,
            city: userFromStorage.contactInformation.address.city,
            firstAddressLine: userFromStorage.contactInformation.address.firstAddressLine,
            secondAddressLine: userFromStorage.contactInformation.address.secondAddressLine
        }
    }

    function changePassword(newPass) {
        let editUser = {
            id: currentUser.id,
            activeStatus: currentUser.activeStatus,
            login: currentUser.login,
            password: newPass,
            role: currentUser.role,
            contactInformation: {
                name: currentUser.name,
                surname: currentUser.surname,
                birthday: currentUser.birthday,
                email: currentUser.email,
                address: {
                    id: currentUser.addressId,
                    state: currentUser.state,
                    city: currentUser.city,
                    firstAddressLine: currentUser.firstAddressLine,
                    secondAddressLine: currentUser.secondAddressLine
                }
            }
        }
        UserService.update(true, editUser).then(resp => {
            AuthenticationService.logout();
            setIsAuth(false)
            routing('/login');
        }).catch(err => {
            setError(err.response.data)
        })
    }

    return (
        <div>
            <Modal visible={modal} setVisible={setModal}>
                <ChangePasswordForm change={changePassword}
                                    hashPass={currentUser.password}
                                    setError={setError}
                                    setSuccess={setSuccessfulUpdate}
                                    setModal={setModal}
                />
            </Modal>
            <ChangeUserInfoForm
                successfulUpdate={successfulUpdate}
                error={error}
                setError={setError}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setModal={setModal}
                updateUser={updateUser}
                dismissChanges={dismissChanges}
                update={updateUser}
            />
        </div>
    );
};

export default Profile;