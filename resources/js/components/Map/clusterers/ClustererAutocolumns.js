import { Clusterer } from 'react-yandex-maps';
import React from "react";
import {store} from '../../../index'


class ClustererAutocolumns extends React.Component {

    constructor() {
        super();
        this.state = {
            layout: null,
            balloonContentLayout: null
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    layout: ymaps.templateLayoutFactory.createClass(
                        '<div class="bb-cluster-car"><span class="bb-num">{{ properties.geoObjects.length }}</span></div>'
                    )});
                this.setState({
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass([
                        '<ul class=list>',
                        '{% for geoObject in properties.geoObjects %}',
                        '{% if geoObject.carsTotal == 0 %}',
                        '<li>{{ geoObject.name }} ({{ geoObject.carsTotal }})</li>',
                        '{% else %}',
                        '<li><a onclick="" href=# class="list_item car-baloon">{{ geoObject.name }} ({{ geoObject.carsTotal }})</a></li>',
                        '{% endif %}',
                        '{% endfor %}',
                        '</ul>'
                    ].join(''))
                });
            }
        };
    };


    render() {
        return (
            <Clusterer
                onLoad={this.createTemplateLayoutFactory}
                options={{
                    preset: 'islands#invertedVioletClusterIcons',
                    groupByCoordinates: false,
                }}
                children={this.props.children}
            />
        )
    }
}

export default ClustererAutocolumns;