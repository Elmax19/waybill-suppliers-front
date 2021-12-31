import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import './../../styles/customerModal.css'

const CustomerForm = ({create, emailExists}) => {

    const [customer, setCustomer] = useState({name: '', email: ''})

    function addNewCustomer(e) {
        e.preventDefault();
        const newCustomer = {
            name: customer.name,
            employees: [
                {
                    contactInformation: {
                        email: customer.email
                    }
                }
            ]
        }
        create(newCustomer);
        setCustomer({name: '', email: ''});

    }

    return (
        <form>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Create customer</h1>
                </div>
                {
                    emailExists && <div className="row justify-content-center">
                        <div className='alert alert-warning'>Customer with this name or email already exists!</div>
                    </div>
                }

                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={customer.name}
                            placeholder='Name'
                            onChange={e => setCustomer({...customer, name: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                    </div>
                    <div className="col">
                        <Input
                            value={customer.email}
                            placeholder='email'
                            onChange={e => setCustomer({...customer, email: e.target.value})}
                        ></Input>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <Button onClick={addNewCustomer}>Добавить</Button>
                </div>
            </div>
        </form>
    );
};

export default CustomerForm;