import React, {useEffect, useState} from 'react';
import WriteOffItemRow from "./WriteOffItemRow";
import Select from "../UI/select/Select";
import Input from "../UI/input/Input";

const WriteOffItemTable = ({items, setItems, itemOptions, allItems, defaultItem, setError}) => {
    const [newItem, setNewItem] = useState({
        item: defaultItem,
        amount: 1,
        reason: ''
    });

    const addItem = (newItem) => {
        if (items.filter(item => item.item.id === newItem.item.id).length) {
            setError('Such Item is already added')
        }
        if (allItems.filter(item => item.item.id === newItem.item.id)[0].count < newItem.amount) {
            setError('No such items in the Warehouse')
        } else {
            setError('')
            setItems([...items, newItem])
            setNewItem({
                item: defaultItem,
                amount: 1,
                reason: ''
            })
        }
    }

    useEffect(() => {
        setNewItem({...newItem, item: defaultItem})
    }, [defaultItem])

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <td>UPC</td>
                <td>Amount</td>
                <td>Reason</td>
            </tr>
            </thead>
            <tbody>
            {
                items.map(item =>
                    <WriteOffItemRow key={item.id} item={item}/>
                )
            }
            {
                allItems === undefined
                    ? ''
                    : <tr>
                        <td>
                            <Select
                                value={newItem.item.upc}
                                onChange={e => {
                                    let item = allItems.filter(item => item.item.upc === Number(e))[0];
                                    setNewItem({...newItem, item: item.item})
                                }}
                                options={itemOptions}
                            />
                        </td>
                        <td>
                            <Input
                                value={newItem.amount}
                                type="number"
                                onChange={e => setNewItem({...newItem, amount: e.target.value})}
                                placeholder="count"
                            />
                        </td>
                        <td>
                            <Select
                                onChange={e => {
                                    addItem({...newItem, reason: e})
                                    document.getElementsByTagName('Select')[1].selectedIndex = 0
                                }}
                                defaultValue={'select reason'}
                                options={[
                                    {value: 'DAMAGED', name: 'Damage'},
                                    {value: 'SPOILED', name: 'Spoiled'},
                                    {value: 'LOST', name: 'Lost'},
                                    {value: 'STOLEN', name: 'Stolen'}]}
                            />
                        </td>
                    </tr>
            }
            </tbody>
        </table>
    );
};

export default WriteOffItemTable;