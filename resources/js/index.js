import React from 'react';
import ReactDOM from 'react-dom';
import VisiblePoints from './containers/VisiblePoints';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {setOrganizationsPreload, resetApp, setCars} from "./actions";
import axios from "axios";


export let store = createStore(rootReducer, applyMiddleware(thunk) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.config = {
    interval: 30000
};


window.onclick = {
    company: {
        113: () => {
            store.dispatch(resetApp());
            setOrganizationsPreload(store.dispatch);
        }
    },
    organization:{},
    autocolumn: {},
    badSpot: {},
    spot: {},
    brigade: {},
    car: {}
};



window.resetCars = () => {
    let level = store.getState().level.level !== "badSpot" ? store.getState().level.level : "bad_spot";
    let id = store.getState().level.id;
    const structure = store.getState().structure;
    if (level === "car") {
        console.log("User has chosen a car, so we need to take the level before");
        if (structure.spot.id !== null) {
            level = structure.brigade.id !== null ? "brigade" : "spot";
            id = structure.brigade.id !== null ? structure.brigade.id : structure.spot.id;
        } else if (structure.badSpot.id !== null) {
            level = structure.brigade.id !== null ? "brigade" : "bad_spot";
            id = structure.brigade.id !== null ? structure.brigade.id : structure.badSpot.id;
        }
    }
    const url = "/api/" + level + "/" + id + "/reset_cars";
    axios.get(url)
        .then(res => {
            if (typeof res.data === "object") {
                store.dispatch([]);
                store.dispatch(setCars(res.data, false));
            } else {
                console.warn("Via reset_cars-method we have got a "+typeof res.data);
            }
        });
};

ReactDOM.render(
    <Provider store={store}>
        {setOrganizationsPreload(store.dispatch)}
        <VisiblePoints />
    </Provider>,
    document.getElementById('root')
);
