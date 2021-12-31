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
        <form className="mb-3">
            <Input
                value={item.upc}
                onChange={e => setItem({...item, upc: e.target.value})}
                type="number"
                placeholder="Item UPC"
            />
            <Input
                value={item.label}
                onChange={e => setItem({...item, label: e.target.value})}
                type="text"
                placeholder="Label"
            />
            <Input
                value={item.itemCategory.name}
                onChange={e => setItem({...item, itemCategory: {name: e.target.value, taxRate: 1}})}
                type="text"
                placeholder="Item category"
            />
            <Input
                value={item.units}
                onChange={e => setItem({...item, units: e.target.value})}
                type="number"
                placeholder="Placed units"
            />
            <Input
                value={item.price}
                onChange={e => setItem({...item, price: e.target.value})}
                type="number"
                placeholder="Price"
            />
            <Button id='formButton' onClick={addNewItem}>Save</Button>
            {errorMsg}
        </form>
    );
};

export default ItemForm;