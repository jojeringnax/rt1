import { combineReducers } from 'redux'
import points from './points'
import level from './level'
import {organizations, autocolumns, cars, brigades, badSpots, spots} from './divisions'
import statisticDepartment from './statistics'
import bounds from './bounds'
import clicked from './clicked'

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
    clicked
})