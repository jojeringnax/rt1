import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {
    setBounds,
    setBrigades, setCars,
    setLevel,
    setSpots,
    setStatisticDepartment
} from "../../../actions";

class Brigade extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            children: [],
            bounds: [],
            template: props.template,
            statistic: {}
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template: ymaps.templateLayoutFactory.createClass(
                        '<div class="bb"><span class="bb-num">'
                        + this.props.carsNumber
                        + '</span> <span id="auto_name" class="bb-name">'
                        + this.props.name
                        +'</span></div>'
                    ),
                });
            }
        };
    }

    handleClick = (e) => {
        if (this.state.children == []) {
            alert('Нет машин в данной бригаде');
            return false;
        }
        store.dispatch(setBrigades({divisions: []}));
        store.dispatch(setCars(this.state.children));
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setLevel('brigade', this.props.id));
        store.dispatch(setStatisticDepartment(this.state.statistic));
    };

    componentDidMount() {
        let url = '/api/brigade/' + this.props.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    children: res.data.hasOwnProperty('cars') ? res.data.cars : [],
                    bounds: res.data.bounds.bounds
                })
            });
        axios.get('api/brigade/' + this.props.id + '/statistic')
            .then(res => {
                this.setState({
                    statistic: res.data
                });
            });
    }

    render() {
        return(
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
        );

    }
}

export default Brigade;