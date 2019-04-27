import React from 'react';
import ReactDOM from 'react-dom';

class InfoDepartmentInSideBar extends React.Component{
    render() {
        return(
            <div className="info-department item-sideBar">
                <div className="">
                    <div className="">
                        <div className="ts-title">
                            <span className="img"><img src="yan/img/delivery-truck.svg" alt="#" className="span-yan/img-h3"/></span>
                            <span id="tranport-means" className="ts-text h3-main">Транспортные средства</span>
                        </div>
                        <div id="" className="item-info">
                            <span id="" className="trans-auto">Всего, шт.</span>
                            <span id="totTs" className="figures">311</span>
                        </div>
                        <div className="item-info">
                            <span className="trans-auto">Готовы, шт.</span>
                            <span id="OnReady" className="figures">4</span>
                        </div>
                        <div className="item-info">
                            <span id="on-repair" className="trans-auto">На ремонте, шт.</span>
                            <span id="OnRep" className="figures">3</span>
                        </div>
                        <div className="item-info">
                            <span id="on-to" className="trans-auto">На ТО, шт.</span>
                            <span id="onTo" className="figures">4</span>
                        </div>
                        <div className="item-info">
                            <span id="on-line-department" className="trans-auto">На линии, шт.</span>
                            <span id="OnLine" className="figures">124</span>
                        </div>
                    </div>

                    <div className="div-transport">
                        <hr className="hr-trans" />
                        <div id="all" className="item-info transort-department ">
                            <div className="transport-title">
                                <span id="passenger-car" className="p-type-transport">Все транспортные средства</span>
                            </div>
                        </div>
                        <hr className="hr-trans" />
                        <div id="light" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src="yan/img/auto_icon/point_blue_0.svg" alt="#" className="img-transport"/></span>
                                <span id="passenger-car" className="p-type-transport">Легковые</span>
                            </div>
                            <span id="passCar" className="p-quantity">40</span>
                        </div>
                        <hr className="hr-trans" />
                        <div id="truck" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src="yan/img/auto_icon/point_blue_1.svg" alt="#" className="img-transport"/></span>
                                <span id="freight" className="p-type-transport">Грузовые</span>
                            </div>
                            <span id="freightCar" className="p-quantity">221</span>
                        </div>
                        <hr className="hr-trans" />
                        <div id="bus" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src="yan/img/auto_icon/point_blue_2.svg" alt="#" className="img-transport"/></span>
                                <span className="p-type-transport">Автобусы</span>
                            </div>
                            <span id="busCar" className="p-quantity">20</span>
                        </div>
                        <hr className="hr-trans" />
                        <div id="spec" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src="yan/img/auto_icon/point_blue_3.svg" alt="#" className="img-transport"/></span>
                                <span id="spec" className="p-type-transport">Спецтехника</span>
                            </div>
                            <span id="specCar" className="p-quantity">12</span>
                        </div>
                        <hr className="hr-trans" />
                    </div>
                </div>

                <div className="">
                    <div id="request-department" className="">
                        <div className="request-title">
                            <span className="img"><img src="yan/img/copy.svg" alt="#" className="span-yan/img-h3-2nd"/></span>
                            <span id="title-request" className="text">Заявки</span>
                        </div>
                        <div className="item-info">
                            <span className="trans-auto">Выполнено, шт.</span>
                            <span id="applications_executed" className="figures">311</span>
                        </div>
                        <div className="item-info">
                            <span className="trans-auto">Отменено, шт.</span>
                            <span id="applications_canceled" className="figures">124</span>
                        </div>
                        <div className="item-info">
                            <span id="" className="trans-auto">Переданы на СП, шт.</span>
                            <span id="applications_sub" className="figures">3</span>
                        </div>
                    </div>
                </div>
                <div id="indicators-department" className="indicators-class">
                    <div className="indicators-title">
                        <span className="img"><img src="yan/img/pie.svg" alt="#" className="span-yan/img-h3-3nd"/></span>
                        <span id="h3-indicator" className="text">Показатели компании</span>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >
                            <span id="applications_ac_per" className="p-bar">60%</span>
                            <div id="applications_ac" className="circle"></div>
                        </div>
                        <div className="div-bar-text">
                            <span id="filed" className="p-bar-text">Поданы через АС<br/>"Авто-Контроль", %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >
                            <span id="waybills_total_per" className="p-bar">30%</span>
                            <div id="waybills_total" className="circle"></div>
                        </div>
                        <div className="div-bar-text">
                            <span id="processed" className="p-bar-text-str">Обработано ПЛ, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="ilia">
                            <span id="accidents_total_per" className="p-bar">90%</span>
                            <div id="accidents_total" className="circle"></div>
                        </div>
                        <div className="div-bar-text">
                            <span id="dtp" className="p-bar-text">ДТП по вине<br/>компании, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >
                            <p id="WB_M_per" className="p-bar">100%</p>
                            <div id="WB_M" className="circle"></div>
                        </div>
                        <div className="div-bar-text">
                            <p id="" className="p-bar-text">Принятый пробег<br/>по БСМТ, %</p>
                        </div>
                    </div>
                </div>
                <div className="indic-bot">
                    <div className="div-pr25">
                        <span id="lmch-2" className="p-meanings-2nd"><span id="fuel" className="span-figures-2nd">5,1</span> л\мч<br/>ТМЧ</span>
                        </div>
                    <div className="div-meanings">
                        <span id="" className="p-meanings-2nd"><span id="terminals" className="span-figures-2nd">110</span><br/>Терминалов</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoDepartmentInSideBar;