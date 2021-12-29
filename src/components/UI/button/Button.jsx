import React from 'react';
import classes from "./Button.module.css";

const Button = ({children, ...props}) => {
    return (
        <button {...props} className="btn btn-outline-success me-2">
            {children}
        </button>
    );
};

export default Button;