
export const organizations = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'SET_ORGANIZATIONS':
            return action.organizations;
        default:
            return state
    }
};

export const autocolumns = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'SET_AUTOCOLUMNS':
            return action.autocolumns;
        default:
            return state;
    }
};

export const badSpots = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'SET_BAD_SPOTS':
            return action.badSpots;
        default:
            return state;
    }
};

export const spots = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'SET_SPOTS':
            return action.spots;
        default:
            return state;
    }
};

export const brigades = (state = {divisions: []}, action) => {
    switch (action.type) {
        case 'SET_BRIGADES':
            return action.brigades;
        default:
            return state;
    }
};

export const cars = (state = {cars: []}, action) => {
    switch (action.type) {
        case 'SET_CARS':
            return action.cars;
        default:
            return state;
    }
};