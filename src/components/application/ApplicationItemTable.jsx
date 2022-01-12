import React, {useEffect, useState} from 'react';
import Input from "../UI/input/Input";
import Select from "../UI/select/Select";
import Button from "../UI/button/Button";
import RowApplicationItem from "./RowApplicationItem";
import {getDistance} from 'geolib';

const ApplicationItemTable = ({
                                  items,
                                  allItems,
                                  itemOptions,
                                  setItems,
                                  defaultItem,
                                  stateTax,
                                  setError,
                                  warehouseAddress,
                                  isNew,
                                  secondAddress,
                                  searchScope
                              }) => {
    const [newItem, setNewItem] = useState({
        item: defaultItem,
        count: 1
    })

    useEffect(() => {
        setNewItem({...newItem, item: defaultItem})
    }, [defaultItem])

    const addNewItem = (e) => {
        e.preventDefault()
        if(newItem.item===allItems[0].upc){
            newItem.item=allItems[0];
        }
        if (items.filter(item => item.item.id === newItem.item.id).length) {
            setError('Such Item is already added')
        } else {
            setError('')
            warehouseAddress(isNew).then(results => {
                let from = {
                    latitude: results[0].geometry.location.lat(),
                    longitude: results[0].geometry.location.lng()
                }
                secondAddress().then(results => {
                    let to = {
                        latitude: results[0].geometry.location.lat(),
                        longitude: results[0].geometry.location.lng()
                    }
                    let distance = getDistance(from, to)
                    reCalcAllPrices(distance)
                    let newPrice = calcPrice(newItem, distance)
                    setItems([...items, {...newItem, price: newPrice}])
                })
            })
        }
    }

    function reCalcAllPrices(distance) {
        for (let item of items) {
            item.price = calcPrice(item, distance)
        }
    }

    function calcPrice(item, distance) {
        return Math.round((item.item.price * item.count * (1 + stateTax / 100) + (distance / 1000 * item.item.itemCategory.taxRate)) * 100) / 100
    }

    if (searchScope === 'customer') {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) =>
                    <RowApplicationItem item={item} key={item.id}/>
                )}
                </tbody>
            </table>
        );
    } else {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) =>
                    <RowApplicationItem item={item} key={item.id}/>
                )}
                <tr>
                    <td>
                        <Select
                            value={newItem.item.upc}
                            onChange={e => {
                                let item = allItems.filter(item => item.upc === Number(e))[0];
                                setNewItem({...newItem, item: item})
                            }}
                            options={itemOptions}
                        />
                    </td>
                    <td>
                        <Input
                            value={newItem.count}
                            type="number"
                            onChange={e => setNewItem({...newItem, count: e.target.value})}
                            placeholder="count"
                        />
                    </td>
                    <td>
                        <Button style={{marginTop: 0}} id='formButton' onClick={addNewItem}>Add Item</Button>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
};

export default ApplicationItemTable;