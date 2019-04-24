<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Brigade
 * @package App
 *
 * @property string $id
 * @property string $company_id
 * @property string $organization_id
 * @property string $autocolumn_id
 * @property string $bad_spot_id
 * @property string $spot_id
 * @property string $name
 * @property string $town
 * @property string $description
 * @property string $address
 * @property float $x_pos
 * @property float $y_pos
 *
 * @property Company $company
 * @property Organization $organization
 * @property Autocolumn $autocolumn
 * @property Spot $spot
 * @property BadSpot $badSpot
 * @property Car[] $cars
 * @property Statistic[] $statistics
 */
class Brigade extends Model
{
    /**
     * @var string
     */
    protected $table='brigades';

    /**
     * @var array
     */
    protected $guarded=[
        'id',
        'company_id',
        'organization_id',
        'autocolumn_id',
        'bad_spot_id',
        'spot_id',
        'name',
        'town',
        'description',
        'address',
        'x_pos',
        'y_pos'
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getCars()
    {
        return $this->hasMany(Car::class, 'id', 'brigade_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getStatistics()
    {
        return $this->hasMany(Statistic::class, 'id', 'brigade_id');
    }
}
