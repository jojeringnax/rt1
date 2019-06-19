import React from 'react';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {
    setAminationMap, setAminationSideBar,
    setBounds,
    setBrigades, setCars,
    setLevel,
    setStatisticDepartment, setStructure
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
                        '<div class="bb"><span class="bb-num-brigade">'
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
        if (this.state.children.length === 0) {
            alert('Нет машин в данной бригаде');
            return false;
        }
        store.dispatch(setAminationMap(true));
        store.dispatch(setAminationSideBar(true));

        store.dispatch(setStructure('brigade', this.props.id, this.props.name));
        store.dispatch(setBrigades({divisions: []}));
        store.dispatch(setCars(this.state.children));
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setLevel('brigade', this.props.id));
        store.dispatch(setStatisticDepartment(this.state.statistic));
        setTimeout(function () {
            store.dispatch(setAminationSideBar(false));
            store.dispatch(setAminationMap(false));
        },600);

        if(this.state.children.cars !== []) {
            let url = "/api/" + store.getState().level.level + "/" + store.getState().level.id + "/reset_cars";
            window.resetCars = setInterval(() => {
                axios.get(url)
                    .then(res => {
                        store.dispatch(setCars(res.data));
                    })
            }, 20000);
        }


    };

    componentDidMount() {
        window.onclick.brigade[this.props.id] = this.handleClick;
        let url = '/api/brigade/' + this.props.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    children: res.data.hasOwnProperty('cars') ? res.data.cars : [],
                    bounds: res.data.bounds.bounds
                },()=>{
                    store.dispatch(setAminationMap(false));
                })
            })
            .catch(err => {
                store.dispatch(setAminationMap(false));
            });
        axios.get('api/brigade/' + this.props.id + '/statistic')
            .then(res => {
                this.setState({
                    statistic: res.data
                },()=>{
                    store.dispatch(setAminationSideBar(false));
                })
            })
            .catch(err => {
                store.dispatch(setAminationSideBar(false));
            });
    }

    render() {
        return(
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
        );

    }
}

export default Brigade;
