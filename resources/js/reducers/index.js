import { combineReducers } from 'redux'
import points from './points'
import level from './level'
import {organizations, autocolumns, cars, brigades, badSpots, spots} from './divisions'
import bounds from './bounds'

export default combineReducers({
    points,
    level,
    organizations,
    autocolumns,
    cars,
    brigades,
    badSpots,
    spots,
    bounds
})