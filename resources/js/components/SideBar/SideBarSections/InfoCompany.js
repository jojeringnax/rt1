import React from 'react';
import ReactDOM from 'react-dom';
import deliveryTruck from "../../img/delivery-truck.svg"
import copy from "../../img/copy.svg";
import pie from "../../img/pie.svg";
import 'react-circular-progressbar/dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';

class InfoCompany extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: this.props.show
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        }
    }


    render() {
        return(
            <div id="info-company" className={"info-company item-sideBar" + (this.state.show ? '' : ' hide')}>
                <div>
                    <div className="ts-title">
                        <span className="img">
                            <img src={deliveryTruck} alt="deliveryTruck" className="" />
                        </span>
                        <span className="ts-text">Транспортные средства</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">Всего, шт.</span>
                        <span id="compAmOfTs" className="figures">100</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">Готовы, шт.</span>
                        <span id="compReady" className="figures">100</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">На ремонте, шт.</span>
                        <span id="compOnRep" className="figures">100</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">На ТО, шт.</span>
                        <span id="compOnTo" className="figures">100</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">На линии, шт.</span>
                        <span id="compOnLine" className="figures">100</span>
                    </div>
                </div>

                <div id="request" className="">
                    <div className="request-title">
                        <span className="img"><img src={copy} alt="copy" className="span-yan/img-h3-2nd" /></span>
                        <span className="text">Заявки</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Выполнено, шт.</span>
                        <span id="comp_applications_executed" className="figures">100</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Отменено, шт.</span>
                        <span id="comp_applications_canceled" className="figures">100</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Переданы на СП, шт.</span>
                        <span id="comp_applications_sub" className="figures">100</span>
                    </div>
                </div>

                <div id="indicators" className="indicators-class">
                    <div className="indicators-title">
                        <span className="img"><img src={pie} alt="pie" className="span-yan/img-h3-3nd" /></span>
                        <span className="text">Показатели компании</span>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <span id="comp_applications_ac_per" className="p-bar">60%</span>
                            {/*<div id="comp_applications_ac" className="circle"></div>*/}
                            <CircularProgressbar
                                percentage={60}
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                        </div>
                        <div className="div-bar-text">
                            <span id="filed" className="p-bar-text">Поданы через АС<br/>"Авто-Контроль", %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <span id="comp_waybills_total_per" className="p-bar">30%</span>
                            <CircularProgressbar
                                percentage={30}
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                        </div>
                        <div className="div-bar-text">
                            <span id="processed" className="p-bar-text-str">Обработано ПЛ, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <p id="comp_accidents_total_per" className="p-bar">90%</p>
                            <CircularProgressbar
                                percentage={90}
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                        </div>
                        <div className="div-bar-text">
                            <span id="dtp" className="p-bar-text">ДТП по вине<br/>компании, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <span id="comp_WB_M_per" className="p-bar">100%</span>
                            <CircularProgressbar
                                percentage={100}
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                        </div>
                        <div className="div-bar-text">
                            <span id="mileage-bsmt" className="p-bar-text">Принятый пробег<br/>по БСМТ, %</span>
                        </div>
                    </div>

                    <div className="indic-bot">
                        <div className="div-pr25">
                            <span id="lmch-2" className="p-meanings-2nd"><span id="comp_fuel" className="span-figures-2nd">5,1</span> л\мч<br/>ТМЧ</span>
                        </div>{/*END__INFO_COMPANY*/}
                        <div className="div-meanings">
                            <span id="" className="p-meanings-2nd"><span id="comp_terminals" className="span-figures-2nd">110</span><br/>Терминалов</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoCompany;