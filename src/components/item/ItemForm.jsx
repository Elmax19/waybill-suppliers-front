import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const ItemForm = ({item, setItem, categories, addCategory, create, isNew, upcList}) => {
    const [errorMsg, setError] = useState('');

    const addNewItem = (e) => {
        e.preventDefault()
        if (isNew && upcList.includes(Number(item.upc))) {
            setError("Such Item UPC already exists")
        } else if (Number(item.upc) < 10_000_000 || Number(item.upc) > 99_999_999) {
            setError("Invalid UPC data (from 10.000.000 to 99.999.999)")
        } else if (Number(item.units) < 1 || Number(item.units) > 10_000) {
            setError("Invalid Units data (from 1 to 10.000)")
        } else if (Number(item.price) <= 0 || Number(item.price) > 10_000) {
            setError("Invalid Price data (from 0 to 10.000)")
        } else {
            setError("")
            const categoryName = item.itemCategory.name
            if (categories.map(itemCategory => itemCategory.name).includes(categoryName)) {
                item.itemCategory = categories.filter(itemCategory => itemCategory.name === categoryName)[0]
            } else {
                addCategory(item.itemCategory)
            }
            create(item)
        }
    }

    return (
        <form>
            <div className="col">
                <div className="row">
                    <h1 className='text-center'>Create item</h1>
                </div><hr/>
                {
                    errorMsg &&  <div className="row justify-content-center">
                        <div className='alert alert-warning'>{errorMsg}</div>
                    </div>
                }
            </div>
            <div className='row m-1'>
                <div className="col">
                    <label htmlFor="recipient-name" className="col-form-label">UPC:</label>
                </div>
                <div className="col">
                    <Input
                        value={item.upc}
                        onChange={e => setItem({...item, upc: e.target.value})}
                        type="number"
                        placeholder="Item UPC"
                    />
                </div>
            </div>
            <div className='row m-1'>
                <div className="col">
                    <label htmlFor="recipient-name" className="col-form-label">Label:</label>
                </div>
                <div className="col">
                    <Input
                        value={item.label}
                        onChange={e => setItem({...item, label: e.target.value})}
                        placeholder="Label"
                    />
                </div>
            </div>
            <div className='row m-1'>
                <div className="col">
                    <label htmlFor="recipient-name" className="col-form-label">Category:</label>
                </div>
                <div className="col">
                    <Input
                        value={item.itemCategory.name}
                        onChange={e => setItem({...item, itemCategory: {name: e.target.value, taxRate: 1}})}
                        placeholder="Item category"
                    />
                </div>
            </div>
            <div className='row m-1'>
                <div className="col">
                    <label htmlFor="recipient-name" className="col-form-label">Units:</label>
                </div>
                <div className="col">
                    <Input
                        value={item.units}
                        onChange={e => setItem({...item, units: e.target.value})}
                        type="number"
                        placeholder="Placed units"
                    />
                </div>
            </div>
            <div className='row m-1'>
                <div className="col">
                    <label htmlFor="recipient-name" className="col-form-label">Price:</label>
                </div>
                <div className="col">
                    <Input
                        value={item.price}
                        onChange={e => setItem({...item, price: e.target.value})}
                        type="number"
                        placeholder="Price"
                    />
                </div>
            </div>
            <hr/>
            <div className='row justify-content-center mx-lg-5'>
                <Button id='formButton' onClick={addNewItem}>Save</Button>
            </div>
        </form>
    );
};

export default ItemForm;