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
import {images} from "./SideBar/SideBarSections/InfoDepartment";

class BackButton extends React.Component{
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        store.dispatch(setAminationMap(true));
        store.dispatch(setAminationSideBar(true));
        const numberTransportDepartment = document.querySelectorAll('.transport-department');
        numberTransportDepartment.forEach(function(elem){
            elem.getAttribute('data-typecar') === "4" ? elem.classList.add('activeTransport') :  elem.classList.remove('activeTransport');
        });
        const numberImgTransportDepartment = document.querySelectorAll('.img-transport');
        numberImgTransportDepartment.forEach(function(elementImg){
            elementImg.setAttribute('src', images.notActive[parseInt(elementImg.getAttribute('data-imgtypecar'))]);
        });

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

        const idNeeded = store.getState().structure[elementNeeded]['id'];
        if (needToClear) {
            store.dispatch(toClear({divisions: []}));
        }
        store.dispatch(setAminationMap(false));
        store.dispatch(setAminationSideBar(false));
        store.dispatch(setCarClicked(false));
        store.dispatch(setCars([]));
        store.dispatch(setStructure(currentLevel, null, 'Нет имени'));
        return window.onclick[elementNeeded][idNeeded]();A
    };

    render() {
        return(
            <button onClick={this.handleClick} id="btn-back" className="btn btn-outline-success">Назад</button>
        );

    }
}

export default BackButton;
