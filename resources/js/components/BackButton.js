import React from 'react'
import "./css/MapApp.css"
class BackButton extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <button id="btn-back" className="btn btn-outline-success">Назад</button>
        );

    }
}

export default BackButton;