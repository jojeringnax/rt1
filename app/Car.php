<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Car
 * @package App
 *
 * @property string $id
 * @property string $company_id
 * @property string $organization_id
 * @property string $autocolumn_id
 * @property string $bad_spot_id
 * @property string $spot_id
 * @property string $brigade_id
 * @property string $number
 * @property integer $type
 * @property string $model
 * @property string $description
 * @property integer $status
 * @property boolean $inline
 * @property integer $year
 * @property float $profitability
 * @property integer $technical_inspection_days
 * @property integer $battery_change_days
 * @property integer $tire_change_days
 * @property string $tire_season
 * @property boolean $terminal
 * @property float $x_pos
 * @property float $y_pos
 *
 * @property Company $company
 * @property Organization $organization
 * @property Autocolumn $autocolumn
 * @property Spot $spot
 * @property BadSpot $badSpot
 * @property Brigade $brigade
 * @property CarData $carData
 *
 */
class Car extends Model
{
    /**
     * @var string
     */
    protected $table='cars';

    /**
     * @var string
     */
    protected $primaryKey='id';

    /**
     * @var bool
     */
    public $incrementing = false;

    /**
     * @var array
     */
    protected $guarded=['id'];

    const STATUSES = [
        'G' => 0,
        'R' => 1,
        'TO' => 2
    ];

    const TYPES = [
        'Легковые ТС' => 0,
        'Грузовые ТС' => 1,
        'Автобусы' => 2,
        'Спецтехника' => 3
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function autocolumn()
    {
        return $this->belongsTo(Autocolumn::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function badSpot()
    {
        return $this->belongsTo(BadSpot::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function spot()
    {
        return $this->belongsTo(Spot::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function brigade()
    {
        return $this->belongsTo(Brigade::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function carData()
    {
        return $this->hasOne(CarData::class);
    }

    /**
     * @return array
     */
    public static function getCarsCommonInfo()
    {
        $cars = self::where('x_pos', '!=', null)->get();
        $carsReady = 0;
        $carsRepair = 0;
        $carsTO = 0;
        $carsInline = 0;
        $carsLight = 0;
        $carsTruck = 0;
        $carsBus = 0;
        $carsSpec = 0;
        foreach ($cars as $car) {
            if ($car->type === Car::TYPES['Легковые ТС']) {
                $carsLight++;
            }
            else if ($car->type === Car::TYPES['Грузовые ТС']) {
                $carsTruck++;
            }
            else if ($car->type === Car::TYPES['Автобусы']) {
                $carsBus++;
            }
            else if ($car->type === Car::TYPES['Спецтехника']) {
                $carsSpec++;
            }
            if ($car->status === Car::STATUSES['G']) {
                $carsReady++;
            }
            else if ($car->status === Car::STATUSES['R']) {
                $carsRepair++;
            }
            else if ($car->status === Car::STATUSES['TO']) {
                $carsTO++;
            }
            if ($car->inline) {
                $carsInline++;
            }
        }
        return [
            'totalCars' => count($cars),
            'statuses' => [
                'G' => $carsReady,
                'R' => $carsRepair,
                'TO' => $carsTO,
                'inline' => $carsInline
            ],
            'types' => [
                'light' => $carsLight,
                'truck' => $carsTruck,
                'bus' => $carsBus,
                'spec' => $carsSpec
            ]
        ];
    }

    /**
     * @param $division
     * @return array
     */
    public static function getCarsInfo($division)
    {
        $cars = $division->cars;
        $carsReady = 0;
        $carsRepair = 0;
        $carsTO = 0;
        $carsInline = 0;
        $carsLight = 0;
        $carsTruck = 0;
        $carsBus = 0;
        $carsSpec = 0;
        foreach ($cars as $car) {
            if ($car->type === Car::TYPES['Легковые ТС']) {
                $carsLight++;
            }
            else if ($car->type === Car::TYPES['Грузовые ТС']) {
                $carsTruck++;
            }
            else if ($car->type === Car::TYPES['Автобусы']) {
                $carsBus++;
            }
            else if ($car->type === Car::TYPES['Спецтехника']) {
                $carsSpec++;
            }
            if ($car->status === Car::STATUSES['G']) {
                $carsReady++;
            }
            else if ($car->status === Car::STATUSES['R']) {
                $carsRepair++;
            }
            else if ($car->status === Car::STATUSES['TO']) {
                $carsTO++;
            }
            if ($car->inline) {
                $carsInline++;
            }
        }
        return [
            'totalCars' => count($cars),
            'statuses' => [
                'G' => $carsReady,
                'R' => $carsRepair,
                'TO' => $carsTO,
                'inline' => $carsInline
            ],
            'types' => [
                'light' => $carsLight,
                'truck' => $carsTruck,
                'bus' => $carsBus,
                'spec' => $carsSpec
            ]
        ];
    }
}
