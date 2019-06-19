import React from 'react';

class Head extends React.Component{
    render() {
        return(
            <div className="head-of-sidebar">
                <div className="logo">
                    <div className="img-logo">
                        <img src='/img/logo.svg' alt="Logo Русурс Транс" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Head;
