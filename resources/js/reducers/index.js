import { combineReducers } from 'redux'
import level from './level'
import {organizations, autocolumns, cars, brigades, badSpots, spots} from './divisions'
import {statisticDepartment, statisticCar, statisticCompany} from './statistics'
import bounds from './bounds'
import structure from './structure'
import {animationSideBar, animationMap} from "./animation";

export default combineReducers({
    animationSideBar,
    animationMap,
    level,
    organizations,
    autocolumns,
    cars,
    brigades,
    badSpots,
    spots,
    bounds,
    statisticDepartment,
    statisticCompany,
    statisticCar,
    structure
})