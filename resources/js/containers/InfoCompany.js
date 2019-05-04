import {connect} from 'react-redux';
import InfoCompany from '../components/SideBar/SideBarSections/InfoCompany'

const mapStateToProps = state => ({
    statistic: state.statisticCompany
});

export default connect(
    mapStateToProps
)(InfoCompany)