import React from 'react';
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages, page);
    return (
        <div>
            {
                pagesArray.map(p =>
                    <span style={{marginRight:'5px'}}
                          onClick={() => changePage(p)}
                          key={p}
                          className={page === Number(p) ? "btn btn-primary" : "btn btn-outline-primary"}
                    >{p}</span>)
            }
        </div>
    );
};

export default Pagination;