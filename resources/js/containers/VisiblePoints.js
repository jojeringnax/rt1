import { connect } from 'react-redux';
import MapApp from "../components/Map/AppMap";
import {animationSideBar} from "../reducers/animation";

const mapStateToProps = state => ({
    level: state.level,
    organizations: state.organizations,
    autocolumns: state.autocolumns,
    badSpots: state.badSpots,
    spots: state.spots,
    brigades: state.brigades,
    bounds: state.bounds,
    cars: state.cars,
    animationSideBar: state.animationSideBar,
    animationMap: state.animationMap
});


export default connect(
    mapStateToProps
)(MapApp)

