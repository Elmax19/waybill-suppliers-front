import React from 'react';

const Select = ({options, value, onChange, ...props}) => {
    return (
        <select {...props} className="form-select"
                value={value}
                onChange={event => onChange(event.target.value)}>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>)}
        </select>
    );
};

export default Select;