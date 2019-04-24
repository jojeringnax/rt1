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
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getOrganization()
    {
        return $this->hasOne(Organization::class, 'organization_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getAutocolumn()
    {
        return $this->hasOne(Autocolumn::class, 'autocolumn_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getBadSpot()
    {
        return $this->hasOne(BadSpot::class, 'bad_spot_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getSpot()
    {
        return $this->hasOne(Spot::class, 'spot_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getBrigade()
    {
        return $this->hasOne(Brigade::class, 'brigade_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getCarData()
    {
        return $this->hasOne(CarData::class, 'id', 'car_id');
    }
}
