import {connect} from 'react-redux';
import InfoTs from '../components/SideBar/SideBarSections/InfoTs'

const mapStateToProps = state => ({
    statistic: state.statisticCar
});

export default connect(
    mapStateToProps
)(InfoTs)