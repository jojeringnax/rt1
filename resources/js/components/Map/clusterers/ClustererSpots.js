import { Clusterer } from 'react-yandex-maps';
import React from "react";
import {store} from '../../../index'
import Spot from "../divisions/Spot";

class ClustererSpots extends React.Component {

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
                        '<li><a class="link-one_point" onclick="window.onclick.spot[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '<div class="bb-one_point"><span class="bb-num-spot">',
                        '{{ geoObject.properties.carsNumber }}',
                        '</span>',
                        '<span class="bb-name-one_point">',
                        '{{ geoObject.properties.name }}',
                        '<span>',
                        '</div></a></li>',
                        '{% else %}',
                        '<li><a class="link-one_point" onclick="window.onclick.spot[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '<div class="bb-one_point"><span class="bb-num-spot">',
                        '{{ geoObject.properties.carsNumber }}',
                        '</span>',
                        '<span class="bb-name-one_point">',
                        '{{ geoObject.properties.name }}',
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
                modules={[
                    "clusterer.addon.balloon"
                ]}
            >
                {
                    store.getState().spots.divisions.map(spot => {
                        return (
                            <Spot
                                key={spot.spot.id}
                                id={spot.spot.id}
                                company_id={'113'}
                                name={spot.spot.name}
                                description={spot.spot.description}
                                address={spot.spot.addess}
                                x_pos={spot.spot.x_pos}
                                y_pos={spot.spot.y_pos}
                                carsNumber={spot.carsNumber}
                            />
                        )
                    })
                }

            </Clusterer>
        )
    }
}

export default ClustererSpots;
