

const clicked = (state = false, action) => {
    switch (action.type) {
        case 'SET_CAR_CLICKED':
            return action.clicked;
        default:
            return state
    }
};

export default clicked