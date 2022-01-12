import React from 'react';
import cl from './Modal.module.css';

const Modal = ({children, visible, setVisible}) => {
    const rootClasses = [cl.myModal]
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div style={{overflowY: 'auto'}} className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div style={{height: 'fit-content'}}>
                <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;