import {Clusterer} from 'react-yandex-maps';
import React from "react";
import {store} from '../../../index'

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
                        '<li><a onclick="window.onclick.car[\'{{geoObject.properties.id}}\']()"',
                        ' href=# class="list_item car-baloon">',
                        '<img src="images/auto_icon/point_blue_','' +
                        '{{geoObject.properties.type}}',
                        '.svg" alt="">',
                        '{{ geoObject.properties.model }}',
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
                                type={car.type}
                                model={car.model}
                                number={car.number}
                                description={car.description}
                                key={car.id}
                                id={car.id}
                                x_pos={car.x_pos}
                                y_pos={car.y_pos}
                                clicked={(car.id === store.getState().level.id) ? 1 : 0}
                                status={car.status}
                                year={car.year}
                                profitability={car.profitability}
                                technical_inspection_days={car.technical_inspection_days}
                                battery_change_days={car.battery_change_days}
                                tire_change_days={car.tire_change_days}
                                tire_season={car.tire_season}
                                terminal={car.terminal}
                                inline={car.inline}
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