import React from 'react';
import ReactDOM from 'react-dom';
import VisiblePoints from './containers/VisiblePoints';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import axios from "axios";
import {setPoints, setOrganizationsPreload, setAutocolumns, resetApp} from "./actions";


export let store = createStore(rootReducer, applyMiddleware(thunk) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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

ReactDOM.render(
    <Provider store={store}>
        {setOrganizationsPreload(store.dispatch)}
        <VisiblePoints />
    </Provider>,
    document.getElementById('root')
);
