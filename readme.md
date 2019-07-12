<p align="center"><img src="http://130.255.78.128/images/logo.svg"></p>
<p align="center">Интерактивная карта компании ООО "Ресурс Транс"</p>

## О проекте

Для реализации проекта использовались следующие технологии:

- [PHP 7.3](https://www.php.net/releases/7_3_0.php).
- [Laravel 5.8](https://laravel.com/docs/5.8).
- [React 16.2.0](https://5abc31d8be40f1556f06c4be--reactjs.netlify.com)

## Минимальные требования

- Apache 2.4
- Mysql 5.7
- php 7.3
- Laravel 5.8
- php-soap
- composer

Для работы проекта необходимо переименовать файл [.env.example](.env.example) в ".env" и ввести необходимые параметры.

Далее необходимо выполнить последовательно следующие консольные команды в корне проекта:
- composer update
- php artisan key:generate
- npm install
- npm run prod (Если не сработает, тогда "npm run dev" или "npm run watch")
- php artisan migrate

После этого проект полностью готов для заполнения данными, полученными по API.

## API

Для получения необходимых для отображения точек на карте использовано API на основе технологии SOAP, предоставленное компанией ООО "Ресурс Транс". Адрес для получения доступа к API записан в ключе SOAP_ADDRESS файла [.env](.env) в корневой папке проекта. 


## Консольные команды

Для заполнения базы данных необходимо задать параметры подключения к базе данных в файле [.env](.env) и указать в нём имя базы данных.

Для полного заполнения БД необходимо последовательно выполнить команды:
- php artisan organizations:fill (Заполнение организаций)
- php artisan autocolumns:fill (Заполнение автоколонн)
- php artisan spots:fill (Заполнение участков и "плохих" участков)
- php artisan brigades:fill (Заполнение бригад)
- php artisan cars:fill (Заполнение машин. Данная команда может занять довольно долгое время)
- php artisan statistics:fill -f (Заполнение статистики)

После этого проект готов к работе. После данной процедуры все команды можно выполнять в любой последовательности, потому что данные уже будут перезаписаны, если, например, появятся новые данные в API.

Команда php artisan statistics:fill имеет несколько дополнительных опций, помимо "-f":
- "-a" - Заполнение информации только о Заявках;
- "-w" - Заполнение информации только о Путевых листах;
- "-t" - Заполнение информации только о ТопливоЧасах;
- "-m" - Заполнение информации только о Мониторинге;
- "-d" - Заполнение информации только о ДТП;
- "-f" - Заполнение всей информации последовательно;


## Файл names.php

Файл [names.php](storage/names.php) представляется собой php-массив, содержащий список коротких имен и названий городов для различных подразделений, путь к файлу можно получить в Laravel php-функцией storage_path("names.php").
При необходимости можно дополнять файл, команды автоматически найдут необходимое подразделение по его ID.

##*Структура БД*

Все настройки базы данных должны быть предварительно указаны в файле [.env](.env).

Также структуру можно просмотреть по файла миграций в папке [database/migrations](database/migrations).

Таблица "companies":
    
    id - string(36) - PRIMARY
    name - string(26)
    created_at - dateTime
    updated_at - dateTime
    
Таблица "organizations":
    
    id - string(36) - PRIMARY
    company_id - string(36) - NULL - FOREIGN ON (companies.id)
    description - string(512) - NULL
    address - string(512) - NULL
    x_pos - float(8) - NULL
    y_pos - float(8) - NULL
    created_at - dateTime
    updated_at - dateTime
    
Таблица "autocolumns":
        
    id - string(36) - PRIMARY
    company_id - string(36) - NULL - FOREIGN ON (companies.id)
    organization_id - string(36) - NULL - FOREIGN ON (organizations.id)
    description - string(512) - NULL
    name - string(256) - NULL
    town - string(64) - NULL
    address - string(512) - NULL
    work - boolean (tinyInteger(1)) - default 0
    x_pos - float(8) - NULL
    y_pos - float(8) - NULL
    created_at - dateTime
    updated_at - dateTime
    
Таблица "bad_spots":
        
    id - string(36) - PRIMARY
    company_id - string(36) - NULL - FOREIGN ON (companies.id)
    organization_id - string(36) - NULL - FOREIGN ON (organizations.id)
    description - string(512) - NULL
    name - string(256) - NULL
    town - string(64) - NULL
    address - string(512) - NULL
    work - boolean (tinyInteger(1)) - default 0
    x_pos - float(8) - NULL
    y_pos - float(8) - NULL
    created_at - dateTime
    updated_at - dateTime
    
Таблица "spots":
        
    id - string(36) - PRIMARY
    company_id - string(36) - NULL - FOREIGN ON (companies.id)
    organization_id - string(36) - NULL - FOREIGN ON (organizations.id)
    autocolumn_id - string(36) - NULL - FOREIGN ON (autocolumns.id)
    description - string(512) - NULL
    name - string(256) - NULL
    town - string(64) - NULL
    address - string(512) - NULL
    work - boolean (tinyInteger(1)) - default 0
    x_pos - float(8) - NULL
    y_pos - float(8) - NULL
    created_at - dateTime
    updated_at - dateTime
    
Таблица "brigades":
        
    id - string(36) - PRIMARY
    company_id - string(36) - NULL - FOREIGN ON (companies.id)
    organization_id - string(36) - NULL - FOREIGN ON (organizations.id)
    autocolumn_id - string(36) - NULL - FOREIGN ON (autocolumns.id)
    bad_spot_id - string(36) - NULL - FOREIGN ON (bad_spots.id)
    spot_id - string(36) - NULL - FOREIGN ON (spots.id)
    description - string(512) - NULL
    name - string(256) - NULL
    town - string(64) - NULL
    address - string(512) - NULL
    work - boolean (tinyInteger(1)) - default 0
    x_pos - float(8) - NULL
    y_pos - float(8) - NULL
    created_at - dateTime
    updated_at - dateTime
    
Таблица "cars":
        
    id - string(36) - PRIMARY
    company_id - string(36) - NULL - FOREIGN ON (companies.id)
    organization_id - string(36) - NULL - FOREIGN ON (organizations.id)
    autocolumn_id - string(36) - NULL - FOREIGN ON (autocolumns.id)
    bad_spot_id - string(36) - NULL - FOREIGN ON (bad_spots.id)
    spot_id - string(36) - NULL - FOREIGN ON (spots.id)
    brigade_id - string(36) - NULL - FOREIGN ON (brigade.id)
    number - string(16) - NULL
    type - tinyInteger - NULL
    model - string(128) - NULL
    description - string(512) - NULL
    status - tinyInteger - NULL
    inline - boolean (tinyInteger(1)) - NULL
    year - integer - NULL
    profitability - float(10) - NULL
    technical_inspection_days - integer - NULL
    battery_change_days - integer - NULL
    tire_change_days - integer - NULL
    tire_season - string(32) - NULL
    terminal - boolean (tinyInteger(1)) - default 0
    x_pos - float(10) - NULL
    y_pos - float(10) - NULL
    created_at - dateTime
    updated_at - dateTime
    
Таблица "statistics":
        
    id - string(36) - PRIMARY
    company_id - string(36) - NULL - FOREIGN ON (companies.id)
    organization_id - string(36) - NULL - FOREIGN ON (organizations.id)
    autocolumn_id - string(36) - NULL - FOREIGN ON (autocolumns.id)
    bad_spot_id - string(36) - NULL - FOREIGN ON (bad_spots.id)
    spot_id - string(36) - NULL - FOREIGN ON (spots.id)
    brigade_id - string(36) - NULL - FOREIGN ON (brigade.id)
    applications_total - integer - default 0
    applications_executed - integer - default 0
    applications_canceled - integer - default 0
    applications_sub - integer - default 0
    applications_ac - integer - default 0
    applications_mp - integer - default 0
    waybills_total - integer - default 0
    waybills_processed - integer - default 0
    accidents_total - integer - default 0
    accidents_guilty - integer - default 0
    time - float - default 0
    fuel - float - default 0
    WB_M - integer - default 0
    WB_ALL - integer - default 0
    created_at - dateTime
    updated_at - dateTime
    
Таблица "car_data"
    
    car_id - string(36) - PRIMARY FOREIGN ON (cars.id)
    driver_name - string(128) - NULL
    phone_number - string(20) - NULL
    start_time_plan - dateTime - NULL
    start_time_fact - dateTime - NULL
    end_time_plan - dateTime - NULL
    work_time_plan - float - NULL
    work_time_fact - float - NULL
    mileage - integer - NULL
    speed - integer - NULL
    fuel_norm - float - NULL
    fuel_DUT - float - NULL
    driver_mark - string(16) - NULL
    speed - violations_count - NULL
    created_at - dateTime
    updated_at - dateTime