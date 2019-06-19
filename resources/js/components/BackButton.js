import React from 'react'
import "./css/MapApp.css"
import {store} from '../index'
import {
    setAminationMap,
    setAminationSideBar,
    setBrigades,
    setCarClicked,
    setCars,
    setSpots,
    setStructure
} from "../actions";
import axios from "axios";

class BackButton extends React.Component{
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        const str = store.getState().structure;
        const isWithBadSpot = str.badSpot.id !== null;
        const isWithBrigade = str.brigade.id !== null;
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
                elementNeeded = isWithBrigade ? 'brigade' : (isWithBadSpot ? 'badSpot' : 'spot');
                needToClear = false;
                break;

            default:
                return false;
        }
        if(window.hasOwnProperty('resetCars')) {
            clearInterval(window.resetCars);
            if(store.getState().cars !== []) {
                let url = "/api/" + store.getState().level.level + "/" + store.getState().level.id + "/reset_cars";
                window.resetCars = setInterval(() => {
                    axios.get(url)
                        .then(res => {
                            store.dispatch(setCars(res.data));
                        })
                }, 20000);
            }
        }

        const idNeeded = store.getState().structure[elementNeeded]['id'];
        if (needToClear) {
            store.dispatch(toClear({divisions: []}));
        }
        store.dispatch(setAminationMap(false));
        store.dispatch(setAminationSideBar(false));
        store.dispatch(setCarClicked(false));
        store.dispatch(setCars([]));
        store.dispatch(setStructure(currentLevel, null, 'Нет имени'));
        return window.onclick[elementNeeded][idNeeded]();

    };

    render() {
        return(
            <button onClick={this.handleClick} id="btn-back" className="btn btn-outline-success">Назад</button>
        );

    }
}

export default BackButton;
