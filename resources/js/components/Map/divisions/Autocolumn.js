import React from 'react';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {setSpots, setAutocolumns, setBadSpots, setBounds, setLevel, setStatisticDepartment} from "../../../actions";

class Autocolumn extends React.Component{

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
        if (this.state.children === []) {
            return alert('Нет участков у данной автоколонны');
        }
        store.dispatch(setAutocolumns({divisions: []}));
        store.dispatch(setBadSpots({divisions: []}));
        store.dispatch(setSpots({divisions: this.state.children}));
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setLevel('autocolumn', this.props.id));
        store.dispatch(setStatisticDepartment(this.state.statistic));
    };


    componentDidMount() {
        window.onclick.autocolumns[this.props.id] = this.handleClick;
        let url = '/api/autocolumn/' + this.props.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    children: res.data.hasOwnProperty('divisions') ? res.data.divisions : [],
                    bounds: res.data.bounds.bounds
                })
            });
        axios.get('api/autocolumn/' + this.props.id + '/statistic')
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


export default Autocolumn;