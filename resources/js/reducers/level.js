import { Levels } from "../actions";

const level = (state = {level: Levels.company, id: 113}, action) => {

    switch(action.type) {
        case 'RESET_APP':
            return state = {level: Levels.company, id: 113};
        case 'SET_LEVEL':
            return {level: action.level, id: action.id};
        default:
            return state;
    }

};

export default level;