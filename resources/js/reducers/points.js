


const points = (state = {divisions: [], bounds: []}, action) => {
    switch (action.type) {
        case 'SET_POINTS':
            return action.points;
        default:
            return state
    }
};

export default points