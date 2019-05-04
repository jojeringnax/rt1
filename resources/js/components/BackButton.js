import React from 'react'
import "./css/MapApp.css"
import {store} from '../index'
import {setBrigades, setCarClicked, setCars, setSpots, setStructure} from "../actions";

class BackButton extends React.Component{
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        const isWithBadSpot = store.getState().structure.badSpot !== null;
        const currentLevel = store.getState().level.level;
        let elementNeeded;
        let toClear;
        let needToClear = true;
        switch(currentLevel) {
            case 'organization':
                elementNeeded = 'company';
                needToClear = false;
                break;

            case 'autocolumn':
                elementNeeded = 'organization';
                toClear = setSpots;
                break;

            case 'badSpot':
                elementNeeded = 'organization';
                toClear = setBrigades;
                break;

            case 'spot':
                elementNeeded = 'autocolumn';
                toClear = setBrigades;
                break;

            case 'brigade':
                elementNeeded = isWithBadSpot ? 'badSpot' : 'spot';
                needToClear = false;
                break;

            case 'car':
                elementNeeded = isWithBadSpot ? 'badSpot' : 'spot';
                needToClear = false;
                break;

            default:
                return false;
        }
        const idNeeded = store.getState().structure[elementNeeded];
        if (needToClear) {
            store.dispatch(toClear({divisions: []}));
        }
        store.dispatch(setCarClicked(false));
        store.dispatch(setCars([]));
        store.dispatch(setStructure(currentLevel, null));
        return window.onclick[elementNeeded][idNeeded]();
    };

    render() {
        return(
            <button onClick={this.handleClick} id="btn-back" className="btn btn-outline-success">Назад</button>
        );

    }
}

export default BackButton;