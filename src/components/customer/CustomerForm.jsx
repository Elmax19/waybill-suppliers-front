import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const CustomerForm = ({create, emailExists}) => {

    const [customer, setCustomer] = useState({name: '', email: ''})
    const [error, setError] = useState(false)

    function addNewCustomer(e) {
        e.preventDefault();
        if (customer.name == '' || customer.email == '') {
            setError("Inputs should be not empty!")
        } else {
            setError(false)
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
    }

    return (
        <form>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Create customer</h1>
                </div><hr/>
                {
                    emailExists && <div className="row justify-content-center">
                        <div className='alert alert-warning'>{emailExists}</div>
                    </div>
                }
                {
                    error && <div className="row justify-content-center">
                        <div className='alert alert-warning'>{error}</div>
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
                </div><hr/>
                <div className='row justify-content-center'>
                    <Button onClick={addNewCustomer}>Добавить</Button>
                </div>
            </div>
        </form>
    );
};

export default CustomerForm;