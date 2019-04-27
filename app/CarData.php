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
     * @var bool
     */
    public $incrementing = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getCar()
    {
        return $this->hasOne(Car::class, 'car_id', 'id');
    }
}
