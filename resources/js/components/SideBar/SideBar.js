import React from "react";
import ReactDOM from "react-dom";
import "../css/SideBar.css"
import InfoCompanyInSideBar from "./SideBarSections/InfoCompanyInSideBar";
import InfoDepartmentInSideBar from "./SideBarSections/InfoDepartmentInSideBar";
import InfoTsInSideBar from "./SideBarSections/InfoTsInSideBar";
import HeadOfSideBar from "./SideBarSections/HeadOfSideBar";
import NavigationInSideBar from "./SideBarSections/NavigationInSideBar";
import {setLevel, setStatistic} from "../../actions";
import {store} from "../../index";
import axios from "axios";

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
                <button onClick={()=>{store.dispatch(setLevel("autocolumn"))}}>Click</button>
                <HeadOfSideBar />
                <NavigationInSideBar />
                <InfoCompanyInSideBar show={this.state.infoCompany} />
                <InfoDepartmentInSideBar show={this.state.infoDepartment} />
                <InfoTsInSideBar show={this.state.infoTS} />
            </div>
        );

    }
}

export default SideBar;