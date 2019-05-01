import {connect} from 'react-redux';
import Car from '../components/Map/divisions/Car'

const mapStateToProps = state => ({
    clicked: state.clicked
});

export default connect(
    mapStateToProps
)(Car)