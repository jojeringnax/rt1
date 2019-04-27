import React from 'react';
import ReactDOM from 'react-dom';

class HeadOfSideBar extends React.Component{
    render() {
        return(
            <div className="head-of-sidebar">
                <div className="logo">
                    <div className="img-logo">
                        <img src="yan/img/logo.svg" alt="Logo Русурс Транс" />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeadOfSideBar;