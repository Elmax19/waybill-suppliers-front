import React from 'react';

const Select = ({options, defaultValue, value, onChange}) => {
    return (
        <select className="form-select"
                style={{'width': '10%'}}
                value={value}
                onChange={event => onChange(event.target.value)}>
            <option disabled value="">{defaultValue}</option>
            {
                options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>)
            }
        </select>
    );
};

export default Select;