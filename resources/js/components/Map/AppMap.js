import React from 'react';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';
import '../css/MapApp.css';
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import {someFunction} from "../../actions";

const carTypes = {
    light: 0,
    truck: 1,
    bus: 2,
    spec: 3
};



let divisions = [];
const MapApp = ({ setPoints, setLevel, points, level }) => (

    <div className="app">
        <button onClick={() => {setLevel('company')}}>Lol</button>
        <button onClick={() => {setPoints([{
            id: '141',
            x_pos: 55.45,
            y_pos: 66.09
        }])}}>Points</button>
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

                    {
                        points.divisions.map(point => {
                            console.log('---',point.organization);
                            return (
                            <Placemark
                                key={point.organization.id}
                                geometry={[point.organization.x_pos, point.organization.y_pos]}
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


