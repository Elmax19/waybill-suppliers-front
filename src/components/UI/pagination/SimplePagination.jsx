import React from 'react';
import CustomButton from "../button/CustomButton";

const SimplePagination = ({page, total, setPage, ...props}) => {
    return (
        <div className="btn-group" role="group" {...props}>
            {(Number(page) === 1)
                ? <CustomButton disabled styleType='primary' icon='chevron-left'/>
                : <CustomButton onClick={() => setPage(page - 1)} styleType='primary' icon='chevron-left'/>
            }
            <CustomButton styleType='primary'>{page}/{total}</CustomButton>
            {(Number(page) === Number(total))
                ? <CustomButton disabled styleType='primary' icon='chevron-right'/>
                : <CustomButton onClick={() => setPage(page + 1)} styleType='primary' icon='chevron-right'/>
            }
        </div>
    );
};

export default SimplePagination;