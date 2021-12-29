import React from 'react';
import classes from "./Input.module.css";

const Input = (props) => {
    return (
        <input {...props} className="form-control"/>
    );
};

export default Input;