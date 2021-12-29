import React from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const ItemForm = ({item, setItem, categories, addCategory, create, isNew, upcList}) => {
    const addNewItem = (e) => {
        e.preventDefault()
        const categoryName = item.itemCategory.name;
        if (categories.map(itemCategory => itemCategory.name).includes(categoryName)) {
            item.itemCategory = categories.filter(itemCategory => itemCategory.name === categoryName)[0]
        } else {
            addCategory(item.itemCategory)
        }
        create(item)
    }

    const checkOnExist = () => {
        console.log(upcList, item.upc, upcList.includes(Number(item.upc)))
        if(upcList.includes(Number(item.upc))){
            document.getElementById('upcInput').style.backgroundColor = 'red'
            document.getElementById('formButton').disabled = true;
        } else {
            document.getElementById('upcInput').style.backgroundColor = 'white'
            document.getElementById('formButton').disabled = false;
        }
    }

    return (
        <form>
            <Input
                id='upcInput'
                value={item.upc}
                onChange={e => {setItem({...item, upc: e.target.value})}}
                onKeyUp={() => {
                    if(isNew){
                        checkOnExist();
                    }
                }}
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
                onChange={e => setItem({...item, itemCategory: {name: e.target.value, taxRate: 1}})}
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
            <Button id='formButton' onClick={addNewItem}>Save</Button>
        </form>
    );
};

export default ItemForm;