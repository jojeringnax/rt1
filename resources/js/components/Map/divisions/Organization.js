import HeadOfSideBar from "../../SideBar/SideBar";
import React from "react";
import { Clusterer, Placemark } from 'react-yandex-maps';
import {setLevel, setPoints} from "../../../actions";
import {store} from "../../../index";
import axios from "axios";

class Organization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.date.organization.id,
            company_id: '113',
            description: props.date.organization.description,
            address: props.date.organization.address,
            x_pos: props.date.organization.x_pos,
            y_pos: props.date.organization.y_pos,
            children: [],
            bounds: [],
            template: props.template,
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template: ymaps.templateLayoutFactory.createClass(
                        '<div class="bb">' +
                        '<span class="bb-num-org">'+ this.props.date.carsNumber +
                        '</span> <span class="bb-name">' + this.state.description +
                        '</span></div>'
                    ),
                });
            }
        };
    }



    handleClick = (e) => {
        store.dispatch(setPoints(this.state.children));
    };


    componentDidMount() {
        let url = '/api/organization/' + this.state.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    children:res.data
                })
            })
    }

    render () {
        return (
            <Placemark
                onLoad={this.createTemplateLayoutFactory}
                key={this.state.id}
                geometry={[this.state.x_pos, this.state.y_pos]}
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