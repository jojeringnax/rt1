

const clicked = (state = false, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = false;
        case 'SET_CAR_CLICKED':
            return action.clicked;
        default:
            return state
    }
};

export default clicked