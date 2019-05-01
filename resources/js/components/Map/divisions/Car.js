import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {setCarClicked, setLevel} from "../../../actions";

class Car extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bounds: [],
            template: null,
            templateClicked: null,
            clicked: this.props.clicked
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template:
                        ymaps.templateLayoutFactory.createClass(
                            '<div class="bb"><span class="' +
                            ((this.props.status !== 'R' && this.props.status !== 'TO') ? 'bb-num-car' : 'bb-num-car-inline') +
                            '"><img src="' +
                            (this.props.status !== 'R' && this.props.status !== 'TO' ?
                                '/images/auto_icon/point_blue_' + this.props.type + '.svg' :
                                '/images/auto_icon/point_noIn_' + this.props.type + '.svg') +
                            '" alt="auto"></span></div>'
                        ),
                    templateClicked:
                        ymaps.templateLayoutFactory.createClass(
                            '<div class="bb"><span class="' +
                            ((this.props.status !== 'R' && this.props.status !== 'TO') ? 'bb-num-car-white' : 'bb-num-car-inline_checked') +
                            '"><img src="' +
                            (this.props.status !== 'R' && this.props.status !== 'TO' ?
                                '/images/auto_icon/point_' + this.props.type + '.svg' :
                                '/images/auto_icon/point_noIn_check_' + this.props.type + '.svg') +
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
            });
        }

    }

    handleClick = e => {
        store.dispatch(setLevel('car', this.props.id));
        store.dispatch(setCarClicked(false));
        this.setState({
            clicked: true
        });
        this.props.functionClicked();
    };

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
                    iconContentLayout: !this.state.clicked ? this.state.template : this.state.templateClicked,
                    contentLayout: !this.state.clicked ? this.state.template : this.state.templateClicked
                }}
                onClick={this.handleClick}
            />
        );

    }
}

export default Car;