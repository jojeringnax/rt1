<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Statistic
 * @package App
 *
 * @property string $id
 * @property string $company_id
 * @property string $organization_id
 * @property string $autocolumn_id
 * @property string $bad_spot_id
 * @property string $spot_id
 * @property string $brigade_id
 * @property integer $applications_total
 * @property integer $applications_executed
 * @property integer $applications_canceled
 * @property integer $applications_sub
 * @property integer $applications_ac
 * @property integer $applications_mp
 * @property integer $waybills_total
 * @property integer $waybills_processed
 * @property integer $accidents_total
 * @property integer $accidents_guilty
 * @property integer $WB_M
 * @property integer $WB_ALL
 * @property float $fuel
 * @property float $time
 *
 * @property Company $company
 * @property Organization $organization
 * @property Autocolumn $autocolumn
 * @property Spot $spot
 * @property BadSpot $badSpot
 * @property Brigade $brigade
 *
 */
class Statistic extends Model
{
    /**
     * @var string
     */
    protected $table='statistics';

    /**
     * @var array
     */
    protected $guarded = [
        'autocolumn_id',
        'bad_spot_id',
        'spot_id',
        'brigade_id'
    ];

    /**
     * @var array
     */
    protected $fillable = [
        'applications_total',
        'applications_executed',
        'applications_canceled',
        'applications_sub',
        'applications_ac',
        'applications_mp',
        'waybills_total',
        'waybills_processed',
        'accidents_total',
        'accidents_guilty',
        'WB_M',
        'WB_ALL',
        'fuel',
        'time'
    ];



    /**
     * @return Statistic
     */
    public static function getCommonStatistic() {
        $statistics = self::all();
        $resultStatistic = new self;
        foreach ($statistics as $statistic) {
            foreach ($statistic->getFillable() as $attribute) {
                $resultStatistic->$attribute += $statistic->$attribute;
            }
        }
        $carsInfo = Car::getCarsCommonInfo();
        $resultStatistic['carsTotal'] = $carsInfo['carsTotal'];
        $resultStatistic['carsOnMap'] = $carsInfo['carsOnMap'];
        $resultStatistic['carsLight'] = $carsInfo['types']['light'];
        $resultStatistic['carsTruck'] = $carsInfo['types']['truck'];
        $resultStatistic['carsBus'] = $carsInfo['types']['bus'];
        $resultStatistic['carsSpec'] = $carsInfo['types']['spec'];
        $resultStatistic['carsReady'] = $carsInfo['statuses']['G'];
        $resultStatistic['carsRepair'] = $carsInfo['statuses']['R'];
        $resultStatistic['carsTO'] = $carsInfo['statuses']['TO'];
        $resultStatistic['carsInline'] = $carsInfo['statuses']['inline'];
        $resultStatistic['carsTerminal'] = $carsInfo['carsTerminal'];
        return $resultStatistic;
    }



    /**
     * @param $divisionClass
     * @param $divisionID
     * @return Statistic
     */
    public static function getStatisticForDivision($divisionClass, $divisionID)
    {
        $division = $divisionClass::find($divisionID);
        if ($division === null) {
            return new self;
        };
        $statistics = $division->statistics;
        $resultStatistic = new self;
        foreach ($statistics as $statistic) {
            foreach ($statistic->getFillable() as $attribute) {
                $resultStatistic->$attribute += $statistic->$attribute;
            }
        }
        $carsInfo = Car::getCarsInfo($division);
        $resultStatistic['carsTotal'] = $carsInfo['carsTotal'];
        $resultStatistic['carsOnMap'] = $carsInfo['carsOnMap'];
        $resultStatistic['carsLight'] = $carsInfo['types']['light'];
        $resultStatistic['carsTruck'] = $carsInfo['types']['truck'];
        $resultStatistic['carsBus'] = $carsInfo['types']['bus'];
        $resultStatistic['carsSpec'] = $carsInfo['types']['spec'];
        $resultStatistic['carsReady'] = $carsInfo['statuses']['G'];
        $resultStatistic['carsRepair'] = $carsInfo['statuses']['R'];
        $resultStatistic['carsTO'] = $carsInfo['statuses']['TO'];
        $resultStatistic['carsInline'] = $carsInfo['statuses']['inline'];
        $resultStatistic['carsTerminal'] = $carsInfo['carsTerminal'];
        return $resultStatistic;
    }
}
