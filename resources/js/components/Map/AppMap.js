import React from 'react';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';
import '../css/MapApp.css';
import SideBar from "../SideBar/SideBar";
import axios from "axios";

const carTypes = {
    light: 0,
    truck: 1,
    bus: 2,
    spec: 3
};



const MapApp = ({ points = [], level }) => (
    <div className="app">
        <SideBar />
        <YMaps>
            <div className="app-map">
                <Map
                    width={"100%"} height={"100vh"} defaultState={{
                    center: [55.751574, 37.573856],
                    zoom: 5,
                    behaviors: ['default', 'scrollZoom'],
                    controls: []
                }}>
                    {console.log(points)}

                    {
                        points.map(point => {
                            console.log('---',point);
                            return (
                            <Placemark
                                key={point.id}
                                geometry={[point.point.x_pos, point.point.y_pos]}
                                properties={{
                                }}
                            />)

                        })
                    }
                </Map>
            </div>
        </YMaps>
    </div>
);

export default MapApp;


