import { Levels } from "../actions";

const level = (state = {level: Levels.company, id: null}, action) => {

    switch(action.type) {
        case 'SET_LEVEL':
            return {level: action.level, id: action.id};
        default:
            return state;
    }

};

export default level;