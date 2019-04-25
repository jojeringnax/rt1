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
}
