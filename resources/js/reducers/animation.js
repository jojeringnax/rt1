export const animationSideBar = (state = true, action) => {
    switch (action.type) {
        case 'SET_ANIMATION_SIDEBAR':
            return action.animation;
        default:
            return state
    }
};

export const animationMap = (state = true, action) => {
    switch (action.type) {
        case 'SET_ANIMATION_MAP':
            return action.animation;
        default:
            return state
    }
};