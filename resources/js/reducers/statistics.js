import axios from "axios";
import dispatch from "react-redux"

export const statisticDepartment = (state = [], action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = [];
        case 'SET_STATISTIC_DEPARTMENT':
            return action.statistic;
        case 'SET_STATISTIC_COMPANY':
            return action.statistic;
        case 'SET_STATISTIC_CAR' :
            return action.statistic;
        default:
            return state
    }
};

export const statisticCompany = (state = [], action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = [];
        case 'SET_STATISTIC_COMPANY':
            return action.statistic;
        default:
            return state
    }
};

export const statisticCar = (state = [], action) => {
    switch (action.type) {
        case 'RESET_APP':
            return state = [];
        case 'SET_STATISTIC_CAR' :
            return action.statistic;
        default:
            return state
    }
};

