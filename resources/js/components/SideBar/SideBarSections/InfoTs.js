import React from 'react';


class InfoTs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: this.props.show,
            statistic: {}
        };
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show,
            });
        }
    }

    render() {
        return(
            <div id="info-ts" className={"info-ts item-sideBar" + (this.state.show ? '' : ' hide')}>
                <div className="title-ts d-flex justify-content-start">
                    <div>
                        <img id="img-ts" src={'/img/auto_icon/point_blue_' + this.props.statistic.type + '.svg'} alt="" />
                    </div>
                    <div className="header-ts-info">
                        <span id="nameTS" className="">
                            {
                                this.props.statistic.model ? this.props.statistic.model : "Н/Д"
                            }
                        </span>
                        <span id="number" className="">
                            {
                                this.props.statistic.number ? this.props.statistic.number : "Н/Д"
                            }
                        </span>
                        <span id="year" className="" >
                            {
                                this.props.statistic.year ? this.props.statistic.year + ' г.в.' : "Н/Д"
                            }
                        </span>
                    </div>
                </div>

                <div className="main-info-ts">
                    <div id="driver_info" className="item-ts-data">
                        <div>
                            <div className="name-driver d-flex item-ts-data">
                                <div className="d-flex align-items-start icon-ts">
                                    <img src='/img/info_auto_icon/user.svg' alt="driver_icon"/>
                                </div>
                                <div className="d-flex flex-column align-items-start item-ts-text">
                                    <span className="title-driver-name title-ts-text">Водитель:</span>
                                    <span id="driver" className="text-ts">
                                        {
                                            this.props.statistic.driver_name ? this.props.statistic.driver_name : "Н/Д"
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="phone-driver d-flex align-items-start item-ts-data">
                                <div className="d-flex align-items-start icon-ts">
                                    <img src='/img/info_auto_icon/call-answer.svg' alt="phone_driver"/>
                                </div>
                                <div className="d-flex flex-column align-items-start item-ts-text">
                                    <span className="title-ts-text title-driver-phone">Телефон:</span>
                                    <span id="phone" className="text-ts">
                                        {
                                            this.props.statistic.phone_number ? this.props.statistic.phone_number : "Н/Д"
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr className="ts-hr"/>
                    </div>

                    <div className="work-time item-ts-data d-flex flex-column">
                        <div className="d-flex">
                            <div className="icon-ts">
                                <img src='/img/info_auto_icon/clock.svg' alt="clock_icon"/>
                            </div>
                            <div className="d-flex flex-column align-items-start item-ts-text" >
                                <div className="start flex flex-column">
                                    <span className="title-time-start title-ts-text">Время начала:</span>
                                    <div className="time d-flex justify-content-between ">
                                        <span id="start_time_plan" className="text-ts">
                                            {
                                                this.props.statistic.start_time_plan ? this.props.statistic.start_time_plan : "Н/Д"
                                            }
                                        </span>
                                        <span id="start_time_fact" className="text-ts blue-color">
                                            {
                                                this.props.statistic.start_time_fact ? this.props.statistic.start_time_fact : "Н/Д"
                                            }
                                            <br/>
                                        </span>
                                    </div>
                                </div>
                                <div className="time-end item-ts-data">
                                    <span className="title-time-end title-ts-text">Время окончания:</span>
                                    <span id="end_time_plan" className="title-time-end text-ts">
                                        {
                                            this.props.statistic.end_time_plan ? this.props.statistic.end_time_plan : "Н/Д"
                                        }
                                    </span>
                                </div>
                                <div className="fuel-time item-ts-data">
                                    <span className="title-fuel-time title-ts-text">Время работы, часов:</span>
                                    <div className="time d-flex">
                                        <span id="work_time_plan" className="fuel-time-start text-ts">
                                            {
                                                this.props.statistic.work_time_plan ? this.props.statistic.work_time_plan : "Н/Д"
                                            }
                                        </span>
                                        <span id="work_time_fact" className="fuel-time-end text-ts blue-color">
                                            {
                                                this.props.statistic.work_time_fact ? this.props.statistic.work_time_fact : "Н/Д"
                                            }
                                        </span>
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
                                    <img src='/img/info_auto_icon/speedometer.svg' alt="" />
                                </div>
                                <div className="d-flex flex-column align-items-start item-ts-text" >
                                    <span className="title-ts-text">Пробег, км:</span>
                                    <span id="mileage" className="text-ts">
                                        {
                                            this.props.statistic.mileage ? this.props.statistic.mileage + " км" : "Н/Д"
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="dada-ts-item">
                                <span className="title-ts-text">Средняя скорость, км/ч:</span>
                                <span id="speed" className="text-ts">
                                    {
                                        this.props.statistic.speed ? this.props.statistic.speed + " км/ч" : "Н/Д"
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="row-2 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src='/img/info_auto_icon/gas-station.svg' alt="gasStation"/>
                                </div>
                                <div className="d-flex flex-column align-items-start item-ts-text">
                                    <span className="title-ts-text">Топливо по <br/>норме, л:</span>
                                    <span id="fuel_norm" className="text-ts">
                                    {
                                        this.props.statistic.fuel_norm ? this.props.statistic.fuel_norm : "Н/Д"
                                    }
                                    </span>
                                </div>
                            </div>
                            <div className="dada-ts-item">
                                <span className="title-ts-text">Топливо <br/>ДУТ, л:</span>
                                <span id="fuel_" className="text-ts">
                                    {
                                        this.props.statistic.fuel_DUT ? this.props.statistic.fuel_DUT : "Н/Д"
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="row-3 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src='/img/info_auto_icon/star.svg' alt="star"/>
                                </div>
                                <div className="d-flex flex-column align-items-start item-ts-text" >
                                    <span className="title-ts-text">Количество <br/>нарушений:</span>
                                    <span id="violations_count" className="text-ts">
                                    {
                                        this.props.statistic.violations_count ? this.props.statistic.violations_count : "Н/Д"
                                    }
                                    </span>
                                </div>
                            </div>
                            <div className="dada-ts-item">
                                <span className="title-ts-text">Оценка качества <br/>вождения:</span>
                                <span id="driver_mark" className="text-ts">
                                    {
                                        this.props.statistic.driver_mark ? this.props.statistic.driver_mark : "Н/Д"
                                    }
                                </span>
                            </div>
                        </div>
                        <hr className="ts-hr"/>
                    </div>

                    <div className="dada-ts-2">
                        <div className="row-1 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex" >
                                <div className="icon-ts">
                                    <img src='/img/info_auto_icon/percentage-discount.svg' alt="percentageDiscount_icon"/>
                                </div>
                                <div className="d-flex flex-column align-items-start ts-car-data item-ts-text">
                                    <span className="title-ts-text">Процент рентабельности за прошлый месяц:</span>
                                    <span id="profitability" className="text-ts">
                                    {
                                        this.props.statistic.profitability ? this.props.statistic.profitability : "Н/Д"
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row-2 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src='/img/info_auto_icon/tools-and-utensils.svg' alt="toolsAndUtensils"/>
                                </div>
                                <div className="d-flex flex-column align-items-start ts-car-data item-ts-text">
                                    <span className="title-ts-text">Осталось км <br/> до ТО:</span>
                                    <span id="technical_inspection_days" className="text-ts">
                                        {
                                            this.props.statistic.technical_inspection_days ? this.props.statistic.technical_inspection_days : "Н/Д"
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="dada-ts-item ts-car-data">
                                <span className="title-ts-text">Дней до замены <br/> аккумулятора:</span>
                                <span id="battery_change_days" className="text-ts">
                                    {
                                        this.props.statistic.battery_change_days ? this.props.statistic.battery_change_days : "Н/Д"
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="row-3 d-flex flex-row item-ts-data">
                            <div className="dada-ts-item d-flex">
                                <div className="icon-ts">
                                    <img src='/img/info_auto_icon/car-wheel.svg' alt="carWheel"/>
                                </div>
                                <div className="d-flex flex-column align-items-start ts-car-data item-ts-text">
                                    <span className="title-ts-text">Км до замены шин:</span>
                                    <span id="tire_change_days" className="text-ts">
                                        {
                                            this.props.statistic.tire_change_days ? this.props.statistic.tire_change_days : "Н/Д"
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="dada-ts-item ts-car-data">
                                <span className="title-ts-text">Сезонность шин:</span>
                                <span id="tire_season" className="text-ts">
                                    {
                                        this.props.statistic.tire_season ? this.props.statistic.tire_season : "Н/Д"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoTs;
