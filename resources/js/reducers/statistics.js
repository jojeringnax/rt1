import axios from "axios";
import dispatch from "react-redux"

const statistics = (state = [], action) => {
    switch (action.type) {
        case 'SET_STATISTICS':
            return action.statistics;
        default:
            return state
    }
};

export default statistics