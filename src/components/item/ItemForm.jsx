import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const ItemForm = ({categories, addCategory, create}) => {
    const defaultItem = {
        upc: 0,
        itemCategory: {
            name: '',
            taxRate: 0
        },
        units: 1,
        label: '',
        price: 0
    }
    const [item, setItem] = useState({...defaultItem})

    const addNewItem = (e) => {
        e.preventDefault()
        const categoryName = item.itemCategory.name;
        if (categories.map(itemCategory => itemCategory.name).includes(categoryName)) {
            item.itemCategory = categories.filter(itemCategory => itemCategory.name === categoryName)[0]
        } else {
            addCategory(item.itemCategory)
        }
        create(item)
        setItem({...defaultItem})
    }

    return (
        <form>
            <Input
                value={item.upc}
                onChange={e => setItem({...item, upc: e.target.value})}
                type="number"
                min={10_000_000}
                max={99_999_999}
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
                onChange={e => setItem({...item, itemCategory: {name:e.target.value, taxRate:1}})}
                type="text"
                placeholder="Item category"
            />
            <Input
                value={item.units}
                onChange={e => setItem({...item, units: e.target.value})}
                type="number"
                min={1}
                max={10000}
                placeholder="Placed units"
            />
            <Input
                value={item.price}
                onChange={e => setItem({...item, price: e.target.value})}
                type="number"
                min={1}
                max={10000}
                placeholder="Price"
            />
            <Button onClick={addNewItem}>Create Item</Button>
        </form>
    );
};

export default ItemForm;