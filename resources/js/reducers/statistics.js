import axios from "axios";
import dispatch from "react-redux"

const statisticDepartment = (state = [], action) => {
    switch (action.type) {
        case 'SET_STATISTIC_DEPARTMENT':
            return action.statistic;
        default:
            return state
    }
};

export default statisticDepartment