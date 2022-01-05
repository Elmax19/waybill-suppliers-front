import React, {useEffect, useState} from 'react';
import ItemService from "../API/ItemsService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Button from "../components/UI/button/Button";
import ItemForm from "../components/item/ItemForm";
import Modal from "../components/UI/modal/Modal";
import ItemTable from "../components/item/ItemTable";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import Select from "../components/UI/select/Select";

function ItemManagement() {
    const [items, setItems] = useState([])
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [newItems, setCount] = useState(0);
    const [selectedItems, setSelected] = useState([]);
    const [isNewItem, setIsNew] = useState(true);
    const defaultItem = {
        upc: 10_000_000,
        itemCategory: {
            name: '',
            taxRate: 1
        },
        units: 1,
        label: '',
        price: 1
    }
    const [formItem, setFormItem] = useState({...defaultItem})
    const [upcList, setUpcList] = useState([])

    const [fetchItems, isItemsLoading, itemError] = useFetching(async (limit, page) => {
        let response = await ItemService.getAll(limit, page)
        setItems([...response.data])
        setCategories(response.data.map(item => item.itemCategory)
            .filter((set => f => !set.has(f.name) && set.add(f.name))(new Set)))
        response = await ItemService.getCount()
        setTotalPages(getPageCount(response.data, limit))
    })

    const createItem = (newItem) => {
        ItemService.save(newItem).then(() => setCount(newItems + 1))
        setModal(false)
    }

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory])
    }

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    const selectItem = (id, isSelected) => {
        if (isSelected) {
            selectedItems.push(id)
        } else {
            delete selectedItems[selectedItems.indexOf(id)]
        }
    }

    const deleteSelected = () => {
        selectedItems.forEach(id => {
            ItemService.delete(id).then(() => setCount(newItems - 1))
        })
        setSelected([])
    }

    const showEditForm = (item) => {
        setFormItem({...item})
        setIsNew(false)
        setModal(true)
    }

    useEffect(() => {
        fetchItems(limit, page)
    }, [limit, page, newItems])

    return (
        <div className="App">
            <Modal visible={modal} setVisible={setModal}>
                <ItemForm item={formItem} setItem={setFormItem} categories={categories} addCategory={addCategory}
                          create={createItem} isNew={isNewItem} upcList={upcList}/>
            </Modal>
            {itemError &&
            <h1>Error: ${itemError}</h1>
            }
            {isItemsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <ItemTable items={items} select={selectItem} selectedItems={selectedItems} edit={showEditForm}
                             title="Items:"/>
            }
            <div className="menu">
                <div className="firstBlock">
                    <Pagination
                        page={page}
                        changePage={changePage}
                        totalPages={totalPages}
                    />
                </div>
                <div className="secondBlock">
                    <Select
                        value={limit}
                        onChange={value => {
                            setLimit(value)
                            setPage(1)
                        }}
                        options={[
                            {value: 10, name: '10'},
                            {value: 20, name: '20'}
                        ]}
                    />
                    <Button style={{marginTop: 30}} onClick={() => {
                        setFormItem({...defaultItem})
                        setIsNew(true)
                        setModal(true)
                    }}>
                        Create new Items
                    </Button>
                    <Button style={{marginTop: 30}} onClick={() => deleteSelected()}>
                        Delete selected items
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ItemManagement;