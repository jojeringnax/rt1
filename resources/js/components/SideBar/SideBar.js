import React from "react";
import ReactDOM from "react-dom";
import "../css/SideBar.css"
import InfoCompany from "./SideBarSections/InfoCompany";
import InfoDepartment from "../../containers/InfoDepartment";
import InfoTs from "./SideBarSections/InfoTs";
import Head from "./SideBarSections/Head";
import NavigationInSideBar from "./SideBarSections/NavigationInSideBar";

class SideBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            infoCompany: true,
            infoDepartment: false,
            infoTS: false,
        }
}
    componentDidMount() {
        this.setState({
            infoCompany: this.props.level.level === 'company',
            infoDepartment: ['organization', 'spot', 'badSpot', 'autocolumn', 'brigade'].includes(this.props.level.level),
            infoTS: this.props.level.level === 'car'})


        // let url = '/api/' + this.props.level + '/statistics';
        // axios.get(url)
        //     .then((res) => {
        //         store.dispatch(setStatistic(res.data));
        //     });
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(prevProps, this.state, this.props);
        if (prevProps.level.level !== this.props.level.level) {
            this.setState({infoCompany: this.props.level.level === 'company'});
            this.setState({infoDepartment: ['organization', 'spot', 'badSpot', 'autocolumn', 'brigade'].
                includes(this.props.level.level)});
            this.setState({infoTS: this.props.level.level === 'car'});
        }
    }

    render() {
        return(
            <div className="sideBar">
                <Head />
                <NavigationInSideBar />
                <InfoCompany show={this.state.infoCompany} />
                <InfoDepartment show={this.state.infoDepartment} />
                <InfoTs show={this.state.infoTS} />
            </div>
        );

    }
}

export default SideBar;