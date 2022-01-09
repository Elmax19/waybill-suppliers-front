import React, {useEffect, useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const EditTaxForm = ({categoryToEdit, update, setModal}) => {

    const [category, setCategory] = useState({})
    const [formError, setFormError] = useState(false)

    useEffect(() => {
        setCategory({
            id: categoryToEdit.itemCategory.id,
            name: categoryToEdit.itemCategory.name,
            taxRate: categoryToEdit.itemCategory.taxRate,
            totalItems: categoryToEdit.totalItems
        })
    }, [categoryToEdit])

    function updateTax(e) {
        e.preventDefault()
        let newCategory = {
            id: category.id,
            name: category.name,
            taxRate: category.taxRate
        }
        if (newCategory.taxRate < 0) {
            setFormError("Tax rate must be greater than 0")
        } else if (newCategory.taxRate > 100) {
            setFormError("Tax rate must be less than 100(who will pay 100 dollars/1 km?)")
        } else {
            setFormError(false)
            update(newCategory)
            setModal(false);
        }
    }

    return (
        <div>
            <form>
                <div className='col'>
                    <div className="row">
                        <h1 className='text-center'>Update tax</h1>
                    </div>
                    {
                        formError && <div className="row justify-content-center">
                            <div className='alert alert-warning'>{formError}</div>
                        </div>
                    }
                    <hr/>

                    <div className='row'>
                        <div className="col">
                            <label htmlFor="recipient-name" className="col-form-label">Tax rate:</label>
                        </div>
                        <div className="col">
                            <Input
                                value={category.taxRate}
                                placeholder='Tax rate'
                                type='number'
                                step='0.001'
                                maxlength="5"
                                onChange={e => setCategory({...category, taxRate: e.target.value})}
                            ></Input>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <Button onClick={updateTax}>Create</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditTaxForm;