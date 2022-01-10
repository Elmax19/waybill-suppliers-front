import React from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";
import statesOptions from "../../utils/states";

const ChangeUserInfoForm = ({successfulUpdate, error, setError, currentUser,
                                setCurrentUser, setModal, updateUser, dismissChanges}) => {

    function update(e) {
        e.preventDefault()
        let keyIsEmpty = false;
        for (const key in currentUser) {
            if (currentUser[key] == '') keyIsEmpty = true;
        }
        if (keyIsEmpty){
            setError('Some field is empty.')
        } else{
            updateUser();
            setError(false)
        }
    }

    return (
        <form className='container'>
            <div className="col">
                <div className="row">
                    <h1 className='text-center'>
                        Profile settings
                    </h1>
                </div>
                {
                    successfulUpdate &&
                    <div className='row'>
                        <div className="alert alert-success" role="alert">
                            {successfulUpdate}
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
                <div className='row border border-3 border-darkgray rounded-3 p-3 bg-light'>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Name: </label></div>
                            <div className="col">
                                <Input value={currentUser.name} plaсeholder='Name'
                                       onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Surname: </label></div>
                            <div className="col">
                                <Input value={currentUser.surname} plaсeholder='Surname'
                                       onChange={(e) => setCurrentUser({...currentUser, surname: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Birthday date: </label></div>
                            <div className="col">
                                <Input type='date' value={currentUser.birthday}
                                       onChange={(e) => setCurrentUser({...currentUser, birthday: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Email: </label></div>
                            <div className="col">
                                <Input disabled value={currentUser.email}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row border border-3 border-darkgray rounded-3 p-3 bg-light'>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Login: </label></div>
                            <div className="col">
                                <Input value={currentUser.login} plaсeholder='Login'
                                       disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Role: </label></div>
                            <div className="col">
                                <Input value={currentUser.role}
                                       disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Password: </label></div>
                            <div className="col">
                                <button type="button" className="btn btn-link"
                                        onClick={() => setModal(true)}
                                >Change password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row border border-3 border-darkgray rounded-3 p-3 bg-light'>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">State: </label></div>
                            <div className="col">
                                <div className="input-group">
                                    <Input value={currentUser.state} plaсeholder='State' disabled
                                    />
                                    <Select options={statesOptions}
                                            defaultValue={currentUser.state}
                                            onChange={value => setCurrentUser({...currentUser, state: value})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">City: </label></div>
                            <div className="col">
                                <Input value={currentUser.city} plaсeholder='City'
                                       onChange={(e) => setCurrentUser({...currentUser, city: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Address line 1: </label></div>
                            <div className="col">
                                <Input value={currentUser.firstAddressLine}
                                       onChange={(e) => setCurrentUser({
                                           ...currentUser,
                                           firstAddressLine: e.target.value
                                       })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col"><label className="col-form-label">Address line 2: </label></div>
                            <div className="col">
                                <Input value={currentUser.secondAddressLine}
                                       onChange={(e) => setCurrentUser({
                                           ...currentUser,
                                           secondAddressLine: e.target.value
                                       })}
                                />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row justify-content-center">
                        <Button
                            onClick={update}>
                            Change saves
                        </Button>
                        <Button
                            onClick={dismissChanges}>
                            Dismiss
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ChangeUserInfoForm;