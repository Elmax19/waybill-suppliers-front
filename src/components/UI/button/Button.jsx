import React from 'react';

const Button = ({children, ...props}) => {
    return (
        <button {...props} className="btn btn-outline-success me-2" >
            {children}
        </button>
    );
};

export default Button;