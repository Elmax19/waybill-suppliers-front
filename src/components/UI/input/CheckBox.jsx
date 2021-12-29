import React from 'react';
import classes from './CheckBox.module.css';

const Input = React.forwardRef((props, ref) => {
    return (
        <input type="checkbox" ref={ref} className={classes.myCheckBox} {...props}/>
    );
});

export default Input;