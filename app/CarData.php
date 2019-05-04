<?php

namespace App;

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
     * @return self
     */
    public static function getCarData($carID)
    {
        $client = app(Soap::class);
        $carsData = json_decode($client->GetCarsData(['CarsID' => $carID])->return);
        $carsDataModel = self::firstOrNew(['car_id' => $carID]);
        $carsDataModel->car_id = $carID;
        $carsDataModel->driver_name = isset($carsData->Driver) ? $carsData->Driver : null;
        $carsDataModel->phone_number = isset($carsData->Phone) ? $carsData->Phone : null;
        $carsDataModel->start_time_plan = isset($carsData->StartTimePlan) ? $carsData->StartTimePlan : null;
        $carsDataModel->end_time_plan = isset($carsData->EndTimePlan) ? $carsData->EndTimePlan : null;
        $carsDataModel->work_time_plan = isset($carsData->EndTimePlan) ? $carsData->EndTimePlan : null;
        $carsDataModel->start_time_fact = isset($carsData->StartTimeFact) ? $carsData->StartTimeFact : null;
        $carsDataModel->work_time_fact = isset($carsData->WorkTimeFact) ? $carsData->WorkTimeFact : null;
        $carsDataModel->mileage = isset($carsData->Mileage) ? $carsData->Mileage : null;
        $carsDataModel->speed = isset($carsData->Speed) ? $carsData->Speed : null;
        $carsDataModel->fuel_norm = isset($carsData->FuelNorm) ? $carsData->FuelNorm : null;
        $carsDataModel->fuel_DUT = isset($carsData->FuelDUT) ? $carsData->FuelDUT : null;
        $carsDataModel->driver_mark = isset($carsData->DriverMark) ? $carsData->DriverMark : null;
        $carsDataModel->violations_count = isset($carsData->ViolationsCount) ? $carsData->ViolationsCount : null;
        $carsDataModel->save();
        return $carsDataModel;
    }
}
