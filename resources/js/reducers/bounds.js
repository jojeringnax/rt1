const bounds = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOUNDS':
            return action.bounds;
        default:
            return state
    }
};

export default bounds