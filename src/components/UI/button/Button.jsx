import React from 'react';

const Button = ({children, ...props}) => {
    return (
        <button {...props} className="btn btn-outline-success me-2" style={{height: 'fit-content'}}>
            {children}
        </button>
    );
};

export default Button;