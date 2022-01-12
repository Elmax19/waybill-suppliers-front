import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
var bcrypt = require('bcryptjs')

const ChangePasswordForm = ({change, hashPass, setError, setModal}) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState({newPassword: '', repeat: ''})

    function changePassword(e){
        e.preventDefault();
        setModal(false)

        bcrypt.compare(oldPassword, hashPass, (err, res) => {
            if(res){
                if (newPassword.newPassword == newPassword.repeat
                    && newPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
                    change(newPassword.newPassword)
                } else {
                    setError('New password should contains at least 8 characters, 1 digit, 1 letter lower and upper case\n' +
                        'and equals repeat password input')
                    setOldPassword('')
                    setNewPassword({newPassword: '', repeat: ''})
                }
            } else {
                setError('Old password not matches your input')
                setOldPassword('')
                setNewPassword({newPassword: '', repeat: ''})
            }
        })
    }


    return (
        <form>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Change password</h1>
                </div><hr/>
                <div className='row my-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Old password:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={oldPassword}
                            placeholder='Old password'
                            onChange={e => setOldPassword(e.target.value)}
                        ></Input>
                    </div>
                </div>
                <div className='row my-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">New password:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={newPassword.newPassword}
                            placeholder='New password'
                            onChange={e => setNewPassword({...newPassword, newPassword: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row my-1'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Repeat new password:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={newPassword.repeat}
                            placeholder='Repeat new password'
                            onChange={e => setNewPassword({...newPassword, repeat: e.target.value})}
                        ></Input>
                    </div>
                </div><hr/>
                <div className='row justify-content-center mx-lg-5'>
                    <Button onClick={changePassword}>Change</Button>
                </div>
            </div>
        </form>
    );
};

export default ChangePasswordForm;