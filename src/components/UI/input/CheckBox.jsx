import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return (
        <input type="checkbox" ref={ref} className="form-check-input" {...props}/>
    );
});

export default Input;