import React from 'react';

const CustomButton = ({children, styleType, icon, ...props}) => {
    let buttonClasses = `btn btn-${styleType}`;

    if (icon) {
        let iconClasses = `fa fa-${icon}`;

        if (children)
            return (
                <button {...props} className={buttonClasses} type="button">
                    <i className={iconClasses}/>&nbsp;{children}
                </button>
            );

        return (
            <button {...props} className={buttonClasses} type="button">
                <i className={iconClasses}/>
            </button>
        );
    }

    return (
        <button {...props} className={buttonClasses} type="button">
            {children}
        </button>
    );
};

export default CustomButton;