import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import ItemCategoryService from "../API/ItemCategoryService";
import Loader from "../components/UI/loader/Loader";
import ItemCategoryTable from "../components/item_category/ItemCategoryTable";
import Pagination from "../components/UI/pagination/Pagination";
import Modal from "../components/UI/modal/Modal";
import EditTaxForm from "../components/item_category/EditTaxForm";

const PriceCalculationPage = () => {

    const [categories, setCategories] = useState([])
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [fetchCategories, isLoading, errorCategories] = useFetching(async (limit, page) => {
        let response = await ItemCategoryService.getAll(limit, page)
        setCategories([...response.data])
        let total = await ItemCategoryService.getTotal();
        setTotalPages(getPageCount(total.data, limit))
    })
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [categoryToEdit, setCategoryToEdit] = useState({
        itemCategory: {
            id: 0,
            name: "",
            taxRate: 0.0
        },
        totalItems: 0
    });

    useEffect(() => {
        fetchCategories(limit, page)
    }, [page, limit])

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    function chooseEdit(editCategory) {
        setCategoryToEdit(editCategory);
        setModal(true);
    }

    function update(newCategory) {
        console.log(newCategory)
        ItemCategoryService.update(newCategory).then(resp =>{
            fetchCategories(limit,page);
            setSuccess("Tax rate successfully updated")
            setError(false)
        }).catch(err => {
            setError(err.response.data)
            setSuccess(false)
        })
    }

    return (
        <div className='container' style={{marginTop: 30}}>
            <Modal visible={modal} setVisible={setModal}>
                <EditTaxForm categoryToEdit={categoryToEdit} setModal={setModal} update={update}/>
            </Modal>
            {
                success &&
                <div className='row'>
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div>
                </div>
            }
            {
                error && <div className='row'>
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                </div>
            }
            {
                isLoading ? <Loader/>
                    : <ItemCategoryTable
                        categories={categories}
                        edit={chooseEdit}
                    />
            }
            <Pagination
                changePage={changePage}
                page={page}
                totalPages={totalPages}
            />
        </div>
    );
};

export default PriceCalculationPage;