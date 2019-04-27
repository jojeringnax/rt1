import { Levels } from "../actions";

const level = (state = Levels.company, action) => {

    switch(action.type) {

        case 'SET_LEVEL':
            return action.level;

        case 'SET_POINTS':
            return [
                ...state,
                {
                    points: action.points
                }
            ];
        default:
            return state;
    }

};

export default level;