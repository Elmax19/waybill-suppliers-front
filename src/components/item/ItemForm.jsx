import React from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const ItemForm = ({item, setItem, categories, addCategory, create, isNew, upcList}) => {
    let upcInput;
    let priceInput;
    let unitsInput;
    let submitButton;

    const addNewItem = (e) => {
        e.preventDefault()
        const categoryName = item.itemCategory.name
        if (categories.map(itemCategory => itemCategory.name).includes(categoryName)) {
            item.itemCategory = categories.filter(itemCategory => itemCategory.name === categoryName)[0]
        } else {
            addCategory(item.itemCategory)
        }
        create(item)
    }

    const checkOnExist = () => {
        upcInput = document.getElementById('upcInput')
        if (Number(item.upc) < 10_000_000 || Number(item.upc) > 99_999_999 || upcList.includes(Number(item.upc))) {
            upcInput.style.backgroundColor = 'red'
            disableSubmitButton()
        } else {
            upcInput.style.backgroundColor = ''
            enableSubmitButton()
        }
    }

    const checkOnValidUnits = () => {
        unitsInput = document.getElementById('unitsInput')
        if (Number(item.units) < 1 || Number(item.units) > 10000) {
            unitsInput.style.backgroundColor = 'red'
            disableSubmitButton()
        } else {
            unitsInput.style.backgroundColor = ''
            enableSubmitButton()
        }
    }

    const checkOnValidPrice = () => {
        priceInput = document.getElementById('priceInput')
        if (Number(item.price) <= 0 || Number(item.price) > 10000) {
            priceInput.style.backgroundColor = 'red'
            disableSubmitButton()
        } else {
            priceInput.style.backgroundColor = ''
            enableSubmitButton()
        }
    }

    const enableSubmitButton = () => {
        submitButton = document.getElementById('formButton')
        upcInput = document.getElementById('upcInput')
        priceInput = document.getElementById('priceInput')
        unitsInput = document.getElementById('unitsInput')
        console.log(upcInput.style.backgroundColor);
        if (upcInput.style.backgroundColor === priceInput.style.backgroundColor && priceInput.style.backgroundColor === unitsInput.style.backgroundColor) {
            submitButton.disabled = false;
            submitButton.className = "btn btn-outline-success"
        }
    }

    const disableSubmitButton = () => {
        submitButton = document.getElementById('formButton');
        submitButton.disabled = true;
        submitButton.className = "btn btn-danger"
    }

    return (
        <form className="mb-3">
            <Input
                id="upcInput"
                value={item.upc}
                onChange={e => {
                    setItem({...item, upc: e.target.value})
                }}
                onKeyUp={() => {
                    if (isNew) {
                        checkOnExist();
                    }
                }}
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
                id="unitsInput"
                value={item.units}
                onChange={e => setItem({...item, units: e.target.value})}
                onKeyUp={() => checkOnValidUnits()}
                type="number"
                placeholder="Placed units"
            />
            <Input
                id="priceInput"
                value={item.price}
                onChange={e => setItem({...item, price: e.target.value})}
                onKeyUp={() => checkOnValidPrice()}
                type="number"
                placeholder="Price"
            />
            <Button id='formButton' onClick={addNewItem}>Save</Button>
        </form>
    );
};

export default ItemForm;