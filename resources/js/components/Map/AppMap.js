import React from 'react';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';
import '../css/MapApp.css';
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import {someFunction} from "../../actions";
import ReactDOMServer from "react-dom/server";
import '../css/MapPoints.css';
import Organization from "./divisions/Organization";

const carTypes = {
    light: 0,
    truck: 1,
    bus: 2,
    spec: 3
};

let divisions = [];

class MapApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            template: null
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template: ymaps.templateLayoutFactory.createClass(
                        '<div class="bb">' +
                        '<span class="bb-num-org">'+
                        '</span> asd<span class="bb-name">' +
                            '</span></div>'
            ),
                });
            }
        };
    }


    render() {
        return(
            <div className="app">
                {/*<button onClick={() => {setLevel('company')}}>Lol</button>*/}
                {/*<button onClick={() => {setPoints([{*/}
                {/*    id: '141',*/}
                {/*    x_pos: 55.45,*/}
                {/*    y_pos: 66.09*/}
                {/*}])}}>Points</button>*/}
                <SideBar />
                <YMaps
                    query={{
                        apikey: '27544797-3131-4759-9f4b-54f17c827eb2&lang=ru_RU',
                    }}
                    version={"2.1"}
                    >
                    <div className="app-map">
                        <Map
                            onLoad={this.createTemplateLayoutFactory}
                            width={"100%"}
                            height={"100vh"}
                            defaultState={{
                                center: [55.751574, 37.573856],
                                zoom: 5,
                                behaviors: ['default', 'scrollZoom'],
                                controls: [],
                            }}
                            modules={["templateLayoutFactory", "layout.ImageWithContent"]}
                        >
                            {
                                this.props.points.divisions.map(point => {
                                    return (
                                        <Organization key={point.organization.id} date={point} template={this.state.template} />
                                    )
                                })
                            }
                        </Map>
                    </div>
                </YMaps>
            </div>
        )
    }
}

export default MapApp;


