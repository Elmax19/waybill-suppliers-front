import React, {useState} from 'react';
import CheckBox from "../UI/input/CheckBox";
import Modal from "../UI/modal/Modal";

const ItemCategoryRow = (props) => {

    function selectCategory(e) {
        e.stopPropagation()
        props.edit(props.category)
    }

    return (
        <tr onClick={selectCategory}>
            <td>
                {props.category.itemCategory.name}
            </td>
            <td>
                {props.category.itemCategory.taxRate}
            </td>
            <td>
                {props.category.totalItems}
            </td>
        </tr>
    );
};

export default ItemCategoryRow;