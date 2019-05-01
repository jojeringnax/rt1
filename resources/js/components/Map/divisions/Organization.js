import HeadOfSideBar from "../../SideBar/SideBar";
import React from "react";
import { Clusterer, Placemark } from 'react-yandex-maps';
import {setAutocolumns, setBounds, setOrganizations, setBadSpots, setLevel} from "../../../actions";
import {store} from "../../../index";
import axios from "axios";

class Organization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            children: [],
            bounds: [],
            template: props.template,
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
        store.dispatch(setOrganizations({divisions:[]}));
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setBadSpots({divisions: this.state.children.badSpots}));
        store.dispatch(setAutocolumns({divisions: this.state.children.autocolumns}));
        store.dispatch(setLevel('organization', this.props.id))
    };


    componentDidMount() {
        let url = '/api/organization/' + this.props.id + '/children';
        axios.get(url)
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