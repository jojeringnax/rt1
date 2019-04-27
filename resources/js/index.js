import React from 'react';
import ReactDOM from 'react-dom';
import VisiblePoints from './containers/VisiblePoints';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';


ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <VisiblePoints />
    </Provider>,
    document.getElementById('root')
);