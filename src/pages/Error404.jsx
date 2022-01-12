import React from 'react';

const Error404 = () => {
    return (
        <div className="container" style={{marginTop: 100}}>
            <i className="fa fa-ban d-flex justify-content-center"
               style={{fontSize: 150, color: 'var(--bs-gray-500)'}}/>
            <h1 className='text-center' style={{fontSize: 80.88}}>Oops!</h1>
            <h1 className='text-center'>It looks like you have a 404 error :(</h1>
            <p className="text-center">Requested page does not exist.</p>
        </div>
    );
};

export default Error404;