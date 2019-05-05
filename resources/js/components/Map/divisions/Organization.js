import HeadOfSideBar from "../../SideBar/SideBar";
import React from "react";
import { Placemark } from 'react-yandex-maps';
import {
    setAutocolumns,
    setBounds,
    setOrganizations,
    setBadSpots,
    setLevel,
    setStatisticDepartment, setStructure
} from "../../../actions";
import {store} from "../../../index";
import axios from "axios";

class Organization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            children: {
                badSpots: [],
                autocolumns: []
            },
            bounds: [],
            template: null,
            statistic: {}
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template: ymaps.templateLayoutFactory.createClass(
                        '<div class="bb">' +
                        '<span class="bb-num-org">'+ this.props.carsNumber +
                        '</span> <span class="bb-name">' + this.props.description +
                        '</span></div>'
                    ),
                });
            }
        };
    }



    handleClick = (e) => {
        if(this.state.children.autocolumns.length === 0 && this.state.children.badSpots.length === 0) {
            alert('Нет ни автоколонн, ни участков у данной организации');
            return false;
        }
        store.dispatch(setStructure('organization', this.props.id, this.props.description));
        store.dispatch(setOrganizations({divisions:[]}));
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setBadSpots({divisions: this.state.children.badSpots}));
        store.dispatch(setAutocolumns({divisions: this.state.children.autocolumns}));
        store.dispatch(setStatisticDepartment(this.state.statistic));
        store.dispatch(setLevel('organization', this.props.id));
    };


    componentDidMount() {
        window.onclick.organization[this.props.id] = this.handleClick;
        axios.get('/api/organization/' + this.props.id + '/children')
            .then(res => {
                this.setState({
                    bounds: res.data.bounds.bounds
                });
                let autocolumns = [];
                let badSpots = [];
                res.data.divisions.forEach(child => {
                    if (child.hasOwnProperty('autocolumn')) {
                        autocolumns.push(child);
                    } else if (child.hasOwnProperty('bad_spot')) {
                        badSpots.push(child);
                    }
                });
                this.setState({
                    children: {
                        badSpots: badSpots,
                        autocolumns: autocolumns
                    }
                });
            });
        axios.get('api/organization/' + this.props.id + '/statistic')
            .then(res => {
                this.setState({
                    statistic: res.data
                });
            });
    }

    render () {
        return (
            <Placemark
                onLoad={this.createTemplateLayoutFactory}
                geometry={[this.props.x_pos, this.props.y_pos]}
                properties={{
                    iconCaption : 'asd'
                }}
                modules={[
                    "geoObject.addon.hint"
                ]}

                options={{
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [62, 67.5],
                    iconContentOffset: [-74, 83],
                    iconImageOffset: [-24, -24],
                    preset: 'islands#greenDotIconWithCaption',
                    iconContentLayout: this.state.template
                }}
                onClick={this.handleClick}
            />
        )
    }
}

export default Organization