import { connect } from 'react-redux';
import { setLevel, clickPoint, setPoints } from "../actions";
import axios from 'axios';
import MapApp from "../components/Map/AppMap";

const getPoints = (level, id) => {

    let points = [];
    switch(level) {
        case 'company':
            let insidePoints = [];
            return dispatch => {
                axios.get('/api/organizations')
                    .then(  async res => {
                        await res.data.divisions.forEach(point => {
                            points.push({
                                type: 'organization',
                                point: point
                            });
                        });
                        dispatch(setPoints(points));
                    });
            };


        case 'organizations':
            axios.get('api/autocolumns/' + id)
                .then(async res => {
                    await res.data.forEach(point => {
                        points.push({
                            type: 'autocolumn',
                            point: point
                        });
                    });
                    axios.get('api/badSpots/' + id)
                        .then(async res => {
                            await res.data.forEach(point => {
                                points.push({
                                    type: 'badSpot',
                                    point: point
                                });
                            });
                        });
                });
            return points;

        case 'autocolumn':
            axios.get('api/spots/' + id)
                .then( async res => {
                    await res.data.forEach(point => {
                        points.push({
                            type: 'spot',
                            point: point
                        });
                    });
                });
            return points;

        case 'badSpot':
            axios.get('api/badSpot/' + id + '/brigades')
                .then(async res => {
                    await res.data.forEach(point => {
                        points.push({
                            type: 'brigade',
                            point: point
                        });
                    });
                    axios.get('api/badSpot/' + id + '/cars')
                        .then(async res => {
                            await res.data.forEach(point => {
                                points.push({
                                    type: 'car',
                                    point: point
                                });
                            });
                        });
                });
            return points;

        case 'spot':
            axios.get('api/spot/' + id + '/brigades')
                .then(async res => {
                    await res.data.forEach(point => {
                        points.push({
                            type: 'brigade',
                            point: point
                        });
                    });
                    axios.get('api/spot/' + id + '/cars')
                        .then(async res => {
                            await res.data.forEach(point => {
                                points.push({
                                    type: 'car',
                                    point: point
                                });
                            });
                        });
                });
            return points;

        case 'brigade':
            axios.get('/api/cars' + id)
                .then( async res => {
                    await res.data.forEach(point => {
                        points.push({
                            type: 'car',
                            point: point
                        });
                    });
                });
            return points;

        default:
            axios.get('/api/organizations')
                .then( async res => {
                    await res.data.divisions.forEach(point => {
                        points.push({
                            type: 'korolPidarov',
                            point: point
                        })
                    });
                });
            return points;
    }
};





const mapStateToProps = state => ({
    points: state.points,
    level: state.level
});

const mapDispatchToProps = dispatch => ({
    setLevel: level => dispatch(setLevel(level)),
    setPoints: points => dispatch(setPoints(points))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapApp)

