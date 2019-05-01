import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import '../css/MapApp.css';
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import {someFunction} from "../../actions";
import ReactDOMServer from "react-dom/server";
import '../css/MapPoints.css';
import ClustererAutocolumns from './clusterers/ClustererAutocolumns'
import Organization from "./divisions/Organization";
import Autocolumn from "./divisions/Autocolumn";
import BadSpot from "./divisions/BadSpot";
import Spot from "./divisions/Spot";
import Car from "./divisions/Car";

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
                <SideBar level={this.props.level}/>
                <YMaps
                    query={{
                        apikey: '27544797-3131-4759-9f4b-54f17c827eb2&lang=ru_RU',
                    }}
                    version={"2.1"}
                    >
                    <div className="app-map">
                        <Map
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
                            <ClustererAutocolumns>
                            {
                                this.props.autocolumns.divisions.map(autocolumn => {
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
                            </ClustererAutocolumns>
                            {
                                this.props.badSpots.divisions.map(badSpot => {
                                    return (
                                        <BadSpot
                                            key={badSpot.bad_spot.id}
                                            id={badSpot.bad_spot.id}
                                            company_id={'113'}
                                            description={badSpot.bad_spot.description}
                                            name={badSpot.bad_spot.name}
                                            address={badSpot.bad_spot.addess}
                                            x_pos={badSpot.bad_spot.x_pos}
                                            y_pos={badSpot.bad_spot.y_pos}
                                            carsNumber={badSpot.carsNumber}
                                        />
                                    )
                                })
                            }
                            {
                                this.props.spots.divisions.map(spot => {
                                    return (
                                        <Spot
                                            key={spot.spot.id}
                                            id={spot.spot.id}
                                            company_id={'113'}
                                            description={spot.spot.description}
                                            name={spot.spot.name}
                                            address={spot.spot.addess}
                                            x_pos={spot.spot.x_pos}
                                            y_pos={spot.spot.y_pos}
                                            carsNumber={spot.carsNumber}
                                        />
                                    )
                                })
                            }

                            {
                                this.props.cars.map(car => {
                                    return (
                                        <Car
                                            key={car.id}
                                            id={car.id}
                                            company_id={'113'}
                                            organization_id={car.organization_id}
                                            autocolumn_id={car.autocolumn_id}
                                            bad_spot_id={car.bad_spot_id}
                                            spot_id={car.spot_id}
                                            brigade_id={car.brigade_id}
                                            number={car.number}
                                            type={car.type}
                                            model={car.model}
                                            description={car.description}
                                            x_pos={car.x_pos}
                                            y_pos={car.y_pos}
                                        />
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


