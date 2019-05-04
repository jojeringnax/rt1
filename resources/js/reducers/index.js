import { combineReducers } from 'redux'
import points from './points'
import level from './level'
import {organizations, autocolumns, cars, brigades, badSpots, spots} from './divisions'
import {statisticDepartment, statisticCar, statisticCompany} from './statistics'
import bounds from './bounds'
import structure from './structure'

export default combineReducers({
    points,
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