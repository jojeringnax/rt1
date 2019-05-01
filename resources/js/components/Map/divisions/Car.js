import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {setLevel} from "../../../actions";

class Car extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bounds: [],
            templateBeforeClick: null,
            templateAfterClick: null
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    templateBeforeClick:
                        ymaps.templateLayoutFactory.createClass(
                            '<div class="bb"><span class="' +
                            ((this.props.status !== 'R' && this.props.status !== 'TO') ? 'bb-num-car' : 'bb-num-car-inline') +
                            '"><img src="' +
                            (this.props.status !== 'R' && this.props.status !== 'TO' ?
                                '/images/auto_icon/point_blue_' + this.props.type + '.svg' :
                                '/images/auto_icon/point_noIn_' + this.props.type + '.svg') +
                            '" alt="auto"></span></div>'
                        ),
                    templateAfterClick:
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

    handleClick = e => {
        store.dispatch(setLevel('car', this.props.id));
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
                    iconContentLayout: this.state.templateBeforeClick,
                    contentLayout: this.state.templateBeforeClick
                }}
                onClick={this.handleClick}
            />
        );

    }
}

export default Car;