import {connect} from 'react-redux';
import InfoDepartment from '../components/SideBar/SideBarSections/InfoDepartment'

const mapStateToProps = state => ({
    statistic: state.statisticDepartment
});

export default connect(
    mapStateToProps
)(InfoDepartment)