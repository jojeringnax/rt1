


const points = (state = {divisions: [], bounds: []}, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = {divisions: [], bounds: []};
        case 'SET_POINTS':
            return action.points;
        default:
            return state
    }
};

export default points