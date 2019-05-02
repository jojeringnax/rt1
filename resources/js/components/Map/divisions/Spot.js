import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {setSpots, setBounds, setBrigades, setCars, setLevel, setStatisticDepartment} from "../../../actions";

class Spot extends React.Component{
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
        if (this.state.children.brigades === [] && this.state.children.cars === []) {
            return alert('Нет ни бригад, ни автомобилей у данного участка');
        }
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setSpots({divisions: []}));
        store.dispatch(setBrigades({divisions: this.state.children.brigades}));
        store.dispatch(setCars(this.state.children.cars));
        store.dispatch(setLevel('spot', this.props.id));
        store.dispatch(setStatisticDepartment(this.state.statistic));
        console.log('props', this.props);
        console.log('states', this.state)
    };


    componentDidMount() {
        let url = '/api/spot/' + this.props.id + '/children';
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
        axios.get('api/spot/' + this.props.id + '/statistic')
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

export default Spot;