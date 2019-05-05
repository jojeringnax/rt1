import React from "react";

import InfoCompany from "./SideBarSections/InfoCompany";
import InfoDepartment from "../../containers/InfoDepartment";
import Head from "./SideBarSections/Head";
import NavigationInSideBar from "./SideBarSections/NavigationInSideBar";
import InfoTs from "../../containers/InfoTS";

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
    }

    componentDidUpdate(prevProps, prevState) {
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