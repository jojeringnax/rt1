<?php

namespace App;

use Faker\Provider\DateTime;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CarData
 * @package App
 *
 * @property string $car_id
 * @property string $driver_name
 * @property string $phone_number
 * @property string $start_time_plan
 * @property string $start_time_fact
 * @property string $end_time_plan
 * @property float $work_time_plan
 * @property float $work_time_fact
 * @property integer $mileage
 * @property integer $speed
 * @property float $fuel_norm
 * @property float $fuel_DUT
 * @property string $driver_mark
 * @property integer $violations_count
 *
 * @property Car $car
 */
class CarData extends Model
{
    /**
     * @var string
     */
    protected $table='car_data';

    /**
     * @var string
     */
    protected $primaryKey='car_id';

    /**
     * @var array
     */
    protected $fillable = [
        'car_id'
    ];


    /**
     * @var bool
     */
    public $incrementing = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function car()
    {
        return $this->hasOne(Car::class, 'car_id', 'id');
    }

    /**
     * @param $carID
     * @return mixed
     * @throws \Exception
     */
    public static function getCarData($carID)
    {
        $client = app(Soap::class);
        $carsData = json_decode($client->GetCarsData(['CarsID' => $carID])->return);
        $keys = [
            'Driver',
            'Phone',
            'StartTimePlan',
            'EndTimePlan',
            'WorkTimePlan',
            'StartTimeFact',
            'WorkTimeFact',
            'Mileage',
            'Speed',
            'FuelNorm',
            'FuelDUT',
            'DriverMark',
            'ViolationsCount'
        ];

        foreach ($keys as $key) {
            $$key = (isset($carsData->$key)) ? $carsData->$key : null;
        }
        $StartTimePlan = (isset($carsData->StartTimePlan)) ?
            date('Y-m-d H:i:s', strtotime($carsData->StartTimePlan)) :
            null;
        $EndTimePlan = (isset($carsData->EndTimePlan)) ?
            date('Y-m-d H:i:s', strtotime($carsData->EndTimePlan)) :
            null;
        $StartTimeFact = (isset($carsData->StartTimeFact)) ?
            date('Y-m-d H:i:s', strtotime($carsData->StartTimeFact)) :
            null;
        $carsDataModel = self::firstOrNew(['car_id' => $carID]);
        $carsDataModel->car_id = $carID;
        $carsDataModel->driver_name = $Driver;
        $carsDataModel->phone_number = $Phone;
        $carsDataModel->start_time_plan = $StartTimePlan;
        $carsDataModel->end_time_plan = $EndTimePlan;
        $carsDataModel->work_time_plan = $WorkTimePlan;
        $carsDataModel->start_time_fact =  $StartTimeFact;
        $carsDataModel->work_time_fact = $WorkTimeFact;
        $carsDataModel->mileage = $Mileage;
        $carsDataModel->speed = $Speed;
        $carsDataModel->fuel_norm = $FuelNorm;
        $carsDataModel->fuel_DUT = $FuelDUT;
        $carsDataModel->driver_mark = $DriverMark;
        $carsDataModel->violations_count = $ViolationsCount;
        $carsDataModel->save();
        return $carsDataModel;
    }
}
