import { Clusterer } from 'react-yandex-maps';
import React from "react";
import {store} from '../../../index'
import Autocolumn from "../divisions/Autocolumn";

class ClustererAutocolumns extends React.Component {

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
                        '{{ properties.geoObjects.length }}',
                        '</span></div>'
                    ].join(''))});
                this.setState({
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass([
                        '<ul class=list>',
                        '{% for geoObject in properties.geoObjects %}',
                        '{% if geoObject.properties.carsNumber == 0 %}',
                        '<li><a class="link-one_point" onclick="window.onclick.autocolumn[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '<div class="bb-one_point"><span class="bb-num-spot">',
                        '{{ geoObject.properties.carsNumber }}',
                        '</span>',
                        '<span class="bb-name-one_point">',
                        '{{ geoObject.properties.description }}',
                        '<span>',
                        '</div></a></li>',
                        '{% else %}',
                        '<li><a class="link-one_point" onclick="window.onclick.autocolumn[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '<div class="bb-one_point"><span class="bb-name-one_point">',
                        '{{ geoObject.properties.carsNumber }}',
                        '</span>',
                        '<span class="">',
                        '{{ geoObject.properties.description }}',
                        '<span>',
                        '</div></a></li>',
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
                    store.getState().autocolumns.divisions.map(autocolumn => {
                        return (
                            <Autocolumn
                                key={autocolumn.autocolumn.id}
                                id={autocolumn.autocolumn.id}
                                company_id={'113'}
                                name={autocolumn.autocolumn.name}
                                description={autocolumn.autocolumn.description}
                                address={autocolumn.autocolumn.addess}
                                x_pos={autocolumn.autocolumn.x_pos}
                                y_pos={autocolumn.autocolumn.y_pos}
                                carsNumber={autocolumn.carsNumber}
                            />
                        )
                    })
                }

            </Clusterer>
        )
    }
}

export default ClustererAutocolumns;
