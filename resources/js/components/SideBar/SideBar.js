import React from "react";
import ReactDOM from "react-dom";
import "../css/SideBar.css"
import InfoCompanyInSideBar from "./SideBarSections/InfoCompanyInSideBar";
import InfoDepartmentInSideBar from "./SideBarSections/InfoDepartmentInSideBar";
import InfoTsInSideBar from "./SideBarSections/InfoTsInSideBar";
import HeadOfSideBar from "./SideBarSections/HeadOfSideBar";
import NavigationInSideBar from "./SideBarSections/NavigationInSideBar";

class SideBar extends React.Component{
    render() {
        return(
            <div className="sideBar">
                <HeadOfSideBar />
                <NavigationInSideBar />
                <InfoCompanyInSideBar />
                <InfoDepartmentInSideBar />
                <InfoTsInSideBar />
            </div>
        );

    }
}

export default SideBar;