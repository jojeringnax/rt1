import React from 'react';
import ReactDOM from 'react-dom';
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
    setStatisticDepartment
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



    handleClick = e => {
        if (this.state.children.brigades === [] && this.state.children.cars === []) {
            return alert("Нет ни бригад, ни автомобилей на данном участке");
        }
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setBadSpots({divisions: []}));
        store.dispatch(setAutocolumns({divisions: []}));
        store.dispatch(setBrigades({divisions: this.state.children.brigades}));
        store.dispatch(setLevel("badSpot", this.props.id));
        store.dispatch(setCars(this.state.children.cars));
        store.dispatch(setStatisticDepartment(this.state.statistic));
    };


    componentDidMount() {
        window.onclick.badspots[this.props.id] = this.handleClick;
        console.log(window.onclick);
        let url = '/api/bad_spot/' + this.props.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    bounds:res.data.bounds.bounds
                });
                this.setState({
                    children: {
                        brigades: res.data.hasOwnProperty('divisions') ? res.data.divisions : [],
                        cars: res.data.hasOwnProperty('cars') ? res.data.cars : []
                    }
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