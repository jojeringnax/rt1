import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import '../css/MapApp.css';
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import {setBounds, someFunction} from "../../actions";
import ReactDOMServer from "react-dom/server";
import '../css/MapPoints.css';
import ClustererAutocolumns from './clusterers/ClustererAutocolumns'
import Organization from "./divisions/Organization";
import Autocolumn from "./divisions/Autocolumn";
import BadSpot from "./divisions/BadSpot";
import Spot from "./divisions/Spot";
import Car from "../../containers/Car";
import {store} from "../../index";
import ClustererBadSpots from "./clusterers/ClustererBadSpots";
import ClustererSpots from "./clusterers/ClustererSpots";
import ClustererBrigades from "./clusterers/ClustererBrigades";
import ClustererCars from './clusterers/ClustererCars';
import BackButton from "../BackButton";

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
            template: null,
            clickedCar: false
        };

        this.clickedCars = () => {
            this.setState({clickedCar:true})
        }
    }

    handleBoundsChange = (event) => {
        store.dispatch(setBounds(event.get('newBounds')));
    };



    render() {
        return(
            <div className="app">
                <SideBar level={this.props.level}/>
                <YMaps
                    query={{
                        apikey: '27544797-3131-4759-9f4b-54f17c827eb2&lang=ru_RU',
                    }}
                    version={"2.1"}
                    >
                    <div className="app-map">
                        <BackButton />
                        <Map
                            onBoundsChange={this.handleBoundsChange}
                            width={"100%"}
                            height={"100vh"}
                            defaultState={{
                                center: [55.751574, 37.573856],
                                zoom: 5,
                                behaviors: ['default', 'scrollZoom'],
                                controls: []
                            }}
                            state={{bounds: this.props.bounds}}
                            modules={["templateLayoutFactory", "layout.ImageWithContent"]}
                        >
                            {
                                this.props.organizations.divisions.map(organization => {
                                    return (
                                        <Organization
                                            key={organization.organization.id}
                                            id={organization.organization.id}
                                            company_id={'113'}
                                            description={organization.organization.description}
                                            address={organization.organization.addess}
                                            x_pos={organization.organization.x_pos}
                                            y_pos={organization.organization.y_pos}
                                            carsNumber={organization.carsNumber}
                                        />
                                    )
                                })
                            }
                            <ClustererAutocolumns />
                            <ClustererBadSpots />
                            <ClustererSpots />
                            <ClustererBrigades/>
                            <ClustererCars />

                        </Map>
                    </div>
                </YMaps>
            </div>
        )
    }
}

export default MapApp;


