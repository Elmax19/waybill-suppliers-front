import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return (
        <div className="input-group mb-3">
            <input ref={ref} className="form-control" {...props}/>
        </div>
    );
});

export default Input;