import React from 'react';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {
    setAutocolumns,
    setBadSpots,
    setBounds,
    setBrigades,
    setCars,
    setLevel,
    setStatisticDepartment,
    setStructure
} from "../../../actions";

class BadSpot extends React.Component{
    constructor(props) {
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
                        '<div class="bb"><span class="bb-num-spot">'
                        + this.props.carsNumber
                        + '</span> <span id="spot_name" class="bb-name">'
                        + this.props.name
                        +'</span></div>'
                    ),
                });
            }
        };
    }



    handleClick = (e) => {
        if (this.state.children.brigades.length === 0 && this.state.children.cars.length === 0) {
            alert("Нет ни бригад, ни автомобилей на данном участке");
            return false;
        }
        store.dispatch(setStructure('badSpot', this.props.id, this.props.name));
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setBadSpots({divisions: []}));
        store.dispatch(setAutocolumns({divisions: []}));
        store.dispatch(setBrigades({divisions: this.state.children.brigades}));
        store.dispatch(setLevel("badSpot", this.props.id));
        store.dispatch(setCars(this.state.children.cars));
        store.dispatch(setStatisticDepartment(this.state.statistic));
    };


    componentDidMount() {
        window.onclick.badSpot[this.props.id] = this.handleClick;
        let url = '/api/bad_spot/' + this.props.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    children: {
                        brigades: res.data.hasOwnProperty('divisions') ? res.data.divisions : [],
                        cars: res.data.hasOwnProperty('cars') ? res.data.cars : []
                    },
                    bounds:res.data.bounds.bounds
                })
            });
        axios.get('api/bad_spot/' + this.props.id + '/statistic')
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
                    carsNumber: this.props.carsNumber,
                    description: this.props.description,
                    children: this.state.children,
                    statistic: this.state.statistic,
                    id: this.props.id,
                    bounds: this.state.bounds,
                    handleClick: this.handleClick
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

export default BadSpot;