import {Clusterer, Placemark} from 'react-yandex-maps';
import React from "react";
import {store} from '../../../index'
import {setLevel} from '../../../actions'
import '../../css/MapPoints.css'

import Car from "../divisions/Car";

class ClustererBrigades extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            balloonContentLayout: null,
            clickedCar: false
        };

        this.clickedCars = () => {
            this.setState({clickedCar:true})
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    layout: ymaps.templateLayoutFactory.createClass([
                        '<div class="bb-cluster-car"><span class="bb-num">',
                        '{{ properties.geoObjects.length }}',
                        '</span></div>'
                    ].join(''))});
                this.setState({
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass([
                        '<ul class=list>',
                        '{% for geoObject in properties.geoObjects %}',
                        '<li><a onclick="',
                        'store.dispatch(setLevel({level: \'car\', id: \'{{geoObject.id}}\'})',
                        'href=# id="',
                        '{{geoObject.id}}',
                        '" class="list_item car-baloon">',
                        '<img src="yan/img/auto_icon/point_blue_','' +
                        '{{geoObject.type}}',
                        '.svg" alt="">',
                        '{{ geoObject.properties.balloonContentHeader|raw }}',
                        '</a></li>',
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
                    gridSize: 1024,
                    clusterIconContentLayout: this.state.layout,
                    zoomMargin : [50,50,50,50]
                }}
            >
                {
                    store.getState().cars.map(car => {
                        return (
                            <Car
                                key={car.id}
                                id={car.id}
                                x_pos={car.x_pos}
                                y_pos={car.y_pos}
                                clicked={(car.id === store.getState().level.id) ? 1 : 0}
                                type={car.type}
                                status={car.status}
                                functionClicked={this.clickedCars}
                            />
                        )
                    })
                }

            </Clusterer>
        )
    }
}

export default ClustererBrigades;