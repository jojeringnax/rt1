import React from 'react';
import ReactDOM from 'react-dom';
import user from "../../img/info_auto_icon/user.svg";
import callAnswer from "../../img/info_auto_icon/call-answer.svg";
import clock from "../../img/info_auto_icon/clock.svg";
import speedometer from "../../img/info_auto_icon/speedometer.svg";
import gasStation from "../../img/info_auto_icon/gas-station.svg";
import star from "../../img/info_auto_icon/star.svg";
import percentageDiscount from "../../img/info_auto_icon/percentage-discount.svg";
import toolsAndUtensils from "../../img/info_auto_icon/tools-and-utensils.svg";
import carWheel from "../../img/info_auto_icon/car-wheel.svg";


class InfoTs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: this.props.show
        };
    }


    componentDidUpdate(prevProps, prevState) {
        //console.log(prevProps, this.state, this.props);
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        }
    }

    render() {
        console.log('props-ts',this.props);
        return(
            <div id="info-ts" className={"info-ts item-sideBar" + (this.state.show ? '' : ' hide')}>
                <div className="title-ts d-flex justify-content-start">
                    <div>
                        <img id="img-ts" src="" alt="" />
                    </div>
                    <div className="header-ts-info">
                        <span id="nameTS" className="">ТС №93 BMW</span>
                        <span id="number" className="">н/д</span>
                        <span id="year" className="" >н/д</span>
                    </div>
                </div>

                <div className="main-info-ts">
                    <div id="driver_info" className="item-ts-data">
                        <div>
                            <div className="name-driver d-flex item-ts-data">
                                <div className="d-flex align-items-start icon-ts">
                                    <img src={user} alt="driver_icon"/>
                                </div>
                                <div className="d-flex flex-column align-items-start">
                                    <span className="title-driver-name title-ts-text">Водитель:</span>
                                    <span id="driver" className="text-ts">Постывый Ярослав Николаевич</span>
                                </div>
                            </div>
                            <div className="phone-driver d-flex align-items-start item-ts-data">
                                <div className="d-flex align-items-start icon-ts">
                                    <img src={callAnswer} alt="phone_driver"/>
                                </div>
                                <div className="d-flex flex-column align-items-start" >
                                    <span className="title-ts-text title-driver-phone">Телефон:</span>
                                    <span id="phone" className="text-ts">8-908-235-82-56</span>
                                </div>
                            </div>
                        </div>
                        <hr className="ts-hr"/>
                    </div>

                    <div className="work-time item-ts-data d-flex flex-column">
                        <div className="d-flex">
                            <div className="icon-ts">
                                <img src={clock} alt="clock_icon"/>
                            </div>
                            <div className="d-flex flex-column align-items-start" >
                                <div className="start flex flex-column">
                                    <span className="title-time-start title-ts-text">Время начала:</span>
                                    <div className="time d-flex justify-content-between">
                                        <span id="start_time_plan" className="text-ts">28.02.2019 7:00:00</span>
                                        <span id="start_time_fact" className="text-ts blue-color">28.02.2019 7:05:21<br/> <span>факт</span></span>
                                    </div>
                                </div>
                                <div className="time-end item-ts-data">
                                    <span className="title-time-end title-ts-text">Время окончания:</span>
                                    <span id="end_time_plan" className="title-time-end text-ts">28.02.2019 19:00:00</span>
                                </div>
                                <div className="fuel-time item-ts-data">
                                    <span className="title-fuel-time title-ts-text">Время работы, часов:</span>
                                    <div className="time d-flex">
                                        <span id="work_time_plan" className="fuel-time-start text-ts">12</span>
                                        <span id="work_time_fact" className="fuel-time-end text-ts blue-color">11.91</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="ts-hr" />
                    </div>

                    <div className="dada-ts item-ts-data">
                        <div className="row-1 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src={speedometer} alt="" />
                                </div>
                                <div className="d-flex flex-column align-items-start" >
                                    <span className="title-ts-text">Пробег, км:</span>
                                    <span id="mileage" className="text-ts">275 км</span>
                                </div>
                            </div>
                            <div className="dada-ts-item">
                                <span className="title-ts-text">Средняя скорость, км/ч:</span>
                                <span id="speed" className="text-ts">37 км/ч</span>
                            </div>
                        </div>
                        <div className="row-2 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src={gasStation} alt="gasStation"/>
                                </div>
                                <div className="d-flex flex-column align-items-start">
                                    <span className="title-ts-text">Топливо по <br/>норме, л:</span>
                                    <span id="fuel_norm" className="text-ts">99.55</span>
                                </div>
                            </div>
                            <div className="dada-ts-item">
                                <span className="title-ts-text">Топливо <br/>ДУТ, л:</span>
                                <span id="fuel_" className="text-ts">0</span>
                            </div>
                        </div>
                        <div className="row-3 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src={star} alt="star"/>
                                </div>
                                <div className="d-flex flex-column align-items-start" >
                                    <span className="title-ts-text">Количество <br/>нарушений:</span>
                                    <span id="violations_count" className="text-ts">6.0</span>
                                </div>
                            </div>
                            <div className="dada-ts-item">
                                <span className="title-ts-text">Оценка качества <br/>вождения:</span>
                                <span id="driver_mark" className="text-ts">6.0</span>
                            </div>
                        </div>
                        <hr className="ts-hr"/>
                    </div>

                    <div className="dada-ts-2">
                        <div className="row-1 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex" >
                                <div className="icon-ts">
                                    <img src={percentageDiscount} alt="percentageDiscount_icon"/>
                                </div>
                                <div className="d-flex flex-column align-items-start ts-car-data">
                                    <span className="title-ts-text">Процент рентабельности за прошлый месяц:</span>
                                    <span id="profitability" className="text-ts">50</span>
                                </div>
                            </div>
                        </div>
                        <div className="row-2 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src={toolsAndUtensils} alt="toolsAndUtensils"/>
                                </div>
                                <div className="d-flex flex-column align-items-start ts-car-data">
                                    <span className="title-ts-text">Осталось км <br/> до ТО:</span>
                                    <span id="technical_inspection_days" className="text-ts">1500</span>
                                </div>
                            </div>
                            <div className="dada-ts-item ts-car-data">
                                <span className="title-ts-text">Дней до замены <br/> аккумулятора:</span>
                                <span id="battery_change_days" className="text-ts">911</span>
                            </div>
                        </div>
                        <div className="row-3 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src={carWheel} alt="carWheel"/>
                                </div>
                                <div className="d-flex flex-column align-items-start ts-car-data">
                                    <span className="title-ts-text">Км до замены шин:</span>
                                    <span id="tire_change_days" className="text-ts">241</span>
                                </div>
                            </div>
                            <div className="dada-ts-item ts-car-data">
                                <span className="title-ts-text">Сезонность шин:</span>
                                <span id="tire_season" className="text-ts">Межсезонные</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoTs;