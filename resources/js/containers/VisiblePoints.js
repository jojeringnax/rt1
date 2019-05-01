import { connect } from 'react-redux';
import MapApp from "../components/Map/AppMap";

const mapStateToProps = state => ({
    points: state.points,
    level: state.level,
    organizations: state.organizations,
    autocolumns: state.autocolumns,
    badSpots: state.badSpots,
    spots: state.spots,
    brigades: state.brigades,
    bounds: state.bounds,
    cars: state.cars
});


export default connect(
    mapStateToProps
)(MapApp)

