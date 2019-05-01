import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {setSpots, setBounds, setBrigades, setCars, setLevel} from "../../../actions";

class Spot extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            bounds: [],
            template: props.template,
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template: ymaps.templateLayoutFactory.createClass(
                        '<div class="bb"><span class="bb-num-spot">'
                        + this.props.carsNumber
                        + '</span> <span id="spot_name" class="bb-name">'
                        + this.props.name
                        +'</span></div>'
                    ),
                });
            }
        };
    }



    handleClick = (e) => {
        store.dispatch(setBounds(this.state.bounds));
        store.dispatch(setSpots({divisions: []}));
        store.dispatch(setBrigades({divisions: this.state.children.brigades}));
        store.dispatch(setCars(this.state.children.cars));
        store.dispatch(setLevel('spot', this.props.id))
    };


    componentDidMount() {
        let url = '/api/spot/' + this.props.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    bounds:res.data.bounds.bounds
                });
                this.setState({
                    children: {
                        brigades: res.data.divisions,
                        cars: res.data.cars
                    }
                })
            })
    }

    render () {
        return (
            <Placemark
                onLoad={this.createTemplateLayoutFactory}
                geometry={[this.props.x_pos, this.props.y_pos]}
                properties={{
                    iconCaption : 'asd'
                }}
                modules={[
                    "geoObject.addon.hint"
                ]}

                options={{
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [62, 67.5],
                    iconContentOffset: [-74, 83],
                    iconImageOffset: [-24, -24],
                    preset: 'islands#greenDotIconWithCaption',
                    iconContentLayout: this.state.template
                }}
                onClick={this.handleClick}
            />
        )
    }
}

export default Spot;