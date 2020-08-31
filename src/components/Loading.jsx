import React from 'react';

const Loading = () => {
    return (
        //Loading resource from https://getbootstrap.com/docs/4.5/components/spinners/
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;