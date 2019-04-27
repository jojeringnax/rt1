import HeadOfSideBar from "../SideBar/SideBar";
import React from "react";
import { Clusterer, Placemark } from 'react-yandex-maps';

class Organization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            company_id: '113',
            description: props.description,
            address: props.address,
            x_pos: props.x_pos,
            y_pos: props.y_pos,
            children: [],
            bounds: []
        }
    }

    handleClick = (e) => {

    };

    render () {
        return (
            <Placemark
                geometry={[this.state.x_pos, this.state.y_pos]}
                properties= {{
                    hintContent: this.state.description,
                    balloonContentLayout: 'Это балун'
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                onClick={this.handleClick}
            />
        )
    }
}

export default Organization