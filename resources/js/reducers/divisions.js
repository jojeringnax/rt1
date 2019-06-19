
export const organizations = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = {divisions: []};
        case 'SET_ORGANIZATIONS':
            return action.organizations;
        default:
            return state
    }
};

export const autocolumns = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = {divisions: []};
        case 'SET_AUTOCOLUMNS':
            return action.autocolumns;
        default:
            return state;
    }
};

export const badSpots = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = {divisions: []};
        case 'SET_BAD_SPOTS':
            return action.badSpots;
        default:
            return state;
    }
};

export const spots = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = {divisions: []};
        case 'SET_SPOTS':
            return action.spots;
        default:
            return state;
    }
};

export const brigades = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = {divisions: []};
        case 'SET_BRIGADES':
            return action.brigades;
        default:
            return state;
    }
};

export const cars = (state = [], action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = [];
        case 'SET_CARS':
            if (Object.keys(action.cars).length) {
                if (window.hasOwnProperty("intervalResetCars")) {
                    clearInterval(window.intervalResetCars);
                }
                window.intervalResetCars = setInterval(window.resetCars, window.config.interval);
            } else {
                if (window.hasOwnProperty("intervalResetCars")) {
                    clearInterval(window.intervalResetCars);
                }
            }
            return action.cars;
        default:
            return state;
    }
};