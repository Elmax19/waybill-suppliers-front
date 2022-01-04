import React from 'react';
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages, page);
    return (
        <div className='container' >
            <div className="row justify-content-center mt-4">
                {
                    pagesArray.map(p =>
                        <span style={{marginRight:5, maxWidth: 40}}
                              onClick={() => changePage(p)}
                              key={p}
                              className={page === Number(p) ? "btn btn-primary" : "btn btn-outline-primary"}
                        >{p}</span>)
                }

            </div>
        </div>
    );
};

export default Pagination;