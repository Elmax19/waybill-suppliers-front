import React, {useEffect, useState} from 'react';
import CustomButton from "./CustomButton";

const Toggle = ({children, colorStyle, icon, on, tag, toggle, ...props}) => {
    let onState = colorStyle;
    let offState = `outline-${colorStyle}`;
    let currentState = on ? onState : offState;

    let [styleType, setStyleType] = useState(currentState);

    useEffect(() => {
        setStyleType(currentState);
    }, [currentState]);

    return (
        <CustomButton
            {...props}
            onClick={() => toggle(tag, !on)}
            styleType={styleType}
            icon={icon}>
            {children}
        </CustomButton>
    );
};

export default Toggle;