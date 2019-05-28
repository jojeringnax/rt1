import {Clusterer} from 'react-yandex-maps';
import React from "react";
import {store} from '../../../index'
import BadSpot from "../divisions/BadSpot";

class ClustererBadSpots extends React.Component {

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
                        '<li><a class="link-one_point" onclick="window.onclick.badSpot[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '<div class="bb-one_point" style="margin: 0"><span class="bb-num-spot">',
                        ' {{ geoObject.properties.carsNumber }}',
                        '</span>',
                        '<span class="bb-name-one_point" style="box-shadow: none">',
                        '{{ geoObject.properties.description }}',
                        '<span>',
                        '</div></a></li>',
                        '{% else %}',
                        '<li><a class="link-one_point" onclick="window.onclick.badSpot[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '<div class="bb-one_point" style="margin: 0"><span class="bb-num-spot">',
                        ' {{ geoObject.properties.carsNumber }}',
                        '</span>',
                        '<span class="bb-name-one_point" style="box-shadow: none">',
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
                modules={[
                    "clusterer.addon.balloon"
                ]}
            >
                {
                    store.getState().badSpots.divisions.map(badSpot => {
                        return (
                            <BadSpot
                                key={badSpot.bad_spot.id}
                                id={badSpot.bad_spot.id}
                                company_id={'113'}
                                name={badSpot.bad_spot.name}
                                description={badSpot.bad_spot.description}
                                address={badSpot.bad_spot.addess}
                                x_pos={badSpot.bad_spot.x_pos}
                                y_pos={badSpot.bad_spot.y_pos}
                                carsNumber={badSpot.carsNumber}
                            />
                        )
                    })
                }

            </Clusterer>
        )
    }
}

export default ClustererBadSpots;
