import { Levels } from "../actions";

const level = (state = Levels.company, action) => {

    switch(action.type) {

        case 'SET_LEVEL':
            return action.level;
        default:
            return state;
    }

};

export default level;