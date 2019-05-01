import React from 'react';
import ReactDOM from 'react-dom';
import logo from "../../img/logo.svg";

class HeadOfSideBar extends React.Component{
    render() {
        return(
            <div className="head-of-sidebar">
                <div className="logo">
                    <div className="img-logo">
                        <img src={logo} alt="Logo Русурс Транс" />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeadOfSideBar;