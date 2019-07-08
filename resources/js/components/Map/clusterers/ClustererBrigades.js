import { Clusterer } from 'react-yandex-maps';
import React from "react";
import {store} from '../../../index'

import Brigade from "../divisions/Brigade";

class ClustererBrigades extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            balloonContentLayout: null
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    layout: ymaps.templateLayoutFactory.createClass([
                        '<div class="bb-cluster-car">',
                        '<span class="bb-num">',
                        '<span class="icon-mark">',
                        '</span>',
                        '{{ properties.geoObjects.length }}',
                        '</span></div>'
                    ].join(''))});
                this.setState({
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass([
                        '<ul class=list>',
                        '{% for geoObject in properties.geoObjects %}',
                        '{% if geoObject.properties.carsNumber == 0 %}',
                        '<li>',
                        '{{ geoObject.properties.description }}',
                        ' ({{ geoObject.properties.carsNumber }})',
                        '</li>',
                        '{% else %}',
                        '<li><a onclick="window.onclick.brigade[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '{{ geoObject.properties.description }}',
                        ' ({{ geoObject.properties.carsNumber }})',
                        '</a></li>',
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
                    clusterBalloonContentLayout: this.state.balloonContentLayout,
                    clusterIcons: [{
                        href: '',
                        size: [62, 62],
                        offset: [-26, -26]
                    }],
                    gridSize: 4,
                    clusterIconContentLayout: this.state.layout,
                    zoomMargin : [50,50,50,50]
                }}
            >
                {
                    store.getState().brigades.divisions.map(brigade => {
                        return (
                            <Brigade
                                key={brigade.brigade.id}
                                id={brigade.brigade.id}
                                company_id={'113'}
                                name={brigade.brigade.name}
                                description={brigade.brigade.description}
                                address={brigade.brigade.addess}
                                x_pos={brigade.brigade.x_pos}
                                y_pos={brigade.brigade.y_pos}
                                carsNumber={brigade.carsNumber}
                            />
                        )
                    })
                }

            </Clusterer>
        )
    }
}

export default ClustererBrigades;