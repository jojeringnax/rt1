import React from 'react';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {
    setAminationMap,
    setAminationSideBar,
    setCarClicked,
    setLevel,
    setStatisticCar,
    setStructure
} from "../../../actions";

const statuses = {
    0: 'G',
    1: 'R',
    2: 'TO'
};


class Car extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bounds: [],
            template: null,
            templateClicked: null,
            clicked: this.props.clicked,
            statistic: store.getState().statisticCar
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template:
                        ymaps.templateLayoutFactory.createClass(
                            '<div class="bb" data-status="'+statuses[this.props.status]+'"><span class="' +
                            ((statuses[parseInt(this.props.status)] !== 'R' && statuses[parseInt(this.props.status)] !== 'TO') ? 'bb-num-car' : 'bb-num-car-inline') +
                            '"><img src="' +
                            (statuses[parseInt(this.props.status)] !== 'R' && statuses[parseInt(this.props.status)] !== 'TO' ?
                                '/img/auto_icon/point_blue_' + this.props.type + '.svg' :
                                '/img/auto_icon/point_noIn_' + this.props.type + '.svg') +
                            '" alt="auto"></span></div>'
                        ),
                    templateClicked:
                        ymaps.templateLayoutFactory.createClass(
                            '<div class="bb" data-status="'+statuses[this.props.status]+'"><span class="' +
                            ((statuses[parseInt(this.props.status)] !== 'R' && statuses[parseInt(this.props.status)] !== 'TO') ? 'bb-num-car-white' : 'bb-num-car-inline_checked') +
                            '"><img src="' +
                            (statuses[parseInt(this.props.status)] !== 'R' && statuses[parseInt(this.props.status)] !== 'TO' ?
                                '/img/auto_icon/point_' + this.props.type + '.svg' :
                                '/img/auto_icon/point_noIn_check_' + this.props.type + '.svg') +
                            '" alt="auto"></span></div>'
                        )
                });
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.clicked !== this.props.clicked) {
            this.setState({
                clicked: this.props.clicked
            },()=>{

            });
        }
    }

    handleClick = e => {
        store.dispatch(setStructure('car', this.props.id, this.props.model));
        store.dispatch(setAminationSideBar(true));
        this.setState({
            clicked: true
        });
        axios.get('/api/car/' + this.props.id + '/data', {timeout: 100})
            .then(res => {
                this.setState({
                    statistic: res.data
                },() => {
                    store.dispatch(setLevel('car', this.props.id));
                    store.dispatch(setCarClicked(false));
                    store.dispatch(setStatisticCar(Object.assign(this.state.statistic, this.props)));
                    store.dispatch(setAminationSideBar(false));
                    this.props.functionClicked();
                });
            })
            .catch(err => {
                this.setState({
                    clicked: false
                });
                store.dispatch(setCarClicked(false));
                store.dispatch(setAminationSideBar(false));
                store.dispatch(setAminationMap(false));
                alert("Навигационный терминал в данном ТС временно недоступен");

            })

    };

    componentDidMount() {
        window.onclick.car[this.props.id] = this.handleClick;
    }

    render() {
        return(
            <Placemark
                onLoad={this.createTemplateLayoutFactory}
                geometry={[this.props.x_pos, this.props.y_pos]}
                properties={{
                    balloonContent: this.props.description,
                    balloonContentHeader: this.props.model,
                    balloonContentBody: this.props.number,
                    balloonContentFooter: this.props.status,
                    clusterCaption: 'placemark ' + this.props.id,
                    id: this.props.id,
                    handleClick: this.handleClick,
                    type: this.props.type,
                    model: this.props.model,
                    number: this.props.number,
                    description: this.props.description,
                    status: this.props.status
                }}
                modules={[
                    "geoObject.addon.hint"
                ]}

                options={{
                    hasBalloon: false,
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [62, 67.5],
                    iconContentOffset: [-74, 83],
                    iconImageOffset: [-24, -24],
                    preset: 'islands#greenDotIconWithCaption',
                    iconContentLayout: !this.state.clicked ? this.state.template : this.state.templateClicked,
                    contentLayout: !this.state.clicked ? this.state.template : this.state.templateClicked
                }}
                onClick={this.handleClick}
            />
        );

    }
}

export default Car;
