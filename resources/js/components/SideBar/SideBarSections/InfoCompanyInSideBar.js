import React from 'react';
import ReactDOM from 'react-dom';

class InfoCompanyInSideBar extends React.Component{
    render() {
        return(
            <div className="info-company item-sideBar">
                <div>
                    <div className="ts-title">
                        <span className="img"><img src="yan/img/delivery-truck.svg" alt="#" className="" /></span>
                        <span className="ts-text h3-main">Транспортные средства</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Всего, шт.</span>
                        <span id="compAmOfTs" className="figures"></span>
                    </div>
                    <div className="item-info">
                        <p className="trans-auto">Готовы, шт.</p>
                        <span id="compReady" className="figures"></span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">На ремонте, шт.</span>
                        <span id="compOnRep" className="figures"></span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">На ТО, шт.</span>
                        <span id="compOnTo" className="figures"></span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">На линии, шт.</span>
                        <span id="compOnLine" className="figures"></span>
                    </div>
                </div>

                <div id="request" className="">
                    <div className="request-title">
                        <span className="img"><img src="yan/img/copy.svg" alt="#" className="span-yan/img-h3-2nd" /></span>
                        <span className="text">Заявки</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Выполнено, шт.</span>
                        <span id="comp_applications_executed" className="figures"></span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Отменено, шт.</span>
                        <span id="comp_applications_canceled" className="figures"></span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Переданы на СП, шт.</span>
                        <span id="comp_applications_sub" className="figures"></span>
                    </div>
                </div>

                <div id="indicators" className="indicators-class">
                    <div className="indicators-title">
                        <span className="img"><img src="yan/img/pie.svg" alt="#" className="span-yan/img-h3-3nd" /></span>
                        <span className="text">Показатели компании</span>
                    </div>
                    <div className="item-bar">
                        <div className="cirk" >
                            <span id="comp_applications_ac_per" className="p-bar">60%</span>
                            <div id="comp_applications_ac" className="circle"></div>
                        </div>
                        <div className="div-bar-text">
                            <span id="filed" className="p-bar-text">Поданы через АС<br/>"Авто-Контроль", %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="cirk" >
                            <span id="comp_waybills_total_per" className="p-bar">30%</span>
                            <div id="comp_waybills_total" className="circle"></div>
                        </div>
                        <div className="div-bar-text">
                            <span id="processed" className="p-bar-text-str">Обработано ПЛ, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="cirk" >
                            <p id="comp_accidents_total_per" className="p-bar">90%</p>
                            <div id="comp_accidents_total" className="circle"></div>
                        </div>
                        <div className="div-bar-text">
                            <span id="dtp" className="p-bar-text">ДТП по вине<br/>компании, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="cirk" >
                            <span id="comp_WB_M_per" className="p-bar">100%</span>
                            <div id="comp_WB_M" className="circle"></div>
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

export default InfoCompanyInSideBar;