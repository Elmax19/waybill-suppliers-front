import React from 'react';

const StateBean = ({state}) => {
    let bgColor, color, text;

    switch (state) {
        default:
        case 'OPEN':
            text = 'Open';
            bgColor = 'var(--bs-primary)';
            color = 'var(--bs-white)';
            break;
        case 'READY':
            text = 'Ready';
            bgColor = 'var(--bs-info)';
            color = 'var(--bs-black)';
            break;
        case 'IN_PROGRESS':
            text = 'In progress';
            bgColor = 'var(--bs-warning)';
            color = 'var(--bs-black)';
            break;
        case 'FINISHED':
            text = 'Finished';
            bgColor = 'var(--bs-success)';
            color = 'var(--bs-white)';
            break;
    }

    return (
        <span className="d-inline px-3 py-1"
              style={{
                  background: bgColor,
                  color: color,
                  borderRadius: '20px'
              }}>{text}</span>
    );
};

export default StateBean;