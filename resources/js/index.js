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
    const level = store.getState().level.level !== "badSpot" ? store.getState().level.level : "bad_spot";
    const url = "/api/" + level + "/" + store.getState().level.id + "/reset_cars";
    axios.get(url)
        .then(res => {
            store.dispatch(setCars(res.data))
        });
};

ReactDOM.render(
    <Provider store={store}>
        {setOrganizationsPreload(store.dispatch)}
        <VisiblePoints />
    </Provider>,
    document.getElementById('root')
);
